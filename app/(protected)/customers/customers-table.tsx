'use client';

import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PRODUCTS_PER_PAGE } from '@/lib/utils';
import { CustomerRow } from '@/app/(protected)/customers/customer-row';


export function CustomersTable({
                                 customers,
                                 offset,
                                 totalProducts
                               }: {
  customers: any[];
  offset: number;
  totalProducts: number;
}) {
  const router = useRouter();
  const productsPerPage = PRODUCTS_PER_PAGE;

  function prevPage() {
    router.back();
  }

  function nextPage() {
    const path = `?offset=${offset}`;
    router.push(path, { scroll: false });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista klientów</CardTitle>
        <CardDescription>
          Zarządzaj danumi swoich klientów i przeglądaj wyniki sprzedaży.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Nazwa</TableHead>
              <TableHead>Rodzaj</TableHead>
              <TableHead className="hidden md:table-cell">Kontakt</TableHead>
              <TableHead className="hidden md:table-cell">NIP</TableHead>
              <TableHead className="hidden md:table-cell">Regon</TableHead>
              <TableHead>
                <span className="sr-only">Menu</span>
              </TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map(customer => (
              <CustomerRow key={customer.id} {...customer} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Lista{' '}
            <strong>
              {Math.max(0, Math.min(offset - productsPerPage, totalProducts) + 1)}-{offset}
            </strong>{' '}
            z <strong>{totalProducts}</strong> klientów
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === productsPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
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