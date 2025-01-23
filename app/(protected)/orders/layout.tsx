import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { File } from 'lucide-react';
import DialogCreateOrder from '@/app/(protected)/orders/dialog-create-order';
import { getListQuery } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { Tables } from '@/types_db';

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

  const supabase = await createClient();
  const statuses: OrderStatus[] = await getListQuery(supabase, 'orders_statuses') as OrderStatus[];

  return (
    <Tabs defaultValue="tab">
      <div className="flex items-center">
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
          <DialogCreateOrder />

        </div>
      </div>
      <div
        className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        {children}
      </div>
    </Tabs>
  );
}