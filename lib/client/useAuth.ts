export function useAuth() {


  const onLogin = async ({ email, password }: { email: string, password: string }) => {

    const res = await fetch('/api/dashboard/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (data.error) throw new Error(`Login Error: ${JSON.stringify(data)}`);

    if (data.token) localStorage.setItem('token', data.token);
  };


  return {
    onLogin
  };

}
