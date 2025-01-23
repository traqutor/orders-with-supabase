'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
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
    <Tooltip>
      <TooltipTrigger asChild>
        <li
          className="cursor-pointer flex shrink h-8 gap-4 items-start justify-start text-muted-foreground transition-colors hover:text-foreground md:h-6 mb-1"
        >
          {children}
        </li>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}