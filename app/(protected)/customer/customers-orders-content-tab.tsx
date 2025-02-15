'use client';

import React from 'react';
import { CardDescription } from '@/components/ui/card';
import { Customer } from '@/lib/db/useCustomers';


export function CustomersOrdersContentTab({ customer }: { customer: Customer }) {

  return (
    <div>
      <div>
        <CardDescription className=" pb-2">
          Zamówienia kontrahenta: {customer.name}
        </CardDescription>

      </div>
    </div>
  );
}