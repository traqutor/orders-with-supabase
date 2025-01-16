import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import LoadingDots from '@/components/ui/LoadingDots';


const pillVariants = cva(
  'text-xs font-medium me-2 px-2.5 py-0.5 whitespace-nowrap',
  {
    variants: {
      variant: {
        default: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full',
        dark: 'bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300',
        red: 'bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300',
        green: 'bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300',
        yellow: 'bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300',
        indigo: 'bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300',
        purple: 'bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300',
        pink: 'bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300',


        ghost:
          'hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 rounded-full dark:hover:text-zinc-50',
        link:
          'bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 inline-flex items-center justify-center',
        loading: 'bg-zinc-700 text-zinc-500 border-zinc-600 cursor-not-allowed rounded-full',
      },
      size: {
        default: 'h-10 px-4 py-1',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8 py-2',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface PillProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pillVariants> {
  loading?: boolean;
}

const Pill = React.forwardRef<HTMLDivElement, PillProps>(
  ({ title, className, variant, size, loading, ...props }, ref) => {

    return (
      <span
        className={cn(pillVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        {...(loading && (
          <i className="flex pl-2 m-0">
            <LoadingDots />
          </i>
        ))}
      >{title}</span>
    );
  }
);
Pill.displayName = 'Pill';

export { Pill, pillVariants };
