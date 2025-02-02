'use client';

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { PositionRow } from '@/app/(protected)/order/position-row';
import { Button } from '@/components/ui/button';
import { LucidePlus } from 'lucide-react';
import { Tables } from '@/types_db';
import {
  deleteOrderPosition,
  getPositionsForOrderId,
  postOrderPosition,
  putOrderPosition
} from '@/lib/db/orders_positions';
import { v4 } from 'uuid';


type OrderPosition = Tables<'orders_positions'>

export function PositionsTable({
                                 order,
                                 asInvoice
                               }: {
  order: Tables<'orders'>,
  asInvoice: boolean
}) {

  const [positions, setPositions] = useState<OrderPosition[]>();


  useEffect(() => {
    getPositions().then();
  }, []);

  const getPositions = async () => {
    const { data, error } = await getPositionsForOrderId(order.id);
    if (error) throw new Error(`Get list of Order Positions for Order Id ${order.id} error:`, error);

    setPositions(data);
  };

  const handleAddPosition = async () => {
    const position: OrderPosition = {
      id: v4(),
      order_id: order.id,
      created_at: new Date().toISOString(),
      position_type: '',
      description: '',
      is_optima: false,
      price: null,
      price_type: 'netto',
      unit: 'szt',
      quantity: null
    };
    await postOrderPosition({ ...position });
    await getPositions();
  };

  const handleUpdatePosition = async (position: OrderPosition) => {
    await putOrderPosition({ ...position });
  };

  const handleDeletePosition = async (position: OrderPosition) => {
    await deleteOrderPosition({ ...position });
    await getPositions();
  };

  return (
    <Card className="border-none">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Nazwa</TableHead>
              <TableHead className="w-[140px] text-center" >Rodzaj</TableHead>
              <TableHead className="w-[90px] text-center">Jedn.</TableHead>
              <TableHead className="w-[90px] text-right" >Ilość</TableHead>
              <TableHead className="w-[140px] text-right">Cena</TableHead>
              <TableHead className="w-[90px]"></TableHead>
              {asInvoice && <TableHead className="w-[90px] text-center">Optima</TableHead>}
              <TableHead className="w-[90px]">
                <span className="sr-only">Menu</span>
              </TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            {positions?.map((position, idx) =>
              <PositionRow
                key={position.id}
                position={position}
                rowNumber={idx + 1}
                asInvoice={asInvoice}
                onUpdatePosition={handleUpdatePosition}
                onDeletePosition={handleDeletePosition}
              />
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardHeader>
        <div className="flex justify-between">
          <CardDescription className="flex justify-between ">
            <span>Pozycje do zamówienia</span>
          </CardDescription>
          <div className="flex gap-2">
            <Button onClick={handleAddPosition} size="sm" variant="outline" className="h-8 gap-1">
              <LucidePlus />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Dodaj pozycję
            </span>
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}