'use client';

import React, { useState } from 'react';
import { Plus, SaveIcon } from 'lucide-react';

import * as Form from '@radix-ui/react-form';
import { Section } from '@/app/(protected)/settings/section';
import { Button } from '@/components/ui/button';
import { Tables } from '@/types_db';
import { useProfiles, UserProfile } from '@/lib/db/useProfiles';
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

const EMPTY_USER: UserProfile = {
  create: false,
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  phone: ''
};

export function SectionUsers() {
  const supabase = createClient();
  const { profiles, addProfile, fetchProfiles, updateProfile } = useProfiles();
  const [userData, setUserData] = useState<UserProfile>({ ...EMPTY_USER });
  const [formData, setFormData] = useState<Profile>({ ...EMPTY_PROFILE });

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

  const handleUserChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const key = name as keyof UserProfile;

    setUserData((prevUserData) => ({
      ...prevUserData,
      [key]: value
    }));
  };

  const handleAddNewProfile = async () => {
    setFormData({ ...EMPTY_PROFILE });
    setUserData({ ...EMPTY_USER, create: true });
  };

  const handleUserSubmit = async (event: React.FormEvent<HTMLFormElement | HTMLInputElement | HTMLSelectElement>) => {
    event.preventDefault();

    if (userData) {
      await addProfile({ ...userData });
      handleCancel();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement | HTMLInputElement | HTMLSelectElement>) => {
    event.preventDefault();

    if (formData) {
      await updateProfile({ ...formData });
      await fetchProfiles();
      handleCancel();
    }


  };

  const handleClick = (action: Profile) => {
    setFormData(action);
    setUserData({ ...EMPTY_USER });
  };


  const handleCancel = () => {
    setFormData({ ...EMPTY_PROFILE });
    setUserData({ ...EMPTY_USER });
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>, user: Tables<'profiles'>) => {

    const { files } = event.target;

    if (!files || !files.length) return false;

    const { data, error } = await supabase
      .storage
      .from('avatars')

      .upload(`images/avatar-${user.id}.png`, files[0]);

    if (error) {
      throw new Error(`Upload file error: ${JSON.stringify(error)}`);
    }

    await updateProfile({ ...user, avatar_url: data?.path });
    await fetchProfiles();
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

        <div className="flex-1 flex justify-end pt-4">
          <Button onClick={handleAddNewProfile} variant="outline" size="sm">
            <Plus />
          </Button>
        </div>

      </div>
      {formData.id !== '' &&
        <Form.Root
          onSubmit={(event) => handleSubmit(event)}
        >
          <p className="h-3 mb-7">Edytujesz dane użytkownika</p>

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
                  onChange={(e) => handleUpload(e, formData)}
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

      {userData.create &&
        <Form.Root
          onSubmit={(event) => handleUserSubmit(event)}
          className="flex flex-col gap-2 justify-center items-center"
        >

          <p className="h-3 my-7">Rejestrujesz nowego użytkownika</p>


          <Form.Field name="email">
            <Form.Label htmlFor="email"
                        className="flex text-sm text-muted-foreground items-baseline justify-between py-1">Email</Form.Label>
            <Form.Control asChild>
              <input
                id="email"
                type="text"
                name="email"
                value={userData.email}
                onChange={handleUserChange}
                placeholder="Email"
                className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </Form.Control>
          </Form.Field>

          <Form.Field name="password">
            <Form.Label htmlFor="password"
                        className="flex text-sm text-muted-foreground items-baseline justify-between py-1">Hasło</Form.Label>
            <Form.Control asChild>
              <input
                id="password"
                type="password"
                name="password"
                value={userData.password}
                onChange={handleUserChange}
                placeholder="Hasło"
                className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </Form.Control>
          </Form.Field>


          <Form.Field name="first_name">
            <Form.Label htmlFor="first_name"
                        className="flex text-sm text-muted-foreground items-baseline justify-between py-1">Imie</Form.Label>
            <Form.Control asChild>
              <input
                id="first_name"
                type="text"
                name="first_name"
                value={userData.first_name}
                onChange={handleUserChange}
                placeholder="Imie"
                className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </Form.Control>
          </Form.Field>

          <Form.Field name="last_name">
            <Form.Label htmlFor="last_name"
                        className="flex text-sm text-muted-foreground items-baseline justify-between py-1">Nazwisko</Form.Label>
            <Form.Control asChild>
              <input
                id="last_name"
                type="text"
                name="last_name"
                value={userData.last_name}
                onChange={handleUserChange}
                placeholder="Nazwisko"
                className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </Form.Control>
          </Form.Field>

          <Form.Field name="phone">
            <Form.Label htmlFor="phone"
                        className="flex text-sm text-muted-foreground items-baseline justify-between py-1">Telefon</Form.Label>
            <Form.Control asChild>
              <input
                id="phone"
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleUserChange}
                placeholder="Telefon"
                className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </Form.Control>
          </Form.Field>


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


