'use client';

import AppCard from '@/components/Shared/AppCard';
import Section from '@/components/Shared/Section';
import Head from 'next/head';
import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { formatDate } from '@/utils/utils';
import { NestedCoupon } from '@/types';
import clsx from 'clsx';

export const dynamic = 'force-dynamic';

export type CouponListProps = {
  coupons: NestedCoupon[];
  onCouponUnassign: (productId: string) => void;
};

const CouponList: React.FC<CouponListProps> = ({ coupons, onCouponUnassign }) => {
  const onUnassign = (couponCode: string) => {
    fetch(`/api/consumers/coupons/${couponCode}`, {
      method: 'DELETE',
    }).then(() => {
      onCouponUnassign(couponCode);
    });
  };

  return (
    <>
      <Head>
        <title>My Coupons</title>
      </Head>
      <Section>
        <AppCard>
          <Link
            href={`/consumers/add`}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Add Coupon
          </Link>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Coupon code</th>
                  <th>Valid From</th>
                  <th>Expires</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon.code}>
                    <td>{coupon.Product.name}</td>
                    <td>
                      {coupon.code}
                      <br />
                      <span className="badge badge-ghost badge-sm">{coupon.Product.couponTerms}</span>
                    </td>
                    <td>{formatDate(coupon.Product.validFrom)}</td>
                    <td>{formatDate(coupon.Product.validTo)}</td>
                    <td>
                      <span
                        className={clsx(
                          'badge badge-ghost badge-sm',
                          coupon.refundedAt ? 'text-green-600' : coupon.recycledAt ? 'text-blue-600' : 'text-yellow-600'
                        )}
                      >
                        {coupon.refundedAt ? 'Refunded' : coupon.recycledAt ? 'Recycled' : 'Using'}
                      </span>
                    </td>
                    <th>
                      <button className="btn btn-ghost btn-xs" onClick={() => onUnassign(coupon.code)}>
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

export default CouponList;
