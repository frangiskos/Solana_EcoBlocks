'use client';

import { CreateProductFormValue } from '@/utils/form-validations';
import { useRouter } from 'next/navigation';
import AppCard from '@/components/Shared/AppCard';
import Section from '@/components/Shared/Section';
import CreateProductForm from './create-product-form';

export default function ProductAdd({ params }: { params: { sellerId: string } }) {
  const router = useRouter();

  const onCreateRequest = (product: CreateProductFormValue) => {
    console.log('onCreateRequest', product);
    fetch(`/api/seller/${params.sellerId}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
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
        <CreateProductForm onCreateRequest={onCreateRequest} />
      </AppCard>
    </Section>
  );
}
