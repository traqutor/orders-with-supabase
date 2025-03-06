import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Package } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { StatusPill } from '@/components/ui/status_pill';
import React from 'react';
import Link from 'next/link';
import { getFormatedDate } from '@/utils/time';
import { ActionPill } from '@/components/ui/action_pill';
import AvatarProfile from '@/components/profile/avatar-profile';
import { Order, PinnedOrder } from '@/lib/db/schema';
import { OrderItem } from '@/lib/db/orders_queries';


export function OrderRow(order: OrderItem) {

  const deleteOrderRecord = (order: Order) => {
    console.log('Delete orders', order);
  };

  return (
    <TableRow>
      <TableCell className="">
        <Link href={`/order/${order.id}`}>
          <Package className="text-green-600 hover:text-green-900" />
        </Link>
      </TableCell>
      <TableCell className="font-medium max-w-sm truncate">
        <Link href={`/order/${order.id}`}>
          {order.title}
        </Link>
      </TableCell>
      <TableCell className="font-medium">{order.customer.name}</TableCell>
      <TableCell>
        <StatusPill
          key={order.status.id}
          variant={order.status.color_hex || 'default' as any}
          title={order.status.title || ''} />
      </TableCell>
      <TableCell className="">
        {getFormatedDate(order.created_at)}
      </TableCell>
      <TableCell className="">
        <div className="flex gap-x-0.5 space-x-2">
          {order.orders_actions?.map((order_action) => (
            <ActionPill
              key={order_action.action.id}
              variant={order_action.performed ? 'neutral' : order_action.action.color_hex || 'default' as any}
              title={order_action.action.title || ''}
              iconName={order_action.action.icon_name || ''}
              iconOnly={true}
            />
          ))}
        </div>
      </TableCell>
      <TableCell className="">
        <div className="flex justify-start">
          {order.pinned_users?.map((pin: PinnedOrder) => (
            <span key={pin.id} className="ml-[-8px]">
              <AvatarProfile profileId={pin.user_id || ''} />
            </span>
          ))}
        </div>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/order/${order.id}`}>
              <DropdownMenuItem>Otwórz</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <form action={() => deleteOrderRecord(order)}>
                <button type="submit">Usuń</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}