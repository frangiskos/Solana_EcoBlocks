'use client';

import { CreateSellerFormValue } from '@/utils/form-validations';
import CreateSellerForm from './create-seller-form';
import { useRouter } from 'next/navigation';
import AppCard from '@/components/Shared/AppCard';
import Section from '@/components/Shared/Section';

export default function SellerAdd() {
  const router = useRouter();

  const onCreateRequest = (seller: CreateSellerFormValue) => {
    console.log('onCreateRequest', seller);
    fetch(`/api/seller`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(seller),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log('json', json);
      })
      .finally(() => {
        router.push('/seller');
      });
  };
  return (
    <Section>
      <AppCard>
        <CreateSellerForm onCreateRequest={onCreateRequest} />
      </AppCard>
    </Section>
  );
}
