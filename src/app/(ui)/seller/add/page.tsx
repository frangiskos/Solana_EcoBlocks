import { CreateSellerFormValue } from '@/utils/form-validations';
import CreateSellerForm from './create-seller-form';
import { db } from '@/utils/db';
import { getUserFromSession } from '@/utils/session';
import { Seller } from '@prisma/client';

export default async function SellerAdd() {
  const user = await getUserFromSession();
  if (!user) return null;

  const onCreateRequest = (seller: CreateSellerFormValue) => {
    const response = db.sellers.create(seller as unknown as Seller, user);
    console.log(response);
  };
  return (
    <>
      <CreateSellerForm onCreateRequest={onCreateRequest} />
    </>
  );
}
