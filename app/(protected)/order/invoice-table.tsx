'use client';

import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PositionRow } from '@/app/(protected)/order/position-row';


export function InvoiceTable({
                               positions,
                               totalPositions,
                               totalPriceNett,
                               totalPriceGross
                             }: {
  positions: any[],
  totalPositions: number,
  totalPriceNett: number,
  totalPriceGross: number
}) {

  return (

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[10px]">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Nazwa</TableHead>
          <TableHead className="hidden md:table-cell">Rodzaj</TableHead>
          <TableHead className="hidden md:table-cell">Jednostka</TableHead>
          <TableHead className="hidden md:table-cell">Ilość</TableHead>
          <TableHead className="hidden md:table-cell text-right">Cena netto</TableHead>
          <TableHead className="hidden md:table-cell text-right">Cena brutto</TableHead>
          <TableHead className="hidden md:table-cell text-right">Optima</TableHead>
          <TableHead>
            <span className="sr-only">Menu</span>
          </TableHead>

        </TableRow>
      </TableHeader>
      <TableBody>
        {positions.map((position) =>
          <PositionRow key={position.id} {...position} />
        )}
      </TableBody>
    </Table>

  );
}