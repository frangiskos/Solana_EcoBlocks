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

export const createProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Product name is required')
    .min(3)
    .max(250, 'Product name cannot exceed 250 characters'),
  validFrom: z.date(),
  validTo: z.date(),
  couponTerms: z.string(),
  coupons: z.array(z.string()).nonempty('At least one coupon is required'),
});
export type CreateProductFormValue = z.infer<typeof createProductSchema>;
