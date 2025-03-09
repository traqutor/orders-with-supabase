import { useEffect, useState } from 'react';
import { deleteData, getData, postData, putData } from '@/utils/helpers';
import { Profile, NewProfile } from '@/lib/db/schema';


export function useProfiles() {
  const url = '/api/dashboard/profiles';
  const [profiles, setProfiles] = useState<Profile[]>([]);


  useEffect(() => {
    fetchProfiles().then();

  }, []);


  const fetchProfile = async (profileId: string): Promise<Profile> => {
    const response = await getData<Profile[]>({ url });

    if (response.error) throw new Error(`Get list of Profiles Error: ${JSON.stringify(response)}`);

    setProfiles(response.data);

    return response.data[0];
  };

  const fetchProfiles = async (): Promise<Profile[]> => {
    const response = await getData<Profile[]>({ url });

    if (response.error) throw new Error(`Get list of Profiles Error: ${JSON.stringify(response)}`);

    setProfiles(response.data);

    return response.data;
  };

  const createProfile = async (profile: NewProfile) => {
    const response = await postData({ url, data: profile });

    if (response.error) throw new Error(`Create Profile: ${profile} Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  const updateProfile = async (profile: Profile) => {
    const response = await putData({ url: `${url}/${profile.id}`, data: profile });

    if (response.error) throw new Error(`Update Profile: ${profile} Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  const deleteProfile = async (profile: Profile) => {
    const response = await deleteData({ url: `${url}/${profile.id}`, data: profile });

    if (response.error) throw new Error(`Delete Profile: ${profile} Error: ${JSON.stringify(response)}`);

    return response.data;
  };


  return {
    profiles,
    createProfile,
    deleteProfile,
    fetchProfiles,
    fetchProfile,
    updateProfile
  };

}
