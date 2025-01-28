'use client';

import React from 'react';
import { CardDescription } from '@/components/ui/card';
import { ListItem } from '@/components/ui/list-item';
import { AtSign, IdCardIcon, MailIcon, PhoneIcon } from 'lucide-react';


export function CustomerContentTab({ customer }: any) {


  const handleEdit = (position: any) => {
    console.log('Edit order', position);
  };

  const handleDelete = (position: any) => {
    console.log('Delete order', position);
  };

  return (
    <div>
      <ListItem>
        {customer.nip && <span className="flex gap-2"><IdCardIcon
          className="h-5 w-5 min-h-5 min-w-5 text-muted-foreground" /> NIP: {customer.nip}</span>}
      </ListItem>

      <ListItem>
        {customer.regon && <span className="flex gap-2">
            <IdCardIcon className="h-5 w-5 min-h-5 min-w-5 text-muted-foreground" /> Regon: {customer.regon}</span>}
      </ListItem>

      <CardDescription className=" pt-5 pb-2">
        Adres i dane kontaktowe
      </CardDescription>
      <div>
        <ul className="list-unstyled mb-7">
          <ListItem>
            <MailIcon className="h-5 w-5 min-h-5 min-w-5 text-muted-foreground" /> {customer.address}
          </ListItem>
          <ListItem>
            <PhoneIcon className="h-5 w-5 min-h-5 min-w-5 text-muted-foreground" /> {customer.phone}
          </ListItem>
          <ListItem>
            <AtSign className="h-5 w-5 min-h-5 min-w-5 text-muted-foreground" /> {customer.email}
          </ListItem>
        </ul>
      </div>

    </div>
  );
}