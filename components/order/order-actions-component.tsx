'use client';

import React, { useEffect, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { CheckIcon, ChevronDown, XIcon } from 'lucide-react';
import { Pill } from '@/components/ui/pill';
import { useActions } from '@/lib/db/useActions';
import { cn } from '@/lib/utils';
import { Tables } from '@/types_db';
import { deleteOrderAction, getActionsForOrderId, postOrderAction, putOrderAction } from '@/lib/db/orders_actions';
import ConfirmDialog from '@/components/ui/Dialog/confirm-dialog';


type OrderAction = Tables<'orders_actions'> & { actions: Tables<'actions'> }

const OrderActionsComponent = (props: { orderId: string }) => {

    const { orderId } = props;
    const { actions, fetchActions } = useActions();
    const [orderActions, setOrderActions] = useState<OrderAction[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>();

    const getOrderActions = async () => {
      const { data, error } = await getActionsForOrderId(orderId);

      if (error) throw new Error(`Get list of Order Actions for Order Id ${orderId} error:`, error);

      setOrderActions(data);
    };

    const handleActionClick = async (action: any) => {
      setIsLoading(true);

      await putOrderAction({
        id: action.id,
        action_id: action.action_id,
        order_id: action.order_id,
        performed: !action.performed,
        performed_by: null,
        performed_at: null,
      });
      await getOrderActions();
      setIsLoading(false);
    };

    const handleToggleAction = async (action: Tables<'actions'>, isSelected: boolean) => {
      setIsLoading(true);

      if (isSelected) {
        const a = orderActions.find(i => i.action_id === action.id && i.order_id === orderId);
        if (a) {
          await deleteOrderAction({
            id: a.id,
            action_id: action.id,
            order_id: orderId,
            performed: false,
            performed_by: null,
            performed_at: null
          });
        }
      } else {
        await postOrderAction({
          action_id: action.id,
          order_id: orderId,
          performed: false,
          performed_by: null,
          performed_at: null
        });
      }

      await getOrderActions();
      setIsLoading(false);
    };

    useEffect(() => {
      fetchActions().then();
      getOrderActions().then();
    }, []);

    return (
      <div className="flex">

        <Popover.Root>
          <Popover.Trigger
            className="flex h-[38px] items-center justify-start cursor-pointer text-muted-foreground hover:bg-muted rounded p-1 px-4">
            <div className="text-sm">
              Akcje:
            </div>
            <ChevronDown className="text-muted-foreground h-5" />
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content align="start" sideOffset={1}
                             className="z-50 w-80 rounded-md border bg-popover p-3 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">

              <div className="flex flex-1 justify-between pb-2">
                <span className="text-muted-foreground text-md"> Wybierz akcje </ span>
                <Popover.Close>
                  <XIcon />
                </Popover.Close>
              </div>

              <div className="flex flex-wrap flex-auto gap-1 p-2">
                <ul className="flex-col w-full">
                  {actions.map((a: Tables<'actions'>) => {
                      const isSelected = orderActions.some((o: { action_id: string }) => o.action_id === a.id);
                      return <li key={a.id}
                                 className="h-12 px-2 cursor-pointer w-full rounded items-center inline-flex hover:bg-muted"
                                 onClick={() => !isLoading && handleToggleAction(a, isSelected)}
                      >
                        <div
                          className={cn(
                            'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                            isSelected
                              ? 'bg-secondary  text-secondary-foreground'
                              : 'opacity-50 [&_svg]:invisible'
                          )}
                        >
                          <CheckIcon className="h-4 w-4" />
                        </div>
                        <Pill
                          size="sm"
                          variant={a.color_hex || 'default' as any}
                          title={a.title || ''} />
                      </li>;
                    }
                  )}
                </ul>
              </div>

            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        <div className="flex flex-wrap flex-auto gap-1 pt-1 ml-2">


          {orderActions.map((a: Tables<'orders_actions'> & { actions: Tables<'actions'> }) =>

            <div key={a.id}>

              <ConfirmDialog
                triggerLabel=""
                title={a.performed ? `Anulowanie wykonania akcji "${a.actions.title}"` : `Wykonanie akcji "${a.actions.title}"`}
                description={a.performed ? 'Czy anulujesz wykonanie akcji ' : 'Czy potwierdzasz wykonanie akcji'}
                onClickSubmit={() => handleActionClick(a)}
                triggerIcon={<Pill
                  size="sm"
                  variant={a.performed ? 'neutral' : a.actions.color_hex || 'default' as any}
                  title={a.actions.title || ''}
                  iconName={a.actions.icon_name || '' }
                  className="cursor-pointer"
                />}
              />

            </div>
          )}
        </div>

      </div>
    );
  }
;

export default OrderActionsComponent;