'use client';

import AppCard from '@/components/Shared/AppCard';
import Section from '@/components/Shared/Section';
import { Seller } from '@prisma/client';
import Head from 'next/head';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export type SellerListProps = {
  sellers: Seller[];
};

const SellerList: React.FC<SellerListProps> = ({ sellers }) => {
  const onDelete = (id: string) => {
    fetch(`/api/seller/${id}`, {
      method: 'DELETE',
    });
  };

  return (
    <>
      <Head>
        <title>Seller</title>
      </Head>
      <Section>
        <AppCard>
          <h1>Sellers</h1>
          <Link
            href="/seller/add"
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Add Business
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
                      <button className="btn btn-ghost btn-xs">products</button>
                    </th>
                    <th>
                      <button className="btn btn-ghost btn-xs" onClick={() => onDelete(seller.id)}>
                        delete
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-red-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            // eslint-disable-next-line max-len
                            d="M10.707 10l4.147-4.146a.5.5 0 10-.708-.708L10 9.293 5.854 5.147a.5.5 0 00-.708.708L9.293 10l-4.147 4.146a.5.5 0 10.708.708L10 10.707l4.146 4.147a.5.5 0 10.708-.708L10.707 10z"
                            clipRule="evenodd"
                          />
                        </svg>
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
