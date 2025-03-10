import { SectionLabels } from '@/app/(protected)/settings/section-labels';
import { SectionActions } from '@/app/(protected)/settings/section-actions';
import { SectionOrdersStatuses } from '@/app/(protected)/settings/section-orders-statuses';
import { SectionUsers } from '@/app/(protected)/settings/section-users';


export default async function SettingsPage() {

  return (
    <div className="flex flex-col justify-start items-center gap-7 mx-auto">
      <SectionUsers />
      <SectionOrdersStatuses />
      <SectionActions />
      <SectionLabels />
    </div>

  );
}
