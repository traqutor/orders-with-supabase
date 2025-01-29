import React from 'react';
import { ArrowBigLeft, Notebook } from 'lucide-react';
import { getOrderById } from '@/lib/db/orders';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BackButton } from '@/components/ui/back-button';
import NoteCreateDialog from '@/app/(protected)/order/note-create-dialog';
import NotesList from '@/app/(protected)/order/notes-list';
import { Pill } from '@/components/ui/pill';
import { ContactContentTab } from '@/app/(protected)/order/contact-content-tab';
import { InvoiceContentTab } from '@/app/(protected)/order/invoice-content-tab';
import { ServiceContentTab } from '@/app/(protected)/order/service-content-tab';
import { Button } from '@/components/ui/button';
import OrderCreateDialog from '@/app/(protected)/orders/order-create-dialog';
import OrderActionsComponent from '@/components/Action/order-actions-component';

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
              <div className={'flex flex-auto justify-between pb-5'}>
                <div>
                  <CardTitle className="pb-2">{order.title}</CardTitle>
                  <CardDescription className="whitespace-pre-wrap">
                    Opis: {order.description}
                  </CardDescription>
                </div>

                <div className="p-7">
                  <OrderCreateDialog order={order} />
                </div>
              </div>

              <div className="flex">
                <div className=" flex-auto w-4/12">
                  <span className="text-sm text-muted-foreground mr-2">Status: </span> <Pill
                    key={order.orders_statuses.id}
                    variant={order.orders_statuses.color_hex || 'default' as any}
                    title={order.orders_statuses.title || ''}
                  />
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
              <NoteCreateDialog orderId={orderId}>
                <Button size="sm" variant="outline" className="h-8 gap-1">
                  <Notebook className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Dodaj notatkę
                  </span>
                </Button>
              </NoteCreateDialog>

              <NotesList orderId={orderId} />
            </div>
          </div>
        </Card>
      </div>

    </Tabs>


  );
}