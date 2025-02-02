'use client';

import React, { useState } from 'react';
import { SaveIcon } from 'lucide-react';
import { decode } from 'base64-arraybuffer'

import * as Form from '@radix-ui/react-form';
import { Section } from '@/app/(protected)/settings/section';
import { Button } from '@/components/ui/button';
import { Tables } from '@/types_db';
import { useProfiles } from '@/lib/db/useProfiles';
import AvatarProfile from '@/components/profile/avatar-profile';
import { createClient } from '@/utils/supabase/client';

type Profile = Tables<'profiles'>

const EMPTY_PROFILE: Profile = {
  id: '',
  avatar_url: '',
  full_name: '',
  is_disabled: false,
  email: ''
};

export function SectionUsers() {
  const supabase = createClient();
  const { profiles, fetchProfiles, updateProfile } = useProfiles();
  const [formData, setFormData] = useState<Profile>({ ...EMPTY_PROFILE });
  const [files, setFiles] = useState<File[]>([]);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const key = name as keyof Profile;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value
    }));
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement | HTMLInputElement | HTMLSelectElement>) => {
    event.preventDefault();

    if (formData)

      await updateProfile({ ...formData });

    await fetchProfiles();

    setFormData({ ...EMPTY_PROFILE });
  };

  const handleClick = (action: Profile) => {
    setFormData(action);
  };


  const handleCancel = () => {
    setFormData({ ...EMPTY_PROFILE });
  };

  const listBuckets = async () => {
    const { data, error } = await supabase
      .storage
      .listBuckets()

    console.log('listBuckets');
    console.error(error);
    console.log(data);
    console.log('-----------------------');
  }

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {

    listBuckets().then();

    const { files } = event.target;

    if (!files || !files.length) return false;




    const { data, error } = await supabase
      .storage
      .from('avatars')
      .upload('public/avatar1.png', decode('base64FileData'), {
        contentType: 'image/png'
      })



    if (error) {
      throw new Error(`Upload file error: ${error}`);
    }

    console.log('Upload file data:', data);

  };


  return (
    <Section title="Użytkownicy"
             description="Profile osób">

      <div className="flex-col p-2 items-center">
        <div className="flex flex-col gap-2 mb-5">
          {profiles.map(p =>
            <div
              onClick={() => handleClick(p)}
              key={p.id}
              className="flex gap-3 items-center justify-start hover:bg-muted cursor-pointer px-2 rounded"
            >
              <AvatarProfile profileId={p.id} />

              <div className="text-muted-foreground">
                <p>{p.full_name}</p>
                <span className="text-sm">{p.email}</span>
              </div>
            </div>)}
        </div>


      </div>
      {formData.id !== '' &&
        <Form.Root
          onSubmit={(event) => handleSubmit(event)}
        >

          <div className="flex w-full justify-start items-end gap-5">


            <Form.Field name="email">
              <Form.Label htmlFor="email"
                          className="flex text-sm text-muted-foreground items-baseline justify-between py-1">Email</Form.Label>
              <Form.Control asChild>
                <input
                  id="email"
                  type="text"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  placeholder="Email"
                  className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </Form.Control>
            </Form.Field>

            <Form.Field name="full_name">
              <Form.Label htmlFor="full_name"
                          className="flex text-sm text-muted-foreground items-baseline justify-between py-1">Imie i
                Nazwisko</Form.Label>
              <Form.Control asChild>
                <input
                  id="full_name"
                  type="text"
                  name="full_name"
                  value={formData.full_name || ''}
                  onChange={handleChange}
                  placeholder="Imie i Nazwisko"
                  className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </Form.Control>
            </Form.Field>

            <Form.Field name="avatar_url">
              <Form.Label htmlFor="avatar_url"
                          className="flex text-sm text-muted-foreground items-baseline justify-between py-1">Avatar
                URL</Form.Label>
              <Form.Control asChild>
                <input
                  id="avatar_url"
                  type="text"
                  name="avatar_url"
                  value={formData.avatar_url || ''}
                  onChange={handleChange}
                  placeholder="Url"
                  className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </Form.Control>
            </Form.Field>


            <Form.Field name="avatar_url">
              <Form.Label htmlFor="avatar_url"
                          className="flex text-sm text-muted-foreground items-baseline justify-between py-1">Avatar
                URL</Form.Label>
              <Form.Control asChild>
                <input
                  id="avatar_url"
                  type="file"
                  name="avatar_url"
                  onChange={handleUpload}
                  placeholder="Url"
                  className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </Form.Control>
            </Form.Field>

          </div>

          <div className="mt-[25px] flex justify-between gap-2">


            <div className="flex gap-2">
              <Button onClick={handleCancel} size="sm" variant="outline" className="h-8 gap-1" type="submit">

                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Cancel</span>
              </Button>


              <Button size="sm" className="h-8 gap-1" type="submit" variant="secondary">
                <SaveIcon className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Save</span>
              </Button>
            </div>
          </div>


        </Form.Root>
      }

    </Section>
  );

}


