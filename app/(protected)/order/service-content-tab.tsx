'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Edit, LucidePlus, UserCircle2 } from 'lucide-react';
import { ServiceTable } from '@/app/(protected)/order/service-table';
import * as Form from '@/components/ui/form';
import { getServicesForServiceId, postService, putService } from '@/lib/db/services_queries';
import { Tables } from '@/types_db';
import { Button } from '@/components/ui/button';
import { v4 } from 'uuid';
import { putOrder } from '@/lib/db/orders_queries';
import { mapOrderToFormData } from '@/app/(protected)/order/order-create-dialog';


export function ServiceContentTab({ order }: any) {

  const [service, setService] = useState<Tables<'services'>>();

  useEffect(() => {
    getServicePositions().then();
  }, []);

  const getServicePositions = async () => {
    const { data, error } = await getServicesForServiceId(order.service_id);
    if (error) throw new Error(`Get Service for Order Service Id ${order.service_id} error:`, error);

    setService(data);
  };

  const handleAddService = async () => {
    const payload: Tables<'services'> = {
      id: v4(),
      address: '',
      description: '',
      contact: '',
      email: '',
      phone: '',
      end_at: null,
      location: '',
      start_at: null,
      technician: ''
    };

    const { data, error } = await postService(payload);

    if (error) throw new Error(`Create Service for ${payload} error:`, error);

    const { data: service, error: serviceError } = await getServicesForServiceId(data.id);

    if (serviceError) throw new Error(`Create Service for ${payload} error:`, serviceError);

    const { error: orderError } = await putOrder(
      {
        ...mapOrderToFormData(order),
        service_id: service.id
      }
    );

    if (orderError) throw new Error(`Update Order for service Id ${service.id} error:`, orderError);

    setService(service);
  };

  const handleUpdateService = async (service: Tables<'services'>) => {
    await putService({ ...service });
  };


  return (
    <div>
      {service ?
        <Card>
          <CardHeader>
            <div className="flex justify-between ">
              <div className="flex items-center justify-self-start gap-2">
                <span>Osoba do kontaktu:</span>
                <span
                  className="text-2xl">
                {service.contact}
              </span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="h-8 gap-1">
                  <Edit />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Dane kontaktowe
                  </span>
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div>
              <CardDescription className="flex align-middle gap-2 pb-2">
                <UserCircle2 /> Osba do kontaktu:
              </CardDescription>
              <div>
                {service.contact}, {service.phone}, {service.address}
              </div>
            </div>

            <div className=" flex gap-3 justify-start items-center">
                Planowany czas wykonania:


                <Form.Root className="flex gap-2">
                  <Form.Field>
                    <Form.Row className="text-sm text-muted-foreground">
                      <Form.Label  htmlFor="startAtId">Rozpoczęcie</Form.Label>
                    </Form.Row>
                    <Form.Input
                      id="startAtId"
                      type="datetime-local"
                      name="startAt"
                      value={service.start_at || ''}
                      onChange={(e) => {
                        console.log(e);
                      }}
                      placeholder="Rozpoczęcie"
                      required />
                  </Form.Field>

                  <Form.Field>
                    <Form.Row className="text-sm text-muted-foreground">
                      <Form.Label htmlFor="endAtId">Zakończenie</Form.Label>
                    </Form.Row>
                    <Form.Input
                      id="endAtId"
                      type="datetime-local"
                      name="endAt"
                      value={service.end_at || ''}
                      onChange={(e) => {
                        console.log(e);
                      }}
                      placeholder="Zakończenie"
                      required />
                  </Form.Field>
                </Form.Root>

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