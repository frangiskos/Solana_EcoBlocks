'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

export function SignInButton() {
  const { data: session, status } = useSession();

  if (status === 'loading' || window.location.pathname === '/auth/login') {
    return (
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" disabled>
        ...
      </button>
    );
  }

  if (status === 'authenticated') {
    return (
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
        onClick={() => signOut()}
      >
        <Image
          src={session.user?.image ?? '/avatar.jpg'}
          alt={session.user?.name ?? ''}
          width={24}
          height={24}
          className="rounded-full mr-2"
        />
        Sign Out
      </button>
    );
  }

  return (
    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => signIn()}>
      Sign In
    </button>
  );
}
