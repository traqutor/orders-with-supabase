'use client';

import React from 'react';
import { CardDescription } from '@/components/ui/card';
import { ListItem } from '@/components/ui/list-item';
import { MailIcon, PhoneIcon, UserCircle2 } from 'lucide-react';


export function CustomersOrdersContentTab({ customer }: any) {


  const handleEdit = (position: any) => {
    console.log('Edit order', position);
  };

  const handleDelete = (position: any) => {
    console.log('Delete order', position);
  };

  return (
    <div>
      <div>
        <CardDescription className=" pb-2">
          Zamówienia kontrahenta
        </CardDescription>

      </div>
    </div>
  );
}