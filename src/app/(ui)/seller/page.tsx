import Products from '@/components/SellersPage/Products';
import NewProduct from '@/components/SellersPage/NewProduct';
import SellerNotAuthenticated from '@/components/SellersPage/NotAuthenticated';
import { authOptions } from '@/utils/auth';
import { getServerSession } from 'next-auth';
import Head from 'next/head';
import SellerList from './seller-list';
import Link from 'next/link';

export default async function SellerPage() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Head>
        <title>Seller</title>
      </Head>
      <h1>Seller</h1>
      <Link
        href="/seller/add"
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Add Business
      </Link>

      {session?.user ? <Authenticated /> : <NotAuthenticated />}
      {session ? <code>{JSON.stringify(session, null, 2)}</code> : <></>}
      <SellerList />
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
