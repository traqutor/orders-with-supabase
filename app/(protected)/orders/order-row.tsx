import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Tables } from '@/types_db';


export function OrderRow(order: Tables<'orders'>) {

  const deleteOrderRecord = (order: Tables<'orders'>) => {
    console.log('Delete order', order);
  };

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src="/image.png"
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{order.subject}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {order.status_id}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{`$${order.nip}`}</TableCell>
      <TableCell className="hidden md:table-cell">{order.email}</TableCell>
      <TableCell className="hidden md:table-cell">
        Available At
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
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <form action={() => deleteOrderRecord(order)}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}