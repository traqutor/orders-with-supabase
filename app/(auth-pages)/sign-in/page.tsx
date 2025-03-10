import Logo from '@/components/logo';
import LoginForm from '@/app/(auth-pages)/sign-in/login-form';

export default async function Page() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-4 justify-center items-center">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
        >
          <Logo className="h-52 w-52" />
        </a>
      </div>
      <LoginForm />
    </div>
  );
}
