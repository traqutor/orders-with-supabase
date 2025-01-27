import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Delete, Edit } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import React from 'react';


export function PositionRow(position: any) {

  const handleEdit = (position: any) => {
    console.log('Edit order', position);
  };
  const handleDelete = (position: any) => {
    console.log('Delete order', position);
  };

  return (
    <TableRow>
      <TableCell className="font-medium">
        1
      </TableCell>

      <TableCell className="font-medium">
        {position.description}
      </TableCell>

      <TableCell>
        {position.position_type}
      </TableCell>

      <TableCell className="hidden md:table-cell">
        {position.unit}
      </TableCell>

      <TableCell className="hidden md:table-cell">
        {position.quantity}
      </TableCell>

      <TableCell className="hidden md:table-cell text-right">
        {position.price_nett}
      </TableCell>
      <TableCell className="hidden md:table-cell text-right">
        {position.price_gross || '-'}
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
            <DropdownMenuItem onClick={() => handleEdit(position)}>
               <Edit /><span className="pl-2" >Edytuj</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(position)}>
              <Delete /> <span className="pl-2" >Usuń</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}