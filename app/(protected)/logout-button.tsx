'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

const LogoutButton = () => {
  const supabase = createClient();

  const router = useRouter();

  const signOutAction = async () => {
    await supabase.auth.signOut();
    return router.push('/sign-in');
  };


  return (
    <button onClick={signOutAction}> Wyloguj</button>

  );
};

export default LogoutButton;
