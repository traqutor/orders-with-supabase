'use client';

import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { OrderRow } from './order-row';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PRODUCTS_PER_PAGE } from '@/lib/utils';


export function OrdersTable({
                              orders,
                              offset,
                              totalProducts
                            }: {
  orders: any[];
  offset: number;
  totalProducts: number;
}) {
  const router = useRouter();
  const productsPerPage = PRODUCTS_PER_PAGE;

  function handlePrevPage() {
    router.back();
  }

  function handleNextPage() {
    const path = `?offset=${offset}`;
    router.push(path, { scroll: false });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista zamówień</CardTitle>
        <CardDescription>
          Zarządzaj swoimi zamówieniami i przeglądaj wyniki sprzedaży.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead className="">Tytuł</TableHead>
              <TableHead className="">Klient</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead className="">Z dnia</TableHead>
              <TableHead className="">Akcje</TableHead>
              <TableHead>
                <span className="sr-only">Menu</span>
              </TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map(order => (
              <OrderRow key={order.id} {...order} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {Math.max(0, Math.min(offset - productsPerPage, totalProducts) + 1)}-{offset}
            </strong>{' '}
            of <strong>{totalProducts}</strong> orders
          </div>
          <div className="flex">
            <Button
              formAction={handlePrevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === productsPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>

            <Button
              formAction={handleNextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset > totalProducts}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}