'use client';

import { useSession } from 'next-auth/react';

export function IsAuth({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  console.log(session, status);

  if (status === 'authenticated') {
    return <>{children}</>;
  } else {
    return <></>;
  }
}
export function IsNotAuth({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  console.log(session, status);

  if (status === 'authenticated') {
    return <></>;
  } else {
    return <>{children}</>;
  }
}
