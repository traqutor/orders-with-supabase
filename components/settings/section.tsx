'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Suspense } from 'react';

export function Section({
                                  title, description,
                                  children
                                }: Readonly<{
  title: string;
  description: string;
  children: React.ReactNode;
}>) {

  return (
    <Suspense>
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
    </Suspense>
  );
}