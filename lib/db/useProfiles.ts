import { useEffect, useState } from 'react';
import { Tables } from '@/types_db';
import { getProfiles, postProfile, putProfile } from '@/lib/db/users_queries';

export type Profile = Tables<'profiles'>;

export type UserProfile = {
  create: boolean;
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  phone: string
}

export function useProfiles() {

  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    if (profiles.length <= 0) {
      fetchProfiles().then();
    }

  }, []);

  const fetchProfiles = async () => {
    const { data, error } = await getProfiles();

    if (error) throw new Error(`Get list of Labels error: ${JSON.stringify(error)}`);

    setProfiles(data);

    return data;
  };

  const getProfileById = async (id: string) => {
    let ps = [...profiles];
    if (ps.length <= 0) {
      ps = await fetchProfiles();
    }

    const profile = ps.find((profile) => profile.id === id);

    return profile || null;
  };


  const addProfile = async (profile: UserProfile) => {
    const { error } = await postProfile(profile);

    if (error) throw new Error(`Post Profile for user email ${profile.email} error: ${JSON.stringify(error)}`);


    await fetchProfiles();
  };

  const updateProfile = async (payload: Profile) => {
    const { error } = await putProfile(payload);

    if (error) throw new Error(`Put Profile error: ${JSON.stringify(error)}`);
    const pfs = profiles.filter(profile => profile.id !== payload.id);

    setProfiles([...pfs, payload]);
  };


  return {
    profiles,
    addProfile,
    fetchProfiles,
    getProfileById,
    updateProfile
  };

}
