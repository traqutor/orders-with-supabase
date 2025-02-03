import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Package, User } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import React from 'react';
import Link from 'next/link';
import OrderDialog from '@/app/(protected)/order/order-dialog';


export function CustomerRow(customer: any) {

  const handleDelete = () => {
    console.log('Delete customer', customer);
  };

  const handleEdit = () => {
    console.log('Edit customer', customer);
  };

  return (
    <TableRow>
      <TableCell className="">
        <div className="flex justify-start items-center gap-2">
        <Link href={`/customer/${customer.id}`}>
          <User onClick={handleEdit} className="text-green-600 hover:text-green-900" />
        </Link>

        <OrderDialog selectedCustomer={customer} triggerButton={<Package className="text-green-600 hover:text-green-900" />} />
        </div>
      </TableCell>
      <TableCell className="font-medium">
        <Link href={`/customer/${customer.id}`} className="font-bold hover:text-green-900">
          <span>{customer.name}</span>
        </Link>
      </TableCell>
      <TableCell className="w-[100px]">{customer.customers_types.type_name}</TableCell>
      <TableCell className="w-[100px]">
        {customer.contact} {customer.email} {customer.phone}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {customer.nip}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {customer.regon}
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
            <DropdownMenuItem onClick={handleEdit}>Otwórz</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>Usuń</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}