'use client';

import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { PositionRow } from '@/app/(protected)/order/position-row';
import { Button } from '@/components/ui/button';
import { LucidePlus } from 'lucide-react';


export function PositionsTable({
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
    <Card>
      <CardHeader>
        <CardDescription className="flex justify-between ">
          <span>Pozycje do zamówienia</span>
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <LucidePlus />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Dodaj pozycję
            </span>
          </Button>

        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[10px]">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead >Nazwa</TableHead>
              <TableHead className="hidden md:table-cell">Rodzaj</TableHead>
              <TableHead className="hidden md:table-cell">Jednostka</TableHead>
              <TableHead className="hidden md:table-cell">Ilość</TableHead>
              <TableHead className="hidden md:table-cell text-right">Cena netto</TableHead>
              <TableHead className="hidden md:table-cell text-right">Cena brutto</TableHead>
              <TableHead>
                <span className="sr-only">Menu</span>
              </TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            {positions.map((position) =>
              <PositionRow key={position.id} {...position } />
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}<strong> {totalPositions}, {totalPriceNett},
            {totalPriceGross}
          </strong>{' '}
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}