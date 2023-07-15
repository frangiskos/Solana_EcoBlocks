import { db } from '@/utils/db';
import { getUserFromSession } from '@/utils/session';
import Head from 'next/head';

export default async function SellerList() {
  const userFromSession = await getUserFromSession();
  if (!userFromSession) return null;
  const sellers = await db.sellers.getUserSellers(userFromSession);

  return (
    <>
      <Head>
        <title>Seller</title>
      </Head>
      <h1>Sellers</h1>
      <ul>
        {sellers.map((seller) => (
          <li key={seller.id}>
            {seller.name} ({seller.id})
          </li>
        ))}
      </ul>
    </>
  );
}
