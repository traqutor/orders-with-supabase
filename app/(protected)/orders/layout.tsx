import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PinIcon, PlusCircle } from 'lucide-react';
import OrderDialog from '@/app/(protected)/order/order-dialog';
import { orders_statuses, OrderStatus } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';


const title = 'Zamówienia';

export const metadata = {
  title
};


export default async function Layout(
  { children }: { children: React.ReactNode; }) {

  const statuses: OrderStatus[] = await sBase
    .select()
    .from(orders_statuses);

  return (
    <Tabs defaultValue="tab">
      <div className="flex items-center mt-2">

        <TabsList>
          <Link href="/orders">
            <TabsTrigger value="tab">Wszystkie</TabsTrigger>
          </Link>

          <Link href="/orders/pinned">
            <TabsTrigger value="pinned">
              <span className="relative">
                Moje <PinIcon className="absolute bottom-2.5 left-6 text-tomato-900 dark:text-tomato-600 rotate-12" />
              </span>
            </TabsTrigger>
          </Link>

          {statuses.map((status) =>
            (<Link key={status.id} href={`/orders/${status.id}`}>
              <TabsTrigger value={status.id}>{status.title}</TabsTrigger>
            </Link>)
          )}
        </TabsList>

        <div className="ml-11 flex items-center gap-2 pr-2">
          {/*<Button size="sm" variant="outline" disabled className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>*/}

          <OrderDialog triggerButton={<Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Dodaj Zamówienie
          </span>
          </Button>}
          />

        </div>
      </div>
      <div
        className="mt-2 ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        {children}
      </div>
    </Tabs>
  );
}