import type { Coupon, Product, Seller } from '@prisma/client';

interface NestedCoupon extends Coupon {
  Product: NestedProduct;
}

interface NestedProduct extends Product {
  Seller: Seller;
}
