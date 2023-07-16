'use client';

import AppCard from '@/components/Shared/AppCard';
import Section from '@/components/Shared/Section';
import { Seller } from '@prisma/client';
import Head from 'next/head';
import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/20/solid';

export const dynamic = 'force-dynamic';

export type SellerListProps = {
  sellers: Seller[];
  onSellerRemove: (id: string) => void;
};

const SellerList: React.FC<SellerListProps> = ({ sellers, onSellerRemove }) => {
  const onDelete = (id: string) => {
    fetch(`/api/seller/${id}`, {
      method: 'DELETE',
    }).then(() => {
      onSellerRemove(id);
    });
  };

  return (
    <>
      <Head>
        <title>Seller</title>
      </Head>
      <Section>
        <AppCard>
          <Link
            href="/seller/add"
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Add Business
          </Link>
          <Link
            href="/seller/refund"
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Refund Coupon
          </Link>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Business</th>
                  <th>Description</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sellers.map((seller) => (
                  <tr key={seller.id}>
                    <td>
                      {seller.name}

                      {seller.url && (
                        <>
                          <br />
                          <Link href={seller.url} className="link">
                            {seller.url}
                          </Link>
                        </>
                      )}
                      {seller.address && (
                        <>
                          <br />
                          <span className="badge badge-ghost badge-sm">{seller.address}</span>
                        </>
                      )}
                    </td>
                    <td>{seller.description}</td>
                    <th>
                      <Link href={`/seller/${seller.id}/products`} className="btn btn-ghost btn-xs">
                        products
                      </Link>
                      {/* <button className="btn btn-ghost btn-xs">products</button> */}
                    </th>
                    <th>
                      <button className="btn btn-ghost btn-xs" onClick={() => onDelete(seller.id)}>
                        <XMarkIcon className="h-6 w-6 text-red-500" />
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AppCard>
      </Section>
    </>
  );
};

export default SellerList;
