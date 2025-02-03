import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { File, PlusCircle } from 'lucide-react';
import OrderDialog from '@/app/(protected)/order/order-dialog';
import { Tables } from '@/types_db';
import { getOrdersStatuses } from '@/lib/db/orders_statuses';

const title = 'Zamówienia';

export const metadata = {
  title
};

type OrderStatus = Tables<'orders_statuses'>;

export default async function Layout({
                                       children
                                     }: {
  children: React.ReactNode;
}) {

  const { data, error } = await getOrdersStatuses();

  if (error) {
    throw new Error(`Get list of Orders Statuses error:`, error);
  }

  const statuses: OrderStatus[] = data as OrderStatus[];

  return (
    <Tabs defaultValue="tab">
      <div className="flex items-center mt-2">
        <TabsList>

          <Link href="/orders">
            <TabsTrigger value="tab">Wszystkie</TabsTrigger>
          </Link>

          {statuses.map((status) =>
            (<Link key={status.id} href={`/orders/${status.id}`}>
              <TabsTrigger value={status.id}>{status.title}</TabsTrigger>
            </Link>)
          )}

        </TabsList>
        <div className="ml-auto flex items-center gap-2 pr-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>

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