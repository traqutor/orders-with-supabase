import { NewProfile, Profile, profiles } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { eq } from 'drizzle-orm/sql/expressions/conditions';


const getProfiles = async () => {
  return sBase.select()
    .from(profiles);
};

const postProfile = async (payload: NewProfile) => {
  return sBase.insert(profiles)
    .values({ ...payload });
};

const putProfile = async (payload: Profile) => {
  return sBase.update(profiles)
    .set({ ...payload })
    .where(eq(profiles.id, payload.id));
};

const deleteProfile = async (payload: Profile) => {
  return sBase.delete(profiles)
    .where(eq(profiles.id, payload.id));
};

export { getProfiles, postProfile, putProfile, deleteProfile };