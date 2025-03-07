'use client';

import React, { useEffect, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { StatusPill } from '@/components/ui/status_pill';
import { useOrdersStatuses } from '@/lib/client/useOrdersStatuses';
import * as Select from '@radix-ui/react-select';
import { useRouter } from 'next/navigation';
import { Order, OrderStatus } from '@/lib/db/schema';
import { useOrders } from '@/lib/client/useOrders';

const OrderStatusComponent = (props: { order: Order }) => {

    const { order } = props;

    const router = useRouter();
    const [selected, setSelected] = useState<OrderStatus>();
    const { ordersStatuses, fetchOrdersStatuses } = useOrdersStatuses();
    const { updateOrder: putOrder } = useOrders();

    const handleChange = (event: string) => {
      const option = ordersStatuses.find((option) => option.id === event);

      if (!option) return null;

      setSelected(option);

      updateOrder(option).then();

      router.refresh();
    };

    const updateOrder = async (status: OrderStatus) => {
      await putOrder({
        ...order,
        status_id: status.id
      });
    };

    useEffect(() => {
      fetchOrdersStatuses().then((response) => {
        const option = response.find((option) => option.id === order.status_id);
        setSelected(option || response[0]);
      });

    }, []);

    return (
      <Select.Root value={order.status_id || undefined} onValueChange={handleChange}>

        <Select.Trigger
          className="flex bg-background  hover:bg-muted rounded cursor-pointer px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Select.Value
            aria-label="State"
          >
            <div className="flex items-center justify-start gap-2 ">
              <div className="text-muted-foreground text-sm">
                Status:
              </div>
              <div className="flex items-center justify-start gap-2 ">
                <StatusPill
                  variant={selected?.color_hex || 'gray' as any}
                  title={selected?.title || 'no selected  '} />

                <ChevronDown className="text-muted-foreground h-5" />
              </div>
            </div>

          </Select.Value>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="bg-card border mt-3 p-3 border-input rounded-md shadow-lg">
            <Select.Viewport className="mt-3">
              {ordersStatuses.map((orderStatus) => (
                <Select.Item key={orderStatus.id} value={orderStatus.id}
                             className="relative flex justify-between mb-3 items-center hover:bg-muted select-none  data-[disabled]:pointer-events-none data-[disabled]:text-grey-300 data-[highlighted]:text-green-800 data-[highlighted]:outline-none">
                  <Select.ItemText>
                    <StatusPill
                      variant={orderStatus.color_hex || 'default' as any}
                      title={orderStatus.title || ''} />
                  </Select.ItemText>
                  <Select.ItemIndicator>
                    <Check />
                  </Select.ItemIndicator>

                </Select.Item>
              ))}

            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    );
  }
;

export default OrderStatusComponent;