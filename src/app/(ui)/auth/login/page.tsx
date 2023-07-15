'use client';

import { signIn, useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

export default function Login() {
  const { status } = useSession();
  const { callbackUrl } = useParams();

  status !== 'loading' && signIn('google', { callbackUrl: callbackUrl || '/' });

  return null;
}
