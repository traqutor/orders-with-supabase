'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export function ListItem({
                           label,
                           children
                         }: {
  label: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <li
      className="cursor-pointer flex shrink h-8 gap-4 items-start justify-start text-muted-foreground transition-colors hover:text-foreground md:h-6 mb-1"
    >
      {children}
    </li>

  );
}