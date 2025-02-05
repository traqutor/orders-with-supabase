import React from 'react';
import {
  AtSignIcon,
  BanIcon,
  BeerIcon,
  BellIcon,
  BellRingIcon,
  FileIcon,
  IdCardIcon,
  MailIcon,
  Package,
  PackageIcon,
  PenIcon,
  PhoneIcon,
  PizzaIcon,
  WrenchIcon,
} from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';


const dynamicIconsVariants = cva(
  '',
  {
    variants: {
      variant: {
        red: 'text-red-800       dark:text-red-300',
        green: 'text-green-800     dark:text-green-300',
        yellow: 'text-yellow-800    dark:text-yellow-300',
        indigo: 'text-indigo-800    dark:text-indigo-300',
        purple: 'text-purple-800    dark:text-purple-300',
        pink: 'text-pink-800      dark:text-pink-300',
        tomato: 'text-tomato-800    dark:text-tomato-300',
        orange: 'text-orange-800    dark:text-orange-300',
        blue: 'text-blue-800      dark:text-blue-300',
        cyan: 'text-cyan-800      dark:text-cyan-300',
        teal: 'text-teal-800      dark:text-teal-300 ',
        gray: 'text-gray-800      dark:text-gray-300',
        slate: 'text-slate-800     dark:text-slate-300',
        zinc: 'text-zinc-800      dark:text-zinc-300',
        neutral: 'text-neutral-800   dark:text-neutral-300',
        stone: 'text-stone-800     dark:text-stone-300',
        amber: 'text-amber-800     dark:text-amber-300',
        emerald: 'text-emerald-800   dark:text-emerald-300',
        lime: 'text-lime-800      dark:text-lime-300',
        violet: 'text-violet-800    dark:text-violet-300',
        fuchsia: 'text-fuchsia-800   dark:text-fuchsia-300',
        rose: 'text-rose-800      dark:text-rose-300'
      },
      colors: {
        color: {
          red: 'text-red-800       dark:text-red-300',
          green: 'text-green-800     dark:text-green-300',
          yellow: 'text-yellow-800    dark:text-yellow-300',
          indigo: 'text-indigo-800    dark:text-indigo-300',
          purple: 'text-purple-800    dark:text-purple-300',
          pink: 'text-pink-800      dark:text-pink-300',
          tomato: 'text-tomato-800    dark:text-tomato-300',
          orange: 'text-orange-800    dark:text-orange-300',
          blue: 'text-blue-800      dark:text-blue-300',
          cyan: 'text-cyan-800      dark:text-cyan-300',
          teal: 'text-teal-800      dark:text-teal-300 ',
          gray: 'text-gray-800      dark:text-gray-300',
          slate: 'text-slate-800     dark:text-slate-300',
          zinc: 'text-zinc-800      dark:text-zinc-300',
          neutral: 'text-neutral-800   dark:text-neutral-300',
          stone: 'text-stone-800     dark:text-stone-300',
          amber: 'text-amber-800     dark:text-amber-300',
          emerald: 'text-emerald-800   dark:text-emerald-300',
          lime: 'text-lime-800      dark:text-lime-300',
          violet: 'text-violet-800    dark:text-violet-300',
          fuchsia: 'text-fuchsia-800   dark:text-fuchsia-300',
          rose: 'text-rose-800      dark:text-rose-300'
        }
      }
    }
  }
);


export interface DynamicIconProps
  extends React.HTMLAttributes<SVGElement>,
    VariantProps<typeof dynamicIconsVariants> {
  iconName: string;
}

export const Icons: Record<string, React.ElementType> = {
  MailIcon,
  PizzaIcon,
  PenIcon,
  FileIcon,
  PhoneIcon,
  PackageIcon,
  IdCardIcon,
  AtSignIcon,
  BellRingIcon,
  BellIcon,
  BeerIcon,
  BanIcon,
  Package,
  WrenchIcon,
};


const DynamicIcon = React.forwardRef<HTMLDivElement, DynamicIconProps>(
  ({ className, iconName, variant, ...props }, ref) => {

    const IconComponent = Icons[iconName] as React.ElementType;

    if (!IconComponent) {
      return <BanIcon className={cn(dynamicIconsVariants({ className }))} />;
    }

    return <IconComponent className={cn(dynamicIconsVariants({ className }))} />;
  });


DynamicIcon.displayName = 'DynamicIcon';

export { DynamicIcon, dynamicIconsVariants };