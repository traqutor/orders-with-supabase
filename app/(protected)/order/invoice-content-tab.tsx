'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { ListItem } from '@/components/ui/list-item';
import { Edit, IdCardIcon, LucidePlus, MailIcon, PhoneIcon, UserCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PositionsTable } from '@/app/(protected)/order/positions-table';


export function InvoiceContentTab({ order }: any) {

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex justify-between ">
            <div className="flex items-center justify-self-start gap-2"><span>Nr Faktury:</span> <span
              className="text-2xl">FV 123/24/2025</span></div>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <Edit />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Dane faktury
            </span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <CardDescription className=" pb-2">
              Kontrahent:
            </CardDescription>
            <div>
              <ul className="list-unstyled mb-5">
                <ListItem className="mb-3">
                  <UserCircle2 className="h-5 w-5 min-h-5 min-w-5 text-muted-foreground" /> {order.name}
                </ListItem>
                <ListItem>
                  <IdCardIcon className="h-5 w-5 min-h-5 min-w-5 text-muted-foreground" /> {order.nip &&
                  <span><span className="text-muted-foreground pr-1">NIP:</span>{order.nip}</span>}
                  {order.regon &&
                    <span><span className="text-muted-foreground pr-1">REGON:</span> {order.regon}</span>}
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
            <PositionsTable order={order} asInvoice={true}/>
          </div>
        </CardContent>

        <CardFooter>
          Płatnosć: Do dnia: Grupa fakturowa:
        </CardFooter>

      </Card>

      <div className="flex justify-between p-5">
        <div className="flex items-center justify-self-start gap-2"><span>Wysyłka:</span></div>
        <Button size="sm" variant="outline" className="h-8 gap-1">
          <LucidePlus />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Dodaj wysyłkę
            </span>
        </Button>
      </div>
    </div>
  );
}