import { DateTime } from 'luxon';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Tables } from '@/types_db';
import Package from '@/components/package';
import { Pill } from '@/components/ui/pill';
import React from 'react';
import Link from 'next/link';


export function OrderRow(order: any) {

  const deleteOrderRecord = (order: Tables<'orders'>) => {
    console.log('Delete order', order);
  };

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Link href={`/order/${order.id}`}>
          <Package className="text-green-600 hover:text-green-900" />
        </Link>
      </TableCell>
      <TableCell className="font-medium max-w-sm truncate">
        <Link href={`/order/${order.id}`}>
          {order.title}
        </Link>
      </TableCell>
      <TableCell className="font-medium">{order.customers.name}</TableCell>
      <TableCell>
        <Pill
          key={order.orders_statuses.id}
          variant={order.orders_statuses.color_hex || 'default' as any}
          title={order.orders_statuses.title || ''} />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {DateTime.fromISO(order.created_at).toFormat('dd-mm-yyyy')}
      </TableCell>
      <TableCell className="w-[100px]">
        <div className="flex flex-wrap gap-2 space-x-2">
          {order.orders_actions.map((action: { actions: Tables<'actions'> }) => (
            <Pill
              key={action.actions.id}
              variant={action.actions.color_hex || 'default' as any}
              title={action.actions.title || ''} />
          ))}
        </div>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/order/${order.id}`}>
              <DropdownMenuItem>Otwórz</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <form action={() => deleteOrderRecord(order)}>
                <button type="submit">Usuń</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}