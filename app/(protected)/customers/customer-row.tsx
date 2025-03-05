import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PackagePlusIcon, User } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import React from 'react';
import Link from 'next/link';
import { CustomerItem } from '@/app/api/customers/route';
import { Customer } from '@/lib/db/schema';


export const CustomerRow: React.FC<{
  customer: CustomerItem,
  onToggleEditDialog: (customer: Customer) => void
}> = ({ customer, onToggleEditDialog }) => {

  const handleDelete = () => {
    console.log('Delete customer', customer);
  };

  const handleEdit = () => {
    console.log('Edit customer', customer);
  };

  return (
    <TableRow>
      <TableCell className="">
        <div className="flex justify-start items-center gap-4">
          <Link href={`/customer/${customer.customers.id}`}>
            <User onClick={handleEdit} className="text-green-600 hover:text-green-900" />
          </Link>
          <PackagePlusIcon
            onClick={() => onToggleEditDialog(customer.customers)}
            className="cursor-pointer text-green-600 hover:text-green-900" />
        </div>
      </TableCell>
      <TableCell className="font-medium">
        <Link href={`/customer/${customer.customers.id}`} className="font-bold hover:text-green-900">
          <span>{customer.customers.name}</span>
        </Link>
      </TableCell>
      <TableCell className="w-[100px]">{customer.customers_types.type_name}</TableCell>
      <TableCell className="w-[100px]">
        {customer.customers.address} {customer.customers.email} {customer.customers.phone}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {customer.customers.nip}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {customer.customers.regon}
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
};