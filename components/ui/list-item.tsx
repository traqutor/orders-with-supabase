import * as React from 'react';
import { cn } from '@/lib/utils';


const ListItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn('cursor-pointer mb-1 flex gap-2 shrink items-center justify-start transition-colors hover:text-foreground', className)}
    {...props}
  />
));
ListItem.displayName = 'ListItem';

export { ListItem };