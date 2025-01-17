import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';


const Root = React.forwardRef<
  HTMLFormElement,
  React.HTMLAttributes<HTMLFormElement>
>(({ className, ...props }, ref) => (
  <form
    ref={ref}
    className={className}
    {...props}
  />
));
Root.displayName = 'Root';

const Field = React.forwardRef<
  HTMLFieldSetElement,
  React.HTMLAttributes<HTMLFieldSetElement>
>(({ className, ...props }, ref) => (
  <fieldset
    ref={ref}
    className={cn('flex flex-col space-y-1.5 mb-6', className)}
    {...props}
  />
));
Field.displayName = 'Field';


const Row = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex justify-between', className)}
    {...props}
  />
));
Field.displayName = 'Field';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
}

const Label = React.forwardRef<
  HTMLLabelElement,
  React.HTMLAttributes<LabelProps> &
  LabelProps &
  VariantProps<typeof labelVariants>
>(({ className, htmlFor, ...props }, ref) => (
  <label
    ref={ref}
    className={cn('pl-1', className)}
    {...props}
    htmlFor={htmlFor}
  />
));
Label.displayName = 'Label';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
}

const Input = React.forwardRef<
  HTMLInputElement,
  React.HTMLAttributes<InputProps> &
  InputProps>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = 'Input';

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
}

const Select = React.forwardRef<
  HTMLSelectElement,
  React.HTMLAttributes<SelectProps> &
  SelectProps>(({ className, ...props }, ref) => (
  <select
    className={cn(
      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    ref={ref}
    {...props}
  />
));
Select.displayName = 'Select';

const messageVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

const Message = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof messageVariants>>(
  ({ className, ...props },
   ref) => (
    <span
      ref={ref}
      className={cn(
        'text-sm text-muted-foreground',
        className
      )}
      {...props}
    />
  ));
Message.displayName = 'Message';


export { Root, Row, Field, Label, Input, Message };