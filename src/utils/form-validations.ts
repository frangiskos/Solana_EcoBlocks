import { z } from 'zod';

export const createSellerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Business name is required')
    .min(3, 'Business name must have more than 8 characters')
    .max(250, 'Business name cannot exceed 250 characters'),
  url: z.string().url().optional(),
  address: z.string().optional(),
  description: z.string().optional(),
});
export type CreateSellerFormValue = z.infer<typeof createSellerSchema>;
