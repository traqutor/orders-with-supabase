import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="flex gap-8 justify-center items-center">
        <a
          href="https://ets-polska.pl "
          target="_blank"
          rel="noreferrer"
        >
          <Logo className="h-52 w-52" />
        </a>
      </div>

      <p className="text-3xl lg:text-4xl leading-tight! mx-auto max-w-xs text-center">
        Nowa aplikacja w {' '}

        <a
          href="https://ets-polska.pl"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          ETS Polska
        </a>

      </p>

      <div className="w-full p-[1px] bg-linear-to-r from-transparent via-foreground/10 to-transparent" />

      <div className="flex gap-2">

        <Button asChild size="sm" variant={'outline'}>
          <Link href="/sign-in">Sign in</Link>
        </Button>
        {/*<Button asChild size="sm" variant={'default'}>
          <Link href="/sign-up">Sign up</Link>
        </Button>*/}
      </div>

    </div>
  );
}
