import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import CustomerCreateDialog from '@/app/(protected)/customers/customer-create-dialog';

const title = 'Zamówienia';

export const metadata = {
  title
};


export default async function Layout(
  { children }: { children: React.ReactNode; }) {

  return (
    <Tabs defaultValue="tab" className="w-[1240px] mx-auto">
      <div className="flex items-center mt-2">
        <TabsList>

          <Link href="/orders">
            <TabsTrigger value="tab">Wszyscy klienci</TabsTrigger>
          </Link>

        </TabsList>
        <div className="ml-7 flex items-center gap-2 pr-2">

          <CustomerCreateDialog />

        </div>
      </div>
      <div
        className="mt-2 ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        {children}
      </div>
    </Tabs>
  );
}