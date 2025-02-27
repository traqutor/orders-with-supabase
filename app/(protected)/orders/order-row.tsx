import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Package } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Tables } from '@/types_db';
import { StatusPill } from '@/components/ui/status_pill';
import React from 'react';
import Link from 'next/link';
import { getFormatedDate } from '@/utils/time';
import { ActionPill } from '@/components/ui/action_pill';
import AvatarProfile from '@/components/profile/avatar-profile';


export function OrderRow(order: any) {

  const deleteOrderRecord = (order: Tables<'orders'>) => {
    console.log('Delete orders', order);
  };

  return (
    <TableRow>
      <TableCell className="">
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
        <StatusPill
          key={order.orders_statuses.id}
          variant={order.orders_statuses.color_hex || 'default' as any}
          title={order.orders_statuses.title || ''} />
      </TableCell>
      <TableCell className="">
        {getFormatedDate(order.created_at)}
      </TableCell>
      <TableCell className="">
        <div className="flex gap-x-0.5 space-x-2">
          {order.orders_actions.map((action: Tables<'orders_actions'> & { actions: Tables<'actions'> }) => (
            <ActionPill
              key={action.actions.id}
              variant={action.performed ? 'neutral' : action.actions.color_hex || 'default' as any}
              title={action.actions.title || ''}
              iconName={action.actions.icon_name || ''}
              iconOnly={true}
            />
          ))}
        </div>
      </TableCell>
      <TableCell className="">
        <div className="flex justify-start">
          {order.pinned_orders?.map((pin: Tables<'pinned_orders'>) => (
            <span key={pin.id} className="ml-[-8px]">
              <AvatarProfile profileId={pin?.user_id} />
            </span>
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