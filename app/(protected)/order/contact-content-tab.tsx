'use client';

import React from 'react';
import { CardDescription } from '@/components/ui/card';
import { ListItem } from '@/components/ui/list-item';
import { MailIcon, PhoneIcon, UserCircle2 } from 'lucide-react';
import { PositionsTable } from '@/app/(protected)/order/positions-table';


export function ContactContentTab({ order }: any) {


  const handleEdit = (position: any) => {
    console.log('Edit order', position);
  };

  const handleDelete = (position: any) => {
    console.log('Delete order', position);
  };

  return (
    <div>
      <div>
        <CardDescription className=" pb-2">
          Kontakt:
        </CardDescription>
        <div>
          <ul className="list-unstyled mb-7">
            <ListItem className="mb-3">
              <UserCircle2 className="h-5 w-5 min-h-5 min-w-5 text-muted-foreground" /> <span
              className="text-2xl"> {order.name} </span>
            </ListItem>
            <ListItem>
              <PhoneIcon className="h-5 w-5 min-h-5 min-w-5 text-muted-foreground" /> {order.phone}
            </ListItem>
            <ListItem>
              <MailIcon className="h-5 w-5 min-h-5 min-w-5 text-muted-foreground" /> {order.address}
            </ListItem>
          </ul>
        </div>

      </div>
      <div
        className="flex flex-col w-full h-full overflow-scroll">
        <PositionsTable positions={order.orders_positions} totalPositions={1} totalPriceGross={2}
                        totalPriceNett={3} />
      </div>
    </div>
  );
}