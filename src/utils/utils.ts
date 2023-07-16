import { constants } from '@/constants';
import { customAlphabet } from 'nanoid';

export function removeUndefined<T extends Record<string, unknown>>(obj: T): Required<T> {
  const copy = { ...obj };
  Object.keys(copy).forEach((key) => (copy[key as keyof T] === undefined ? delete copy[key as keyof T] : {}));
  return copy as Required<T>;
}

export function formatDate(date: Date | string) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  // var formattedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(date);
  // return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  return date.toLocaleDateString();
}

export function generateCouponCodes(coupons: number): string[] {
  const nanoid = customAlphabet('6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz', constants.COUPON_LENGTH);
  const couponCodes = [];
  for (let i = 0; i < coupons; i++) {
    couponCodes.push(nanoid());
  }
  return couponCodes;
}
