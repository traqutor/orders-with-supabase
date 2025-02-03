'use client';

import React, { useEffect, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Pill } from '@/components/ui/pill';
import { Tables } from '@/types_db';
import { useOrdersStatuses } from '@/lib/db/useOrdersStatuses';
import * as Select from '@radix-ui/react-select';
import { putOrder } from '@/lib/db/orders_queries';
import { mapOrderToFormData } from '@/app/(protected)/order/order-dialog';
import { useRouter } from 'next/navigation';

const OrderStatusComponent = (props: { order: Tables<'orders'> }) => {

    const { order } = props;

    const router = useRouter();
    const { ordersStatuses, fetchOrdersStatuses } = useOrdersStatuses();
    const [selected, setSelected] = useState<Tables<'orders_statuses'>>();

    const handleChange = (event: string) => {
      const option = ordersStatuses.find((option) => option.id === event);

      if (!option) return null;

      setSelected(option);

      updateOrder(option).then();

      router.refresh();
    };

    const updateOrder = async (status: Tables<'orders_statuses'>) => {
      const { error } = await putOrder({
        ...mapOrderToFormData(order),
        status_id: status.id
      });

      if (error) {
        console.error(`Update order with Status: ${status} error`, error);
        return;
      }
    };

    useEffect(() => {
      fetchOrdersStatuses().then((response) => {
        const option = response.find((option) => option.id === order.status_id);
        setSelected(option || response[0]);
      });

    }, []);

    return (
      <Select.Root value={order.status_id} onValueChange={handleChange}>

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
              <Pill
                variant={selected?.color_hex || 'gray' as any}
                title={selected?.title || 'no selected  '} />

              <ChevronDown className="text-muted-foreground h-5" />
            </div>

          </Select.Value>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="bg-card border py-2 border-input rounded-md shadow-lg">
            <Select.Viewport>
              {ordersStatuses.map((orderStatus) => (
                <Select.Item key={orderStatus.id} value={orderStatus.id}
                             className="relative flex h-[32px] hover:bg-muted select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-muted-foreground data-[disabled]:pointer-events-none data-[disabled]:text-grey-300 data-[highlighted]:text-green-900 data-[highlighted]:outline-none">
                  <Select.ItemText>
                    <Pill
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