'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PRODUCTS_PER_PAGE } from '@/lib/utils';
import { CustomerRow } from '@/app/(protected)/customers/customer-row';
import { getData } from '@/utils/helpers';
import { CustomerItem } from '@/app/api/dashboard/customers/route';
import { Customer } from '@/lib/db/schema';
import ClientOrderDialog from '@/app/(protected)/customers/customer-order-dialog';


export function CustomersTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [customers, setCustomers] = useState<CustomerItem[] | undefined>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>();
  const [total, setTotal] = useState<number | undefined>(0);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);


  const productsPerPage = PRODUCTS_PER_PAGE;
  const query = searchParams.get('query');
  const offset = Number(searchParams.get('offset')) || 1;
  const url = query ? `api/dashboard/customers?offset=${offset}&query=${query}` : `api/dashboard/customers?offset=${offset}`;
  const urlCounter = query ? `api/dashboard/customers?counter=true&query=${query}` : `api/dashboard/customers?counter=true`;
  const nextUrl = query ? `?offset=${offset + 1}&query=${query}` : `?offset=${offset + 1}`;


  useEffect(() => {
    getData<CustomerItem[]>({ url }).then(({ data }) => {
      setCustomers(data);
    });
    getData<CustomerItem[]>({ url: urlCounter }).then((response) => {
      setTotal(response.data?.length);
    });
  }, [offset, query]);


  const handleToggleEditDialog = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsOrderDialogOpen(!isOrderDialogOpen);
  };

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(nextUrl, { scroll: false });
  }

  return (
    <Card>
      {selectedCustomer &&
        <ClientOrderDialog isOpen={isOrderDialogOpen} customer={selectedCustomer}
                           onToggleOpen={handleToggleEditDialog} />}
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
            {customers?.map(cus => (
              <CustomerRow key={cus.customers.id} customer={cus} onToggleEditDialog={handleToggleEditDialog} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Lista{' '}
            <strong>
              {Math.max(0, Math.min(offset - productsPerPage, (total || 0)) + 1)}-{offset}
            </strong>{' '}
            z <strong>{(total || 0)}</strong> klientów
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
              Wróć
            </Button>


            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset > (total || 0)}
            >
              Dalej
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}