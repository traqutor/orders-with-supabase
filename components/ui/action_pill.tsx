'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { DynamicIcon } from '@/components/icon/dynamic-icon';

const actionVariants = cva(
  'flex w-min justify-start items-center gap-1 rounded-md border-2 px-2.5 whitespace-nowrap',
  {
    variants: {
      variant: {
        red: 'bg-red-200 text-red-800 border-red-600                   dark:bg-red-900 dark:text-red-300',
        green: 'bg-green-200 text-green-800 border-green-600             dark:bg-green-900 dark:text-green-300',
        yellow: 'bg-yellow-200 text-yellow-800 border-yellow-600          dark:bg-yellow-900 dark:text-yellow-300',
        indigo: 'bg-indigo-200 text-indigo-800 border-indigo-600          dark:bg-indigo-900 dark:text-indigo-300',
        purple: 'bg-purple-200 text-purple-800 border-purple-600          dark:bg-purple-900 dark:text-purple-300',
        pink: 'bg-pink-200 text-pink-800 border-pink-600                dark:bg-pink-900 dark:text-pink-300',
        tomato: 'bg-tomato-200 text-tomato-800 border-tomato-600          dark:bg-tomato-900 dark:text-tomato-300',
        orange: 'bg-orange-200 text-orange-800 border-orange-600          dark:bg-orange-900 dark:text-orange-300',
        blue: 'bg-blue-200 text-blue-800 border-blue-600                dark:bg-blue-900 dark:text-blue-300',
        cyan: 'bg-cyan-200 text-cyan-800 border-cyan-600                dark:bg-cyan-900 dark:text-cyan-300',
        teal: 'bg-teal-200 text-teal-800 border-teal-600                dark:bg-teal-900 dark:text-teal-300 ',
        gray: 'bg-gray-200 text-gray-800 border-grey-600                dark:bg-gray-900 dark:text-gray-300',
        slate: 'bg-slate-200 text-slate-800 border-slate-600             dark:bg-slate-900 dark:text-slate-300',
        zinc: 'bg-zinc-200 text-zinc-800 border-zinc-600                dark:bg-zinc-900 dark:text-zinc-300',
        neutral: 'bg-neutral-200 text-neutral-800 border-neutral-600       dark:bg-neutral-900 dark:text-neutral-300',
        stone: 'bg-stone-200 text-stone-800 border-stone-600             dark:bg-stone-900 dark:text-stone-300',
        amber: 'bg-amber-200 text-amber-800 border-amber-600             dark:bg-amber-900 dark:text-amber-300',
        emerald: 'bg-emerald-200 text-emerald-800 border-emerald-600       dark:bg-emerald-900 dark:text-emerald-300',
        lime: 'bg-lime-200 text-lime-800 border-lime-600                dark:bg-lime-900 dark:text-lime-300',
        violet: 'bg-violet-200 text-violet-800 border-violet-600          dark:bg-violet-900 dark:text-violet-300',
        fuchsia: 'bg-fuchsia-200 text-fuchsia-800 border-fuchsia-600       dark:bg-fuchsia-900 dark:text-fuchsia-300',
        rose: 'bg-rose-200 text-rose-800 border-rose-600                dark:bg-rose-900 dark:text-rose-300'
      },
      size: {
        default: 'h-8 text-sm font-medium',
        sm: 'text-xs font-medium',
        lg: 'h-11 px-4 text-md font-medium'
      }
    },
    defaultVariants: {
      variant: 'gray',
      size: 'default'
    }
  }
);

export interface ActionPillProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof actionVariants> {
  loading?: boolean;
  iconName?: string;
  iconOnly?: boolean;
}


const ActionPill = React.forwardRef<HTMLDivElement, ActionPillProps>(
  ({ title, className, variant, size, loading, iconName, iconOnly, ...props }, ref) => {


    return (

      <div
        className={cn(actionVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {iconName &&
          <DynamicIcon
            iconName={iconName}
            className={cn('w-[18px] h-[18px]',
              size === 'lg' && 'w-[24px] h-[24px]',
              size === 'sm' && 'w-[16px] h-[16px]'
            )} />}
        {!iconOnly && <span className="">{title}</span>}
      </div>
    );
  }
);

ActionPill.displayName = 'ActionPill';

export { ActionPill, actionVariants };
