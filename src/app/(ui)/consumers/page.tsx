'use client';

import { useSession } from 'next-auth/react';
import RequestSignIn from '@/components/Shared/RequestSignIn';
import { useEffect, useState } from 'react';
import { NestedCoupon } from '@/types';
import CouponListEmpty from './coupon-list-empty';
import CouponList from './coupon-list';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function ConsumerPage() {
  const { status } = useSession();
  const [coupons, setCoupons] = useState<NestedCoupon[]>([]);
  const [fetching, setFetching] = useState(false);

  const removeCoupon = (code: string) => {
    setCoupons(coupons.filter((coupon) => coupon.code !== code));
  };

  useEffect(() => {
    if (status === 'authenticated') {
      setFetching(true);
      fetch(`/api/consumers/coupons`, { cache: 'no-store' })
        .then((res) => res.json())
        .then((data) => setCoupons(data))
        .finally(() => setFetching(false));
    }
  }, [status]);

  if (status === 'loading' || fetching) {
    return null;
  }
  if (status === 'unauthenticated') {
    return <RequestSignIn />;
  }

  if (coupons.length === 0) {
    return <CouponListEmpty />;
  }

  return <CouponList coupons={coupons} onCouponUnassign={removeCoupon} />;
}
