'use client';

import { HandleCouponFormValue } from '@/utils/form-validations';
import { useRouter } from 'next/navigation';
import AppCard from '@/components/Shared/AppCard';
import Section from '@/components/Shared/Section';
import RefundCouponForm from './refund-coupon-form';

export default function CouponRefund() {
  const router = useRouter();

  const onRefundRequest = (coupon: HandleCouponFormValue) => {
    console.log('onRefundRequest', coupon);
    fetch(`/api/seller/refund/${coupon.coupon}`, {
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
        <RefundCouponForm onRefundRequest={onRefundRequest} />
      </AppCard>
    </Section>
  );
}
