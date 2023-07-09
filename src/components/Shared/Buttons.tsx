'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export function SignInButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'authenticated') {
    <Link href="/api/auth/signout">
      <Image src={session.user?.image ?? '/avatar.jpg'} alt={session.user?.name ?? ''} width={24} height={24} />
      <a>Sign Out</a>
    </Link>;
  }

  return (
    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => signIn()}>
      Sign In
    </button>
  );
}

export function SignOutButton() {
  return (
    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => signOut()}>
      Sign Out
    </button>
  );
}
