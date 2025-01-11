import Providers from './providers';
import { NavSide } from '@/app/(protected)/nav-side';
import Link from 'next/link';
import HeaderAuth from '@/components/header-auth';
import { NavMobile } from '@/app/(protected)/nav-mobile';
import { HeaderUser } from '@/app/(protected)/header-user';


export default function protectedLayout({
                                          children
                                        }: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">
        <NavSide />
        <div className="flex flex-col sm:gap-4 sm:pl-14">
          <header
            className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <NavMobile />
            <div className="w-full flex justify-between items-center p-3 px-5 text-sm">
              <div className=" gap-5 items-center font-semibold hidden md:flex">
                <Link href={'/'}>Zamówienia</Link>
              </div>
              <HeaderUser />
            </div>
          </header>
          <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
            {children}
          </main>
        </div>

      </main>
    </Providers>
  );
}
