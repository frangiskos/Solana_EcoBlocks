'use client';

import AppCard from '@/components/Shared/AppCard';
import Section from '@/components/Shared/Section';
import { Recycler } from '@prisma/client';
import Head from 'next/head';
import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/20/solid';

export const dynamic = 'force-dynamic';

export type RecyclerListProps = {
  recyclers: Recycler[];
  onRecyclerRemove: (id: string) => void;
};

const RecyclerList: React.FC<RecyclerListProps> = ({ recyclers, onRecyclerRemove }) => {
  const onDelete = (id: string) => {
    fetch(`/api/recyclers/${id}`, {
      method: 'DELETE',
    }).then(() => {
      onRecyclerRemove(id);
    });
  };

  return (
    <>
      <Head>
        <title>Recyclers</title>
      </Head>
      <Section>
        <AppCard>
          <Link
            href="/recyclers/add"
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Add Recycle Center
          </Link>
          <Link
            href="/recyclers/recycle"
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Mark Coupon as Recycled
          </Link>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Recycle Center</th>
                  <th>Description</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {recyclers.map((recycler) => (
                  <tr key={recycler.id}>
                    <td>
                      {recycler.name}

                      {recycler.url && (
                        <>
                          <br />
                          <Link href={recycler.url} className="link">
                            {recycler.url}
                          </Link>
                        </>
                      )}
                      {recycler.address && (
                        <>
                          <br />
                          <span className="badge badge-ghost badge-sm">{recycler.address}</span>
                        </>
                      )}
                    </td>
                    <td>{recycler.description}</td>
                    <th>
                      <button className="btn btn-ghost btn-xs" onClick={() => onDelete(recycler.id)}>
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

export default RecyclerList;
