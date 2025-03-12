'use client';

import * as React from 'react';
import { useEffect } from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import * as Tooltip from '@radix-ui/react-tooltip';
import { User } from 'lucide-react';
import { useProfiles } from '@/lib/client/useProfiles';
import { Profile } from '@/lib/db/schema';

const AvatarProfile = (props: { profileId: string }) => {

  const { profileId } = props;
  const [user, setUser] = React.useState<Profile>();
  const [fullName, setFullName] = React.useState<string>('');
  const [abr, setAbr] = React.useState<string>('');
  const { fetchProfile } = useProfiles();


  useEffect(() => {
    if (!profileId) return;

    fetchProfile(profileId).then((profile: Profile) => {
      setUser(profile);
      setFullName(`${profile.first_name} ${profile.last_name}`);
      setAbr(`${((profile.first_name || '')?.charAt(0) + (profile.last_name || '')?.charAt(0))}`);
    });
  }, [profileId]);

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          {user ?
            <Avatar.Root
              className="inline-flex size-[24px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
              {user.avatar_url ?
                <Avatar.Image
                  className="size-full rounded-[inherit] object-cover"
                  src={`https://grokxcrznknfvpnzpmuk.supabase.co/storage/v1/object/public/avatars/${user.avatar_url}`}
                  alt={abr}
                /> : <Avatar.Fallback
                  className="leading-1 flex size-full items-center justify-center text-[10px] font-medium bg-gray-300 text-violet-800 dark:bg-violet-800 dark:text-gray-300">
                  {abr}
                </Avatar.Fallback>}
            </Avatar.Root>
            :
            <Avatar.Root
              className="inline-flex size-[24px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
              <Avatar.Fallback
                className="leading-1 flex size-full items-center justify-center  text-[15px] font-medium bg-gray-300 text-gray-900 dark:bg-gray-900 dark:text-gray-300">
                <User />
              </Avatar.Fallback>
            </Avatar.Root>
          }

        </Tooltip.Trigger>

        <Tooltip.Content side="top" className="bg-card border px-2 py-1 rounded-md text-xs">
          {fullName}
          <Tooltip.Arrow />
        </Tooltip.Content>

      </Tooltip.Root>

    </Tooltip.Provider>
  );
};

export default AvatarProfile;
