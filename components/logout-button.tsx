'use client';

import React from 'react';
import { signOut } from 'next-auth/react';

const LogoutButton = () => {

  const signOutAction = async () => {
    console.log('signOut clicked');
    await signOut();
  };

  return (
    <button onClick={signOutAction}> Wyloguj</button>

  );
};

export default LogoutButton;

