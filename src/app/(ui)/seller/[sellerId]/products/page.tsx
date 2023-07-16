'use client';

import { Product, Seller } from '@prisma/client';
import { useSession } from 'next-auth/react';
import ProductList from './product-list';
import RequestSignIn from '@/components/Shared/RequestSignIn';
import ProductListEmpty from './product-list-empty';
import { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function ProductPage({ params }: { params: { sellerId: string } }) {
  const { status } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [fetching, setFetching] = useState(false);

  const removeProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  useEffect(() => {
    if (status === 'authenticated') {
      setFetching(true);
      fetch(`/api/seller/${params.sellerId}/products`, { cache: 'no-store' })
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .finally(() => setFetching(false));
    }
  }, [params.sellerId, status]);

  if (status === 'loading' || fetching) {
    return null;
  }
  if (status === 'unauthenticated') {
    return <RequestSignIn />;
  }

  if (products.length === 0) {
    return <ProductListEmpty sellerId={params.sellerId} />;
  }

  return <ProductList products={products} sellerId={params.sellerId} onProductRemove={removeProduct} />;
}
