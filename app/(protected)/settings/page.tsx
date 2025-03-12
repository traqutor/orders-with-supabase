import { SectionLabels } from '@/components/settings/section-labels';
import { SectionActions } from '@/components/settings/section-actions';
import { SectionOrdersStatuses } from '@/components/settings/section-orders-statuses';
import { SectionUsers } from '@/components/settings/section-users';
import { Suspense } from 'react';
import { getProfiles } from '@/lib/db/users_queries';
import { sBase } from '@/lib/db/db';
import { actions, labels, orders_statuses } from '@/lib/db/schema';


export default async function SettingsPage() {

  const usersItems = await getProfiles();
  const ordersStatusesItems = await sBase.select().from(orders_statuses);
  const actionsItems = await sBase.select().from(actions);
  const labelsItems = await sBase.select().from(labels);

  return (
    <div className="flex flex-col justify-start items-center gap-7 mx-auto">
      <Suspense>
        <SectionUsers profiles={usersItems} />
        <SectionOrdersStatuses ordersStatuses={ordersStatusesItems} />
        <SectionActions actions={actionsItems} />
        <SectionLabels labels={labelsItems} />
      </Suspense>
    </div>
  );
}
