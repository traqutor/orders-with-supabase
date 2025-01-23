import React from 'react';
import { ArrowBigLeft, MailIcon, PhoneIcon, UserCircle2 } from 'lucide-react';
import { getOrderById } from '@/lib/db/orders';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BackButton } from '@/components/ui/back-button';
import DialogCreateNote from '@/app/(protected)/order/dialog-create-note';
import NotesList from '@/app/(protected)/order/notes-list';
import { Pill } from '@/components/ui/pill';
import { ListItem } from '@/components/ui/list-item';
import { PositionsTable } from '@/app/(protected)/order/positions-table';

export default async function OrderPage(
  props: {
    params: Promise<{ orderId: string }>;
  }
) {

  const { orderId } = await props.params;

  const { order } = await getOrderById(
    orderId
  );

  console.log(order);

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
        className="mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <Card className="flex">
          <div className="flex-auto w-8/12">

            <CardHeader>
              <CardTitle className="pb-2">{order.title}  </CardTitle>
              <CardDescription className="flex">
                <div className=" flex-auto w-4/12">Status: <Pill
                  key={order.orders_statuses.id}
                  variant={order.orders_statuses.color_hex || 'default' as any}
                  title={order.orders_statuses.title || ''} /></div>

                <div className="flex flex-wrap w-8/12 gap-2"> Akcje: {order.orders_actions.map((a: {
                    actions: { id: React.Key | null | undefined; color_hex: any; title: any; };
                  }) =>
                    <Pill
                      size="sm"
                      key={a.actions.id}
                      variant={a.actions.color_hex || 'default' as any}
                      title={a.actions.title || ''} />
                )}{order.orders_actions.map((a: {
                    actions: { id: React.Key | null | undefined; color_hex: any; title: any; };
                  }) =>
                    <Pill
                      size="sm"
                      key={a.actions.id}
                      variant={a.actions.color_hex || 'default' as any}
                      title={a.actions.title || ''} />
                )}{order.orders_actions.map((a: {
                    actions: { id: React.Key | null | undefined; color_hex: any; title: any; };
                  }) =>
                    <Pill
                      size="sm"
                      key={a.actions.id}
                      variant={a.actions.color_hex || 'default' as any}
                      title={a.actions.title || ''} />
                )}</div>

              </CardDescription>
              <CardDescription>
                Opis: {order.description}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <TabsContent value="contact">
                <div>
                  <CardDescription className="pb-2">
                    Klient:
                  </CardDescription>
                  <div>
                    <ul className="list-unstyled mb-5">
                      <ListItem label="Klient">
                        <UserCircle2 /> {order.name}
                      </ListItem>
                      <ListItem label="Telefon">
                        <PhoneIcon /> {order.phone}
                      </ListItem>
                      <ListItem label="Adres">
                        <MailIcon /> {order.address}
                      </ListItem>
                      <ListItem label="NIP">
                        NIP: {order.nip}
                      </ListItem>
                      <ListItem label="REGON">
                        REGON: {order.regon}
                      </ListItem>
                    </ul>
                  </div>


                </div>
                <div
                  className="flex flex-col w-full h-full overflow-scroll">
                  <PositionsTable positions={order.orders_positions} totalPositions={1} totalPriceGross={2}
                                  totalPriceNett={3} />
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