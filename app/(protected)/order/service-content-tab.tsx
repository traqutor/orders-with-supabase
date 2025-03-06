'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Calendar, LucidePlus, MailIcon, PhoneIcon, UserCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { ServiceTable } from '@/app/(protected)/order/service-table';
import { Button } from '@/components/ui/button';
import ServiceDialog from '@/app/(protected)/order/service-dialog';
import { ListItem } from '@/components/ui/list-item';
import { getFormatedDateTime } from '@/utils/time';
import { NewService, Service } from '@/lib/db/schema';
import { useOrders } from '@/lib/client/useOrders';
import { useServices } from '@/lib/client/useServices';


export function ServiceContentTab({ order }: any) {

  const [service, setService] = useState<Service>();
  const router = useRouter();
  const { fetchService, createService, updateService } = useServices();
  const { updateOrder } = useOrders();


  useEffect(() => {
    getService().then();
  }, []);

  const getService = async () => {
    if (!order.service_id) {
      return;
    }

    const data = await fetchService(order.service_id);
    setService(data[0]);
  };

  const handleAddService = async () => {
    const payload: NewService = {
      description: '',
      contact: order.name,
      address: order.address,
      email: order.email,
      phone: order.phone,
      location: '',
      technician: '',
      end_at: null,
      start_at: null
    };

    const serviceData = await createService(payload);

    if (serviceData) {
      console.log(serviceData);
      await updateOrder(
        {
          ...order,
          service_id: serviceData[0].id
        }
      );

      setService(serviceData[0]);

    }

    router.refresh();
  };

  return (
    <div>
      {service ?
        <Card>
          <CardHeader>
            <div className="flex justify-between ">
              <div className="flex items-center justify-self-start gap-2">
                Serwis
              </div>
              <div className="flex gap-2">
                <ServiceDialog service={service} fetchDataOnSubmit={getService} />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div>
              <CardDescription className="flex align-middle gap-2 pb-2">
                Kontakt:
              </CardDescription>
              <div>
                <ul className="list-unstyled text-muted-foreground mb-5">
                  <ListItem className="mb-3">
                    <UserCircle2 className="h-5 w-5 min-h-5 min-w-5 " /> {service.contact}
                  </ListItem>
                  <ListItem>
                    <PhoneIcon className="h-5 w-5 min-h-5 min-w-5 " /> {service.phone}
                  </ListItem>
                  <ListItem>
                    <MailIcon className="h-5 w-5 min-h-5 min-w-5 " /> {service.address}
                  </ListItem>
                </ul>
              </div>
            </div>

            <div>
              <CardDescription className="flex align-middle gap-2 pb-2">
                Serwisant:
              </CardDescription>

              <ul className="list-unstyled text-muted-foreground mb-5">
                <ListItem className="mb-3">
                  <UserCircle2 className="h-5 w-5 min-h-5 min-w-5 " /> {service.technician}
                </ListItem>

              </ul>
              <CardDescription className="flex align-middle gap-2 pb-2">
                Wykonanie:
              </CardDescription>
              <ul className="list-unstyled text-muted-foreground mb-5">
                <ListItem>
                  <Calendar
                    className="h-5 w-5 min-h-5 min-w-5 " /> {getFormatedDateTime(service.start_at)} -{'>'} {getFormatedDateTime(service.end_at)}
                </ListItem>
              </ul>
            </div>


            <ServiceTable serviceId={service.id} />

          </CardContent>
        </Card> :
        <div>
          <Button size="sm" variant="outline" className="h-8 gap-1" onClick={handleAddService}>
            <LucidePlus />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Dodaj serwis
            </span>
          </Button>
        </div>}
    </div>
  );
}