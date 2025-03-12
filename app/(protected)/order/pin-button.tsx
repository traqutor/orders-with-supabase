'use client';

import React, { useMemo, useState } from 'react';
import { PinIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { OrderItem } from '@/lib/db/orders_queries';
import { useOrderPins } from '@/lib/client/useOrderPins';
import cn from 'clsx';


const PinButton = (
  props:
  { order: OrderItem }) => {

  const { order } = props;
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { pinOrder, unPinOrder } = useOrderPins();


  const pinnedUsers = useMemo(() => {
    return order.pinned_users?.filter(p => p.user_id === session?.user.id);
  }, [order]);


  const handlePin = async () => {
    setIsLoading(true);

    if (pinnedUsers && pinnedUsers.length > 0) {
      pinnedUsers.forEach((pin) => {
        unPinOrder(pin).then(() => {
          setIsLoading(false);
          router.refresh();
        });
      });
    } else {
      if (session?.user.id) {
        await pinOrder({
          user_id: session?.user.id,
          order_id: order.id
        });
      }
    }
    router.refresh();
    setIsLoading(false);
  };


  const classNamesPin = cn('cursor-pointer hover:text-gray-400',
    { 'text-tomato-900 dark:text-tomato-600 rotate-12': (pinnedUsers?.length) }
  );


  return (
    <button disabled={isLoading} onClick={handlePin}>
      <PinIcon className={classNamesPin} />
    </button>
  );
};

export default PinButton;
