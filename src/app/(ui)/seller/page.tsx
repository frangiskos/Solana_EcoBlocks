'use client';

import { Seller } from '@prisma/client';
import { useSession } from 'next-auth/react';
import SellerList from './seller-list';
import RequestSignIn from '@/components/Shared/RequestSignIn';
import SellerListEmpty from './seller-list-empty';
import { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function SellerPage() {
  const { status } = useSession();
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [fetching, setFetching] = useState(false);

  const removeSeller = (id: string) => {
    setSellers(sellers.filter((seller) => seller.id !== id));
  };

  useEffect(() => {
    if (status === 'authenticated') {
      setFetching(true);
      fetch('/api/seller', { cache: 'no-store' })
        .then((res) => res.json())
        .then((data) => setSellers(data))
        .finally(() => setFetching(false));
    }
  }, [status]);

  if (status === 'loading' || fetching) {
    return null;
  }
  if (status === 'unauthenticated') {
    return <RequestSignIn />;
  }

  if (sellers.length === 0) {
    return <SellerListEmpty />;
  }

  return <SellerList sellers={sellers} onSellerRemove={removeSeller} />;
}
