import React from 'react';
import { Card, CardDescription, CardHeader } from '@/components/ui/card';
import { ListItem } from '@/components/ui/list-item';
import { Edit, MailIcon, PhoneIcon, UserCircle2 } from 'lucide-react';
import { PositionsTable } from '@/app/(protected)/order/positions-table';
import OrderDialog from '@/app/(protected)/order/order-dialog';
import { Button } from '@/components/ui/button';


export function ContactContentTab({ order }: any) {

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between ">
          <div className="flex items-center justify-self-start gap-2">
            <ul className="list-unstyled mb-3">
              <ListItem className="">
                <UserCircle2 className="h-5 w-5 min-h-5 min-w-5 text-muted-foreground" />
                <span
                  className="text-2xl"
                > {order.name} </span>
              </ListItem>
              <ListItem>
                <PhoneIcon className="h-5 w-5 min-h-5 min-w-5 text-muted-foreground" /> {order.phone}
              </ListItem>
              <ListItem>
                <MailIcon className="h-5 w-5 min-h-5 min-w-5 text-muted-foreground" /> {order.address}
              </ListItem>
            </ul>

          </div>
          <OrderDialog order={order} />
        </div>

        <CardDescription className="whitespace-pre-wrap">
          Opis: {order.description}
        </CardDescription>
      </CardHeader>
      <div
        className="flex flex-col w-full h-full overflow-scroll">
        <PositionsTable order={order} asInvoice={false} />
      </div>
    </Card>
  );
}