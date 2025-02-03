'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Calendar, LucidePlus, MailIcon, PhoneIcon, UserCircle2 } from 'lucide-react';
import { ServiceTable } from '@/app/(protected)/order/service-table';
import { getServicesForServiceId, postService, putService } from '@/lib/db/services_queries';
import { Tables } from '@/types_db';
import { Button } from '@/components/ui/button';
import { v4 } from 'uuid';
import { putOrder } from '@/lib/db/orders_queries';
import { mapOrderToFormData } from '@/app/(protected)/order/order-dialog';
import ServiceDialog from '@/app/(protected)/order/service-dialog';
import { ListItem } from '@/components/ui/list-item';
import { getFormatedDateTime } from '@/utils/time';
import { useRouter } from 'next/navigation';


export function ServiceContentTab({ order }: any) {

  const [service, setService] = useState<Tables<'services'>>();
  const router = useRouter();

  useEffect(() => {
    getService().then();
  }, []);

  const getService = async () => {
    if (!order.service_id) {
      return;
    }

    const { data, error } = await getServicesForServiceId(order.service_id);
    if (error) throw new Error(`Get Service for Order Service Id ${order.service_id} error:`, error);

    setService(data);
  };

  const handleAddService = async () => {
    const payload: Tables<'services'> = {
      id: v4(),
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

    const { data, error } = await postService(payload);

    if (error) throw new Error(`Create Service for ${payload} error:`, error);

    const { data: serviceData, error: serviceError } = await getServicesForServiceId(data.id);

    if (serviceError) throw new Error(`Create Service for ${payload} error:`, serviceError);

    const { error: orderError } = await putOrder(
      {
        ...mapOrderToFormData(order),
        service_id: serviceData.id
      }
    );

    if (orderError) throw new Error(`Update Order for service Id ${serviceData.id} error:`, orderError);

    setService(serviceData);

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
              Dotaj serwis
            </span>
          </Button>
        </div>}
    </div>
  );
}