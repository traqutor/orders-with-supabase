'use client';

import React from 'react';
import { CardDescription } from '@/components/ui/card';
import { LucidePlus, UserCircle2 } from 'lucide-react';
import { ServiceTable } from '@/app/(protected)/order/service-table';
import { Button } from '@/components/ui/button';
import * as Form from '@/components/ui/form';


export function ServiceContentTab({ order }: any) {

  console.log('orderorderorderorder', order);

  const handleEdit = (position: any) => {
    console.log('Edit order', position);
  };
  const handleDelete = (position: any) => {
    console.log('Delete order', position);
  };

  return (
    <div>
      <div className="flex gap-7">
        <div className="flex-auto w-6/12 ">
          <CardDescription className="flex align-middle gap-2 pb-2">
            <UserCircle2 /> Osba do kontaktu:
          </CardDescription>
          <div>
             {order.name}, {order.phone}, {order.address}
          </div>
        </div>
        <div className=" flex-auto w-6/12">
          <CardDescription className=" pb-2">
            Planowany czas wykonania:
          </CardDescription>
          <div>

            <Form.Root>
              <Form.Field>
                <Form.Row>
                  <Form.Label htmlFor="startAtId">Rozpoczęcie</Form.Label>
                </Form.Row>
                <Form.Input
                  id="startAtId"
                  type="text"
                  name="startAt"
                  value={'24-01-2025'}
                  onChange={(e) => {
                    console.log(e);
                  }}
                  placeholder="Rozpoczęcie"
                  required />
              </Form.Field>
            </Form.Root>


            <Form.Root>
              <Form.Field>
                <Form.Row>
                  <Form.Label htmlFor="endAtId">Zakończenie</Form.Label>
                </Form.Row>
                <Form.Input
                  id="endAtId"
                  type="text"
                  name="endAt"
                  value={'1-02-2025'}
                  onChange={(e) => {
                    console.log(e);
                  }}
                  placeholder="Zakończenie"
                  required />
              </Form.Field>
            </Form.Root>
          </div>

        </div>
      </div>
      <div
        className="flex flex-col w-full h-full overflow-scroll">
        <div className="flex justify-between py-5">
          <span className="text-sm text-muted-foreground">Pozycje serwisowe</span>
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <LucidePlus />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Dodaj pozycję
            </span>
          </Button>
        </div>
        <ServiceTable positions={order.orders_positions} totalPositions={1} totalPriceGross={2}
                      totalPriceNett={3} />
      </div>
    </div>
  );
}