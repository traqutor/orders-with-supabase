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
import { createClient } from '@/utils/supabase/server';
import { ThemeSwitcher } from '@/components/theme-switcher';
import LogoutButton from '@/app/(protected)/logout-button';
import AvatarProfile from '@/components/profile/avatar-profile';


export async function HeaderUser() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();


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
            <AvatarProfile profileId={user?.id} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          {user ? (
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