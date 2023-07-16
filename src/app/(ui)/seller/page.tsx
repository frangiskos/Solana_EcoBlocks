import SellerList from './seller-list';
import RequestSignIn from '@/components/Shared/RequestSignIn';
import { getUserFromSession } from '@/utils/session';
import { db } from '@/utils/db';
import { Seller } from '@prisma/client';
import SellerListEmpty from './seller-list-empty';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SellerPage() {
  const user = await getUserFromSession();
  if (!user) {
    return <RequestSignIn />;
  }

  const sellers: Seller[] = await db.sellers.getUserSellers(user);

  if (sellers.length === 0) {
    return <SellerListEmpty />;
  }

  return <SellerList sellers={sellers} />;
}
