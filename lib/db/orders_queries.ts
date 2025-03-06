import { PgSelect } from 'drizzle-orm/pg-core';
import { PRODUCTS_PER_PAGE } from '@/lib/utils';
import { desc } from 'drizzle-orm/sql/expressions/select';
import {
  Action,
  actions,
  Customer,
  customers,
  Order,
  OrderAction,
  orders,
  orders_actions,
  orders_statuses,
  OrderStatus,
  pinned_orders,
  PinnedOrder
} from '@/lib/db/schema';
import { and, eq, ilike, inArray } from 'drizzle-orm/sql/expressions/conditions';
import { sBase } from '@/lib/db/db';
import { SQLWrapper } from 'drizzle-orm';


type qParams = {
  offsetPage?: number,
  queryText?: string,
  pinnedUserId?: string,
  statusId?: string,
  ordersIds?: string[]
}

type OrderActionItem = OrderAction & { action: Action };

export type OrderItem = Order & {
  status: OrderStatus,
  customer: Customer,
  orders_actions: OrderActionItem[],
  pinned_users?: PinnedOrder[];
};


function withConditions<T extends PgSelect>(
  qb: T,
  conditions: SQLWrapper[]
) {
  return qb.where(conditions.length > 0 ? and(...conditions) : undefined);
}


function buildQuery<T extends PgSelect>(qb: T, params: qParams) {
  let conditions: SQLWrapper[] = [];

  if (params.ordersIds && params.ordersIds.length > 0) {
    conditions.push(inArray(orders.id, params.ordersIds));
  }

  if (params.queryText) {
    const text = params.queryText.toLowerCase();
    conditions.push(ilike(orders.name, `%${text}%`));
  }

  if (params.pinnedUserId) {
    conditions.push(eq(pinned_orders.user_id, params.pinnedUserId));
  }

  if (params.statusId) {
    conditions.push(eq(orders.status_id, params.statusId));
  }

  qb = withConditions(qb, conditions);

  return qb;
}

async function getDistinctOrdersIds(params: qParams): Promise<string[]> {

  let query = sBase
    .select()
    .from(orders)
    .orderBy(desc(orders.seq))
    .$dynamic();

  query = buildQuery(query, params);

  const ordersIds: Order [] = await (query);

  return ordersIds.map(o => o.id);
}


function withPagination(
  ordersIds: string[],
  page: number = 1,
  pageSize: number = PRODUCTS_PER_PAGE
): string[] {

  return ordersIds.slice((page - 1) * pageSize, page * pageSize);
}


const getOrders = async ({ offsetPage, queryText, pinnedUserId, statusId }: {
  offsetPage?: number,
  queryText?: string,
  pinnedUserId?: string,
  statusId?: string,
}): Promise<{
  orders: OrderItem[], totalOrdersCounter: number
}> => {


  // First fetch for all available distinguish orders id sorted by seq no limit
  const allOrdersIds = await getDistinctOrdersIds({ queryText, pinnedUserId, statusId });

  // Next sake of pagination splice
  const ordersIds = withPagination(allOrdersIds, offsetPage);

  // Now fetch for all records multiplied by joined actions and pinned_orders

  let query = sBase
    .select({
      orders,
      pinned_orders,
      orders_statuses,
      orders_actions,
      actions,
      customers
    })
    .from(orders)
    .leftJoin(pinned_orders, eq(orders.id, pinned_orders.order_id))
    .leftJoin(orders_statuses, eq(orders.status_id, orders_statuses.id))
    .leftJoin(orders_actions, eq(orders.id, orders_actions.order_id))
    .leftJoin(actions, eq(orders_actions.action_id, actions.id))
    .leftJoin(customers, eq(orders.customer_id, customers.id))
    .orderBy(desc(orders.seq))
    .$dynamic();

  query = buildQuery(query, { queryText, pinnedUserId, statusId, ordersIds });

  const data = await (query);


  // Finally rebuild query result to proper OrderItem array
  const ordersMap = new Map();

  data.forEach((row) => {

    if (!ordersMap.has(row.orders.id)) {
      ordersMap.set(row.orders.id, {
        ...row.orders,
        status: { ...row.orders_statuses },
        customer: { ...row.customers },
        orders_actions: new Map(),
        pinned_users: new Map()
      });
    }


    if (row.orders_actions?.order_id) {
      if (!ordersMap.get(row.orders.id).orders_actions.has(row.orders_actions.action_id)) {
        ordersMap.get(row.orders.id).orders_actions.set(row.orders_actions.action_id, {
          ...row.orders_actions,
          action: { ...row.actions }
        });
      }
    }

    if (row.pinned_orders?.order_id) {
      if (!ordersMap.get(row.orders.id).pinned_users.has(row.pinned_orders.user_id)) {
        ordersMap.get(row.orders.id).pinned_users.set(row.pinned_orders.user_id, {
          ...row.pinned_orders
        });
      }
    }

  });

  const items: OrderItem[] = Array.from(ordersMap.values());

  const ordersItems = items.map((o) => {
      const pinned: PinnedOrder[] = o.pinned_users ? [...o.pinned_users.values()] : [];
      const actions: OrderActionItem[] = [...o.orders_actions.values()];
      return { ...o, pinned_users: pinned, orders_actions: actions };
    }
  );

  return { orders: ordersItems, totalOrdersCounter: allOrdersIds.length };
};


export { getOrders };