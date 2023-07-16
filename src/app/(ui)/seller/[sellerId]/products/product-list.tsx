'use client';

import AppCard from '@/components/Shared/AppCard';
import Section from '@/components/Shared/Section';
import { Product, Seller } from '@prisma/client';
import Head from 'next/head';
import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { formatDate } from '@/utils/utils';

export const dynamic = 'force-dynamic';

export type SellerListProps = {
  sellerId: string;
  products: Product[];
  onProductRemove: (productId: string) => void;
};

const SellerList: React.FC<SellerListProps> = ({ sellerId, products, onProductRemove }) => {
  const onDelete = (productId: string) => {
    fetch(`/api/seller/${sellerId}/products/${productId}`, {
      method: 'DELETE',
    }).then(() => {
      onProductRemove(productId);
    });
  };

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <Section>
        <AppCard>
          <Link
            href={`/seller/${sellerId}/products/add`}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Add Product
          </Link>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Coupon Terms</th>
                  <th>Coupons</th>
                  <th>Valid From</th>
                  <th>Valid To</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.couponTerms}</td>
                    <td>
                      <span className="badge badge-ghost badge-sm">{product.quantity}</span>
                    </td>
                    <td>{formatDate(product.validFrom)}</td>
                    <td>{formatDate(product.validTo)}</td>
                    <th>
                      <button className="btn btn-ghost btn-xs" onClick={() => onDelete(product.id)}>
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
