'use client';

import React, { useMemo, useState } from 'react';
import { PinIcon } from 'lucide-react';
import { Tables } from '@/types_db';
import cn from 'clsx';
import { useRouter } from 'next/navigation';
import { pinOrder, unPinOrder } from '@/lib/db/pinned_orders_queries';

const PinButton = (
  props:
  { order: Tables<'orders'> & { pinned_orders: Tables<'pinned_orders'>[] }, userId: string }) => {

  const { order, userId } = props;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const pinned = useMemo(() => {
    return order.pinned_orders.filter(p => p.user_id === userId);
  }, [userId, order]);

  const handlePin = async () => {
    setIsLoading(true);

    if (pinned.length > 0) {
      pinned.forEach((pin) => {
        unPinOrder(pin).then(() => {
          setIsLoading(false);
          router.refresh();
        });
      });

    } else {
      const { error } = await pinOrder({
        user_id: userId,
        order_id: order.id
      });

      if (error) {
        console.error('error', error);
        return;
      } else {
        router.refresh();
      }
    }
    setIsLoading(false);
  };


  const classNamesPin = cn('cursor-pointer hover:text-gray-400',
    { 'text-tomato-900 dark:text-tomato-600 rotate-12': (pinned.length > 0) }
  );


  return (
    <button disabled={isLoading} onClick={handlePin}>
      <PinIcon className={classNamesPin} />
    </button>
  );
};

export default PinButton;
