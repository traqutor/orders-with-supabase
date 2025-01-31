import React from 'react';
import { ArrowBigLeft, Notebook } from 'lucide-react';
import { getOrderById } from '@/lib/db/orders_queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BackButton } from '@/components/ui/back-button';
import NoteDialog from '@/app/(protected)/order/note-dialog';
import NotesList from '@/app/(protected)/order/notes-list';
import { Pill } from '@/components/ui/pill';
import { ContactContentTab } from '@/app/(protected)/order/contact-content-tab';
import { InvoiceContentTab } from '@/app/(protected)/order/invoice-content-tab';
import { ServiceContentTab } from '@/app/(protected)/order/service-content-tab';
import { Button } from '@/components/ui/button';
import OrderActionsComponent from '@/components/order/order-actions-component';
import OrderStatusComponent from '@/components/order/order-status-component';

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
      <div className="flex items-center mt-2">
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
        className="mt-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <Card className="flex">
          <div className="flex-auto w-8/12">

            <CardHeader>
              <div className={'flex flex-auto justify-between'}>
                <div>
                  <CardTitle className="pb-2">{order.title}</CardTitle>
                </div>

                <div className="p-7">

                </div>
              </div>

              <div className="flex">
                <div className=" flex-auto w-4/12">
                  <OrderStatusComponent order={order} />
                </div>


                <div className="flex flex-wrap w-8/12 gap-2">
                  <OrderActionsComponent orderId={order.id} />
                </div>

              </div>
            </CardHeader>

            <CardContent>
              <TabsContent value="contact">
                <ContactContentTab order={order} />
              </TabsContent>
              <TabsContent value="warehouse">
                <InvoiceContentTab order={order} />
              </TabsContent>
              <TabsContent value="service">
                <ServiceContentTab order={order} />
              </TabsContent>
            </CardContent>

          </div>
          <div className="flex-auto w-2/12 p-6">
            <div className="flex flex-col gap-5">
              <NoteDialog orderId={orderId}>
                <Button size="sm" variant="outline" className="h-8 gap-1">
                  <Notebook className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Dodaj notatkę
                  </span>
                </Button>
              </NoteDialog>

              <NotesList orderId={orderId} />
            </div>
          </div>
        </Card>
      </div>

    </Tabs>


  );
}