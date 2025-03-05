'use client';

import React, { useEffect, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { CheckIcon, ChevronDown, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import ConfirmDialog from '@/components/ui/Dialog/confirm-dialog';
import { ActionPill } from '@/components/ui/action_pill';
import { Action, NewOrderAction, OrderAction } from '@/lib/db/schema';
import { deleteData, getData, postData, putData } from '@/utils/helpers';
import { OrderActionItem } from '@/app/api/orders_actions/[orderId]/route';


const OrderActionsComponent = (props: { orderId: string }) => {

    const { orderId } = props;
    const [actions, setActions] = useState<Action[]>([]);
    const [orderActions, setOrderActions] = useState<OrderActionItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>();


    const getActions = () => {
      setIsLoading(true);
      getData<Action[]>({ url: '/api/actions' }).then((response) => {
        setActions(response.data);
      }).finally(() => {
        setIsLoading(false);
      });
    };

    const getOrderActions = () => {
      setIsLoading(true);
      getData<OrderActionItem[]>({ url: `/api/orders_actions/${orderId}` }).then((response) => {
        setOrderActions(response.data);
      }).finally(() => {
        setIsLoading(false);
      });
    };

    const handleActionClick = async (action: OrderAction) => {
      setIsLoading(true);

      putData<OrderAction>({
        url: `/api/orders_actions/${orderId}/${action.id}`,
        data: { ...action, performed: !action.performed }
      }).then(() => {
        getOrderActions();
      }).finally(() => {
        setIsLoading(false);
      });

    };

    const handleToggleAction = async (action: Action, isSelected: boolean) => {
      setIsLoading(true);
      if (isSelected) {

        const selected = orderActions.find((o) => o.orders_actions.action_id === action.id);

        deleteData<OrderAction>({
          url: `/api/orders_actions/${orderId}/${selected?.orders_actions.id}`
        }).then(() => {
          getOrderActions();
        }).finally(() => {
          setIsLoading(false);
        });
      } else {
        postData<NewOrderAction>({
          url: `/api/orders_actions/${orderId}`,
          data: {
            order_id: orderId,
            action_id: action.id,
            performed: false
          }
        }).then(() => {
          getOrderActions();
        }).finally(() => {
          setIsLoading(false);
        });
      }
      getOrderActions();
      setIsLoading(false);
    };

    useEffect(() => {
      getActions();
      getOrderActions();
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
                  {actions.map((a: Action) => {
                      const isSelected = orderActions.some((o) => o.orders_actions.action_id === a.id);
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
                        <ActionPill
                          variant={a.color_hex || 'default' as any}
                          iconName={a.icon_name || ''}
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


          {orderActions.map(({ orders_actions: o, actions: a }) =>

            <div key={a.id}>

              <ConfirmDialog
                triggerLabel=""
                title={o.performed ? `Anulowanie wykonania akcji "${a.title}"` : `Wykonanie akcji "${a.title}"`}
                description={o.performed ? 'Czy anulujesz wykonanie akcji ' : 'Czy potwierdzasz wykonanie akcji'}
                onClickSubmit={() => handleActionClick(o)}
                triggerIcon={
                  <ActionPill
                    variant={o.performed ? 'neutral' : a.color_hex || 'default' as any}
                    title={a.title || ''}
                    iconName={a.icon_name || ''}
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