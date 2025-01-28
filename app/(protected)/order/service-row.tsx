import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Delete, Edit, Images } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import React from 'react';


export function ServiceRow(position: any) {

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
        VIN NUMBER
      </TableCell>

      <TableCell>
        NR REJESTRACYJNY
      </TableCell>

      <TableCell className="hidden md:table-cell">
        NR SERYJNY
      </TableCell>

      <TableCell className="hidden md:table-cell">
        SERWISANT
      </TableCell>

      <TableCell className="hidden md:table-cell">
       OCZEKUJE
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Images className="cursor-pointer hover:text-amber-600" />
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