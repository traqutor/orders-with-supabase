import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OrdersTable } from './orders-table';
import { getOrders } from '@/lib/db/orders';
import DialogDemo from '@/app/(protected)/orders/order-create-dialog';

export default async function OrdersPage(
  props: {
    searchParams: Promise<{ q: string; offset: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  const { orders, newOffset, totalOrdersCounter } = await getOrders(
    search,
    Number(offset)
  );

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2 pr-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <DialogDemo />

        </div>
      </div>
      <TabsContent value="all">
        <OrdersTable
          orders={orders}
          offset={newOffset ?? 0}
          totalProducts={totalOrdersCounter}
        />
      </TabsContent>
    </Tabs>
  );
}