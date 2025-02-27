import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function AnalyticsPage() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-in');
  }

  const data = await supabase.from('customers').select();

  return (
    <div className="flex-1 w-full flex flex-col gap-12">

      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Analytics</h2>
        <pre className="text-xs font-mono p-6 rounded border max-h-32 overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>

      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Analytics</h2>
        <pre className="text-xs font-mono p-6 rounded border max-h-32 overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>

    </div>
  );
}
