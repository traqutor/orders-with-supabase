'use client';

import React, { useMemo, useState } from 'react';
import { PinIcon } from 'lucide-react';
import cn from 'clsx';
import { useRouter } from 'next/navigation';
import { OrderItem } from '@/lib/db/orders_queries';
import { useOrderPins } from '@/lib/client/useOrderPins';


const PinButton = (
  props:
  { order: OrderItem, userId: string }) => {

  const { order, userId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { pinOrder, unPinOrder } = useOrderPins();

  const pinned = useMemo(() => {
    return order.pinned_users?.filter(p => p.user_id === userId);
  }, [userId, order]);

  const handlePin = async () => {
    setIsLoading(true);

    if (pinned && pinned.length > 0) {
      pinned.forEach((pin) => {
        unPinOrder(pin).then(() => {
          setIsLoading(false);
          router.refresh();
        });
      });

    } else {
      await pinOrder({
        user_id: userId,
        order_id: order.id
      });


      router.refresh();

    }
    setIsLoading(false);
  };


  const classNamesPin = cn('cursor-pointer hover:text-gray-400',
    { 'text-tomato-900 dark:text-tomato-600 rotate-12': (!!pinned) }
  );


  return (
    <button disabled={isLoading} onClick={handlePin}>
      <PinIcon className={classNamesPin} />
    </button>
  );
};

export default PinButton;
