import React from 'react';
import Link from 'next/link';

export default async function Page() {

  return (
    <div className=" p-6 ">
      <Link href="/orders">
        Wybierz zamówienie z listy
      </Link>
    </div>
  );
}