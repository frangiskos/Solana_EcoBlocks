import NewProduct from '@/components/SellersPage/NewProduct';
import SellerNotAuthenticated from '@/components/SellersPage/NotAuthenticated';
import Products from '@/components/SellersPage/Products';
import { authOptions } from '@/utils/auth';
import { getServerSession } from 'next-auth';
import Head from 'next/head';

export default async function SellerPage() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Head>
        <title>Seller</title>
      </Head>
      <h1>Seller</h1>

      {session?.user ? <Authenticated /> : <NotAuthenticated />}
      {session ? <code>{JSON.stringify(session, null, 2)}</code> : <></>}
    </>
  );
}
function Authenticated() {
  return (
    <>
      <Products />
      <NewProduct />
    </>
  );
}
function NotAuthenticated() {
  return <SellerNotAuthenticated />;
}
