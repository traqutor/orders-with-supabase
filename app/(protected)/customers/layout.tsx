import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { File } from 'lucide-react';
import CustomerCreateDialog from '@/app/(protected)/customers/customer-create-dialog';

const title = 'Zamówienia';

export const metadata = {
  title
};


export default async function Layout({
                                       children
                                     }: {
  children: React.ReactNode;
}) {


  return (
    <Tabs defaultValue="tab">
      <div className="flex items-center mt-2">
        <TabsList>

          <Link href="/orders">
            <TabsTrigger value="tab">Wszyscy klienci</TabsTrigger>
          </Link>

        </TabsList>
        <div className="ml-auto flex items-center gap-2 pr-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
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