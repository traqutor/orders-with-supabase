'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FormMessage, Message } from '@/components/form-message';
import { Button } from '@/components/ui/button';

export default function LoginForm() {
  const [message, setMessage] = useState<Message>({ error: '' });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const res = await fetch('/api/dashboard/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password')
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
      setMessage({ error: 'Invalid credentials' });
    } else {
      window.location.href = '/orders'; // Redirect after successful login
    }
  }


  return (
    <form className="flex-1 flex flex-col min-w-64" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-sm text-foreground">
        Don't have an account?{' '}
        <Link className="text-foreground font-medium underline" href="/">
          Contact with administrator.
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />

        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <Button type="submit">
          Sign in
        </Button>

        <FormMessage message={message} />

        <Link
          className="text-xs text-foreground underline"
          href="/forgot-password"
        >
          Forgot Password?
        </Link>
      </div>
    </form>);
}

