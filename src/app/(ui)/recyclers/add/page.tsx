'use client';

import { CreateRecyclerFormValue } from '@/utils/form-validations';
import CreateRecyclerForm from './create-recycler-form';
import { useRouter } from 'next/navigation';
import AppCard from '@/components/Shared/AppCard';
import Section from '@/components/Shared/Section';

export default function RecyclerAdd() {
  const router = useRouter();

  const onCreateRequest = (recycler: CreateRecyclerFormValue) => {
    console.log('onCreateRequest', recycler);
    fetch(`/api/recyclers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recycler),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log('json', json);
      })
      .finally(() => {
        router.push('/recyclers');
      });
  };
  return (
    <Section>
      <AppCard>
        <CreateRecyclerForm onCreateRequest={onCreateRequest} />
      </AppCard>
    </Section>
  );
}
