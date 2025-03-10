'use client';
import { useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { ThemeSwitcher } from '@/components/theme-switcher';
import LogoutButton from '@/app/(protected)/logout-button';
import AvatarProfile from '@/components/profile/avatar-profile';


export  function HeaderUser() {
  const { update, data, status} = useSession();

  console.log('HeaderUser', status);
  console.log('HeaderUser', update);
  console.log('HeaderUser', data);



  return (
    <div className="flex gap-6 ">
      <ThemeSwitcher />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <AvatarProfile profileId={''} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          {data?.user ? (
            <DropdownMenuItem>
              <LogoutButton />
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem>
              <Link href="/sign-in">Sign In</Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}