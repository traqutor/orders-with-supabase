import React from 'react';
import { ArrowBigLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BackButton } from '@/components/ui/back-button';
import { getCustomerById } from '@/lib/db/customers';
import { CustomerContentTab } from '@/app/(protected)/customer/customer-content-tab';
import { CustomersOrdersContentTab } from '@/app/(protected)/customer/customers-orders-content-tab';
import CustomerCreateDialog from '@/app/(protected)/customers/customer-create-dialog';

export default async function CustomerPage(
  props: {
    params: Promise<{ customerId: string }>;
  }
) {

  const { customerId } = await props.params;

  const { customer } = await getCustomerById(
    customerId
  );

  return (
    <Tabs defaultValue="customer">
      <div className="flex items-center mt-2">
        <TabsList>

          <TabsTrigger value="customer">Kontrahent</TabsTrigger>
          <TabsTrigger value="customers_orders">Zamówienia Kontrahenta</TabsTrigger>

        </TabsList>
        <div className="ml-auto flex items-center gap-2 pr-2">
          <BackButton size="sm" variant="outline" className="h-8 gap-1">
            <ArrowBigLeft className="h-5 w-5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Wróć do listy klientów
            </span>
          </BackButton>
        </div>
      </div>
      <div
        className="mt-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <Card>

          <div className={'flex flex-auto justify-between'}>

            <CardHeader>
              <CardTitle className="pb-2">{customer.name}  </CardTitle>

              <CardDescription>
                Opis: {customer.description}
              </CardDescription>
            </CardHeader>

            <div className={'p-7'}>
              <CustomerCreateDialog customer={customer} />
            </div>
          </div>

          <CardContent>
            <TabsContent value="customer">
              <CustomerContentTab customer={customer} />
            </TabsContent>
            <TabsContent value="customers_orders">
              <CustomersOrdersContentTab customer={customer} />
            </TabsContent>

          </CardContent>


        </Card>
      </div>
    </Tabs>


  );
}