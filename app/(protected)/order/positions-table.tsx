'use client';

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { PositionRow } from '@/app/(protected)/order/position-row';
import { Button } from '@/components/ui/button';
import { LucidePlus } from 'lucide-react';
import { v4 } from 'uuid';
import { NewOrderPosition, Order, OrderPosition } from '@/lib/db/schema';
import { useOrdersPositions } from '@/lib/client/useOrdersPositions';


export function PositionsTable({
                                 order,
                                 asInvoice
                               }: {
  order: Order,
  asInvoice: boolean
}) {

  const [positions, setPositions] = useState<OrderPosition[]>();

  const { fetchOrderPositions, createOrderPosition, updateOrderPosition, deleteOrderPosition } = useOrdersPositions();

  const getPositions = async () => {
    const positions = await fetchOrderPositions(order.id);
    setPositions(positions);
  };

  const handleAddPosition = async () => {
    const position: NewOrderPosition = {
      id: v4(),
      order_id: order.id,
      position_type: 'sell',
      description: '',
      is_optima: false,
      price: null,
      price_type: 'netto',
      unit: 'szt',
      quantity: null
    };
    await createOrderPosition({ ...position });
    await getPositions();
  };

  const handleUpdatePosition = async (position: OrderPosition) => {
    await updateOrderPosition({ ...position });
  };

  const handleDeletePosition = async (position: OrderPosition) => {
    await deleteOrderPosition({ ...position });
    await getPositions();
  };

  useEffect(() => {
    getPositions();
  }, []);

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
              <TableHead className="w-[140px] text-center">Rodzaj</TableHead>
              <TableHead className="w-[90px] text-center">Jedn.</TableHead>
              <TableHead className="w-[90px] text-right">Ilość</TableHead>
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