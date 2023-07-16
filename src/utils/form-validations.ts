import { constants } from '@/constants';
import { z } from 'zod';

export const createSellerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Business name is required')
    .min(3)
    .max(250, 'Business name cannot exceed 250 characters'),
  url: z.string().optional().or(z.string().url('Invalid URL')),
  address: z.string().optional(),
  description: z.string().optional(),
});
export type CreateSellerFormValue = z.infer<typeof createSellerSchema>;

export const createRecyclerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Business name is required')
    .min(3)
    .max(250, 'Business name cannot exceed 250 characters'),
  url: z.string().optional().or(z.string().url('Invalid URL')),
  address: z.string().optional(),
  description: z.string().optional(),
});
export type CreateRecyclerFormValue = z.infer<typeof createRecyclerSchema>;

const totalCoupons = z
  .number()
  .int()
  .min(1, 'At least one coupon is required')
  .max(constants.MAX_COUPONS, `Cannot create more than ${constants.MAX_COUPONS} coupons`)
  .or(
    z
      .string()
      .refine((val) => !isNaN(+val) && Number.isInteger(Number(val)), {
        message: 'Must be a valid integer',
      })
      .transform(Number)
  );
export const createProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Product name is required')
    .min(3)
    .max(250, 'Product name cannot exceed 250 characters'),
  validFrom: z.string(),
  validTo: z.string(),
  totalCoupons: totalCoupons,
  couponTerms: z.string(),
  coupons: z.array(z.string()),
});
export type CreateProductFormValue = z.infer<typeof createProductSchema>;

export const handleCouponSchema = z.object({
  coupon: z.string().trim().length(10, 'Coupon code must be 10 characters long'),
});
export type HandleCouponFormValue = z.infer<typeof handleCouponSchema>;
