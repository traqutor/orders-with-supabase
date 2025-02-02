'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import DynamicIcon from '@/components/icon/DynamicIcon';

const pillVariants = cva(
  'flex w-min justify-start items-center gap-1 text-xs font-medium me-2 px-2.5 py-0.5 whitespace-nowrap',
  {
    variants: {
      variant: {
        red: 'bg-red-100 text-red-800 border-red-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300',
        green: 'bg-green-100 text-green-800 border-green-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300',
        yellow: 'bg-yellow-100 text-yellow-800 border-yellow-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300',
        indigo: 'bg-indigo-100 text-indigo-800 border-indigo-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300',
        purple: 'bg-purple-100 text-purple-800 border-purple-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300',
        pink: 'bg-pink-100 text-pink-800 border-pink-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300',
        tomato: 'bg-tomato-100 text-tomato-800 border-tomato-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-tomato-900 dark:text-tomato-300',
        orange: 'bg-orange-100 text-orange-800 border-orange-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-orange-900 dark:text-orange-300',
        blue: 'bg-blue-100 text-blue-800 border-blue-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300',
        cyan: 'bg-cyan-100 text-cyan-800 border-cyan-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-cyan-900 dark:text-cyan-300',
        teal: 'bg-teal-100 text-teal-800 border-teal-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-teal-900 dark:text-teal-300 ',
        gray: 'bg-gray-100 text-gray-800 border-grey-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300',
        slate: 'bg-slate-100 text-slate-800 border-slate-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-slate-900 dark:text-slate-300',
        zinc: 'bg-zinc-100 text-zinc-800 border-zinc-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-zinc-900 dark:text-zinc-300',
        neutral: 'bg-neutral-100 text-neutral-800 border-neutral-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-neutral-900 dark:text-neutral-300',
        stone: 'bg-stone-100 text-stone-800 border-stone-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-stone-900 dark:text-stone-300',
        amber: 'bg-amber-100 text-amber-800 border-amber-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-amber-900 dark:text-amber-300',
        emerald: 'bg-emerald-100 text-emerald-800 border-emerald-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-emerald-900 dark:text-emerald-300',
        lime: 'bg-lime-100 text-lime-800 border-lime-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-lime-900 dark:text-lime-300',
        violet: 'bg-violet-100 text-violet-800 border-violet-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-violet-900 dark:text-violet-300',
        fuchsia: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-fuchsia-900 dark:text-fuchsia-300',
        rose: 'bg-rose-100 text-rose-800 border-rose-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-rose-900 dark:text-rose-300'
      },
      size: {
        default: 'h-6 px-4 py-1',
        sm: 'h-7 rounded-md px-4 py-1 border-2',
        lg: 'h-11 rounded-md px-8 py-2',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'gray',
      size: 'default'
    }
  }
);

export interface PillProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pillVariants> {
  loading?: boolean;
  iconName?: string;
  iconOnly?: boolean;
}


const Pill = React.forwardRef<HTMLDivElement, PillProps>(
  ({ title, className, variant, size, loading, iconName, iconOnly, ...props }, ref) => {

    return (
      <div
        className={cn(pillVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {iconName && <DynamicIcon iconName={iconName} />}
        {!iconOnly && <span className="">{title}</span>}
      </div>
    );
  }
);

Pill.displayName = 'Pill';

export { Pill, pillVariants };
