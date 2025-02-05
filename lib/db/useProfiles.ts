import { useEffect, useState } from 'react';
import { Tables } from '@/types_db';
import { getProfiles, putProfil } from '@/lib/db/users_queries';

export type Profile = Tables<'profiles'>;

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

  const updateProfile = async (payload: Profile) => {
    const { error } = await putProfil(payload);

    if (error) throw new Error(`Get list of Labels error: ${JSON.stringify(error)}`);
    const pfs = profiles.filter(profile => profile.id !== payload.id);

    setProfiles([...pfs, payload]);
  };


  return {
    profiles,
    fetchProfiles,
    getProfileById,
    updateProfile
  };

}
