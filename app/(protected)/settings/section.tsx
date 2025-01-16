'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function SettingsSection({
                                  title, description,
                                  children
                                }: Readonly<{
  title: string;
  description: string;
  children: React.ReactNode;
}>) {

  return (

    <Card>
      <div className="md:grid md:grid-cols-4 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0 sticky top-0">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>
                {description}
              </CardDescription>
            </CardHeader>
          </div>
        </div>
        <CardContent>

          {children}

        </CardContent>
      </div>

    </Card>

  );
}