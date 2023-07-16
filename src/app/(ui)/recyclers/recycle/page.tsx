'use client';

import { HandleCouponFormValue } from '@/utils/form-validations';
import { useRouter } from 'next/navigation';
import AppCard from '@/components/Shared/AppCard';
import Section from '@/components/Shared/Section';
import RecycleCouponForm from './recycle-coupon-form';

export default function CouponRecycle() {
  const router = useRouter();

  const onRecycleRequest = (coupon: HandleCouponFormValue) => {
    console.log('onRecycleRequest', coupon);
    fetch(`/api/recyclers/recycle/${coupon.coupon}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(coupon),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log('json', json);
      })
      .finally(() => {
        router.push(`./`);
      });
  };
  return (
    <Section>
      <AppCard>
        <RecycleCouponForm onRecycleRequest={onRecycleRequest} />
      </AppCard>
    </Section>
  );
}
