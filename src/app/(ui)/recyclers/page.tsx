'use client';

import { Recycler } from '@prisma/client';
import { useSession } from 'next-auth/react';
import RecyclerList from './recycler-list';
import RequestSignIn from '@/components/Shared/RequestSignIn';
import RecyclerListEmpty from './recycler-list-empty';
import { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function RecyclerPage() {
  const { status } = useSession();
  const [recyclers, setRecyclers] = useState<Recycler[]>([]);
  const [fetching, setFetching] = useState(false);

  const removeRecycler = (id: string) => {
    setRecyclers(recyclers.filter((recycler) => recycler.id !== id));
  };

  useEffect(() => {
    if (status === 'authenticated') {
      setFetching(true);
      fetch('/api/recyclers', { cache: 'no-store' })
        .then((res) => res.json())
        .then((data) => setRecyclers(data))
        .finally(() => setFetching(false));
    }
  }, [status]);

  if (status === 'loading' || fetching) {
    return null;
  }
  if (status === 'unauthenticated') {
    return <RequestSignIn />;
  }

  if (recyclers.length === 0) {
    return <RecyclerListEmpty />;
  }

  return <RecyclerList recyclers={recyclers} onRecyclerRemove={removeRecycler} />;
}
