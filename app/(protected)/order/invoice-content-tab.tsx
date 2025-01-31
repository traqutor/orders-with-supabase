'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { ListItem } from '@/components/ui/list-item';
import { Clock, IdCardIcon, LucidePlus, MailIcon, PhoneIcon, UserCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PositionsTable } from '@/app/(protected)/order/positions-table';
import { Tables } from '@/types_db';
import { putService } from '@/lib/db/services_queries';
import { v4 } from 'uuid';
import { putOrder } from '@/lib/db/orders_queries';
import { mapOrderToFormData } from '@/app/(protected)/order/order-dialog';
import { getInvoiceByInvoiceId, postInvoice } from '@/lib/db/invoices_queries';
import InvoiceDialog from '@/app/(protected)/order/invoice-dialog';
import { getShipmentByShipmentId, postShipment } from '@/lib/db/shipment_queries';
import ShipmentDialog from '@/app/(protected)/order/shipment-dialog';
import { getFormatedDate } from '@/utils/time';


export function InvoiceContentTab({ order }: any) {


  const [invoice, setInvoice] = useState<Tables<'invoices'>>();
  const [shipment, setShipment] = useState<Tables<'shipments'>>();

  useEffect(() => {
    getInvoice().then();
    getShipment().then();
  }, []);

  const getInvoice = async () => {
    if (!order.invoice_id) {
      return;
    }

    const { data, error } = await getInvoiceByInvoiceId(order.invoice_id);
    if (error) throw new Error(`Get Service for Order Service Id ${order.service_id} error:`, error);

    setInvoice(data);
  };

  const getShipment = async () => {
    if (!order.shipment_id) {
      return;
    }

    const { data, error } = await getShipmentByShipmentId(order.shipment_id);
    if (error) throw new Error(`Get Shipment for Order Shipment Id ${order.shipment_id} error:`, error);

    setShipment(data);
  };

  const handleAddInvoice = async () => {
    const payload: Tables<'invoices'> = {
      id: v4(),
      address: order.address,
      invoice_number: '',
      total_amount: null,
      payment_type: 'cash',
      nip: order.nip,
      payment_at: null,
      is_invoice_group: false,
      group_description: '',
      group_cost: null,
      regon: order.regon,
      description: '',
      phone: order.phone,
      contact: order.name,
      email: order.name
    };

    const { data, error } = await postInvoice(payload);

    if (error) throw new Error(`Create Invoice for ${payload} error:`, error);

    const { error: orderError } = await putOrder(
      {
        ...mapOrderToFormData(order),
        invoice_id: data.id
      }
    );

    if (orderError) throw new Error(`Update Order for Invoice Id ${data.id} error:`, orderError);

    setInvoice(data);
  };

  const handleAddShipment = async () => {
    const payload: Tables<'shipments'> = {
      id: v4(),
      address: order.address,
      due_at: new Date().toISOString(),
      contact: order.name,
      email: order.email,
      phone: order.phone
    };

    const { data, error } = await postShipment(payload);

    if (error) throw new Error(`Create Shipment for ${payload} error:`, error);

    const { error: orderError } = await putOrder(
      {
        ...mapOrderToFormData(order),
        shipment_id: data.id
      }
    );

    if (orderError) throw new Error(`Update Order for Shipment Id ${data.id} error:`, orderError);

    setShipment(data);
  };

  const handleUpdateService = async (service: Tables<'services'>) => {
    await putService({ ...service });
  };

  return (
    <div>
      {invoice ?
        <Card>
          <CardHeader>
            <div className="flex justify-between ">
              <div className="flex items-center justify-self-start gap-2"><span>Faktura Nr:</span>
                <span
                  className="text-2xl">
                {invoice.invoice_number}
              </span>
              </div>
              <div className="flex gap-2">
                <InvoiceDialog invoice={invoice} fetchDataOnSubmit={getInvoice} />

                {shipment ? <ShipmentDialog shipment={shipment} fetchDataOnSubmit={getShipment} /> :
                  <Button size="sm" variant="outline" className="h-8 gap-1"
                          onClick={handleAddShipment}
                  >
                    <LucidePlus />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap"> Dodaj wysyłkę</span>
                  </Button>}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex items-start justify-between gap-5">

              <div className="w-full">
                <CardDescription className=" pb-2">
                  Kontrahent:
                </CardDescription>
                <div>
                  <ul className="list-unstyled mb-5">
                    <ListItem className="mb-3">
                      <UserCircle2 className="h-5 w-5 min-h-5 min-w-5 text-muted-foreground" /> {invoice.contact}
                    </ListItem>
                    <ListItem>
                      <IdCardIcon className="h-5 w-5 min-h-5 min-w-5 text-muted-foreground" /> {invoice.nip &&
                      <span><span className="text-muted-foreground pr-1">NIP:</span>{invoice.nip}</span>}
                      {invoice.regon &&
                        <span><span className="text-muted-foreground pr-1">REGON:</span> {invoice.regon}</span>}
                    </ListItem>

                    <ListItem>
                      <PhoneIcon className="h-5 w-5 min-h-5 min-w-5 text-muted-foreground" /> {invoice.phone}
                    </ListItem>
                    <ListItem>
                      <MailIcon className="h-5 w-5 min-h-5 min-w-5 text-muted-foreground" /> {invoice.address}
                    </ListItem>
                  </ul>
                </div>
              </div>

              {shipment ? <div className="w-full">
                <CardDescription className=" pb-2">
                  Wysyłka:
                </CardDescription>
                <div>
                  <ul className="list-unstyled mb-5">
                    <ListItem className="mb-3">
                      <UserCircle2 className="h-5 w-5 min-h-5 min-w-5 text-muted-foreground" /> {shipment.contact}
                    </ListItem>

                    <ListItem>
                      <PhoneIcon className="h-5 w-5 min-h-5 min-w-5 text-muted-foreground" /> {shipment.phone}
                    </ListItem>
                    <ListItem>
                      <MailIcon className="h-5 w-5 min-h-5 min-w-5 text-muted-foreground" /> {shipment.address}
                    </ListItem>
                    <CardDescription className="pt-3 pb-2">
                      Wysłać do końca dnia:
                    </CardDescription>
                    <ListItem>
                      <Clock
                        className="h-5 w-5 min-h-5 min-w-5 text-muted-foreground" /> {getFormatedDate(shipment.due_at)}
                    </ListItem>
                  </ul>
                </div>

              </div> : <div className="w-full"></div>}
            </div>

            <div className="flex pb-3 gap-2 justify-start items-center flex-wrap text-md text-muted-foreground">
              Płatnosć: <span className="text-foreground">{invoice.payment_type}</span> Do dnia: <span
              className="text-foreground">{invoice.payment_at}</span>
            </div>

            {invoice.is_invoice_group && <div className="py-2">
              <CardDescription className="pb-3">
                Grupa fakturowa:
              </CardDescription>
              <div className="flex gap-2 justify-start items-center flex-wrap text-md text-muted-foreground">
                <span>Koszt: <span className="text-foreground">{invoice.group_cost}</span> Opis: <span
                  className="text-foreground">{invoice.group_description}</span></span>
              </div>
            </div>}

            <div
              className="flex flex-col w-full h-full overflow-scroll">
              <PositionsTable order={order} asInvoice={true} />
            </div>
          </CardContent>

        </Card> :
        <div>
          <Button size="sm" variant="outline" className="h-8 gap-1" onClick={handleAddInvoice}>
            <LucidePlus />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Dotaj Fakturę
            </span>
          </Button>
        </div>}
    </div>
  );
}