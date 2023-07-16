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
