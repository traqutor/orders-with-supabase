import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function CustomersPage() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-in');
  }


  return (
    <div className="flex-1 w-full flex flex-col gap-12">

      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Klienci</h2>

      </div>

    </div>
  );
}
