import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SectionLabels } from '@/app/(protected)/settings/section-labels';
import { Fragment } from 'react';
import { SectionActions } from '@/app/(protected)/settings/section-actions';
import { SectionOrdersStatuses } from '@/app/(protected)/settings/section-orders-statuses';
import { SectionUsers } from '@/app/(protected)/settings/section-users';


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
      <SectionUsers />
      <SectionOrdersStatuses />
      <SectionActions />
      <SectionLabels />
    </Fragment>

  );
}
