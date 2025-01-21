import React from 'react';
import { getOrderById } from '@/lib/db/orders';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowBigLeft, Notebook } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';

export default async function OrderPage(
  props: {
    children: React.ReactNode;
    params: Promise<{ orderSlug: string }>;
  }
) {

  const { orderSlug } = await props.params;

  const { order } = await getOrderById(
    orderSlug
  );

  return (
    <Tabs defaultValue="contact">
      <div className="flex items-center">
        <TabsList>

          <TabsTrigger value="contact">Kontakt</TabsTrigger>

          <TabsTrigger value="warehouse">Magazyn</TabsTrigger>

          <TabsTrigger value="service">Montaż</TabsTrigger>

        </TabsList>
        <div className="ml-auto flex items-center gap-2 pr-2">
          <BackButton size="sm" variant="outline" className="h-8 gap-1">
            <ArrowBigLeft className="h-5 w-5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Wróć do listy zamówień
            </span>
          </BackButton>
        </div>
      </div>
      <div
        className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <Card>
          <div className="flex flex-1 justify-between">
            <CardHeader>

              <CardTitle>{order.title}</CardTitle>
              <CardDescription>
                Opis: {order.description}
              </CardDescription>

            </CardHeader>

            <div className="flex justify-center items-center p-6">
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <Notebook className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Dodaj notatkę
            </span>
              </Button>
            </div>
          </div>
          <div className="flex p-6">

            <div className="flex-auto w-8/12">
              <CardContent>
                <TabsContent value="contact">
                  Klient: {order.customer_id}
                </TabsContent>
                <TabsContent value="warehouse">
                  Invoice: {order.invoice_id}
                </TabsContent>
                <TabsContent value="service">
                  Service: {order.service_id}
                </TabsContent>
              </CardContent>
            </div>
            <div className="flex-auto w-2/12 border-l-2 p-6">
              03 content
            </div>
          </div>

        </Card>
      </div>

    </Tabs>


  );
}