import React from 'react';
import { getOrderById } from '@/lib/db/orders';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowBigLeft } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';
import DialogCreateNote from '@/app/(protected)/order/dialog-create-note';
import NotesList from '@/app/(protected)/order/notes-list';

export default async function OrderPage(
  props: {
    params: Promise<{ orderId: string }>;
  }
) {

  const { orderId } = await props.params;

  const { order } = await getOrderById(
    orderId
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
        <Card className="flex">
          <div className="flex-auto w-8/12">

            <CardHeader>

              <CardTitle>{order.title}</CardTitle>
              <CardDescription>
                Opis: {order.description}
              </CardDescription>

            </CardHeader>

            <CardContent>
              <TabsContent value="contact">
                <div>
                  <span>Klient: {order.customer_id}</span>
                </div>
              </TabsContent>
              <TabsContent value="warehouse">
                Invoice: {order.invoice_id}
              </TabsContent>
              <TabsContent value="service">
                Service: {order.service_id}
              </TabsContent>
            </CardContent>

          </div>
          <div className="flex-auto w-2/12 p-6">
            <div className="flex flex-col gap-5">
              <DialogCreateNote orderId={orderId} />

              <NotesList orderId={orderId} />
            </div>
          </div>
        </Card>
      </div>

    </Tabs>


  );
}