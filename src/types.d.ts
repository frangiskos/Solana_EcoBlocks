import type { Coupon as PrismaCoupon, Product as PrismaProduct, Seller as PrismaSeller } from '@prisma/client';

interface NestedCoupon extends PrismaCoupon {
  Product: Product;
}

interface Product extends PrismaProduct {
  Seller: Seller;
}

interface Seller extends PrismaSeller {}
