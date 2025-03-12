import { deleteData, getData, postData, putData } from '@/utils/helpers';
import { NewProfile, Profile } from '@/lib/db/schema';


export function useProfiles() {
  const url = '/api/dashboard/profiles';

  const fetchProfile = async (profileId: string) => {
    const response = await getData<Profile>({ url: `${url}/${profileId}` });

    if (response.error) throw new Error(`Get list of Profiles Error: ${JSON.stringify(response)}`);

    return response.data as Profile;
  };

  const fetchProfiles = async () => {
    const response = await getData<Profile[]>({ url });

    if (response.error) throw new Error(`Get list of Profiles Error: ${JSON.stringify(response)}`);

    return response.data as Profile[];
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
    createProfile,
    deleteProfile,
    fetchProfiles,
    fetchProfile,
    updateProfile
  };

}
