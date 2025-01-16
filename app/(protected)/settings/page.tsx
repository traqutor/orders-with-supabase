import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { LabelsForm } from '@/app/(protected)/settings/labels-form';
import { Fragment } from 'react';


export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-in');
  }


  return (
    <Fragment>
      <LabelsForm />
    </Fragment>

  );
}
