import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PRODUCTS_PER_PAGE = 11;

export const COLOR_OPTIONS = [
  'green',
  'yellow',
  'indigo',
  'purple',
  'pink',
  'tomato',
  'orange',
  'blue',
  'cyan',
  'teal',
  'gray',
  'slate',
  'zinc',
  'neutral',
  'stone',
  'amber',
  'emerald',
  'lime',
  'violet',
  'fuchsia',
  'rose',
  'red'
];


const ICON_NAMES = [''];