import { db } from '@/utils/db';
import { handleCouponSchema } from '@/utils/form-validations';
import { getUserFromSession } from '@/utils/session';
import { NextRequest, NextResponse } from 'next/server';
import { fromZodError } from 'zod-validation-error';

export async function GET(_req: NextRequest) {
  const user = await getUserFromSession();
  if (!user) return NextResponse.json({}, { status: 401 });

  return NextResponse.json(await db.consumers.getCoupons(user));
}

export async function POST(_req: NextRequest, { params }: { params: { couponCode: string } }) {
  const user = await getUserFromSession();
  if (!user) return NextResponse.json({}, { status: 401 });

  const parsed = handleCouponSchema.safeParse({ coupon: params.couponCode });

  if (!parsed.success) {
    const error = fromZodError(parsed.error);
    return NextResponse.json({ error }, { status: 400 });
  }

  return NextResponse.json(await db.consumers.assignCoupon(parsed.data.coupon, user));
}

export async function DELETE(_req: NextRequest, { params }: { params: { couponCode: string } }) {
  const user = await getUserFromSession();
  if (!user) return NextResponse.json({}, { status: 401 });

  const parsed = handleCouponSchema.safeParse({ coupon: params.couponCode });

  if (!parsed.success) {
    const error = fromZodError(parsed.error);
    return NextResponse.json({ error }, { status: 400 });
  }

  return NextResponse.json(await db.consumers.unassignCoupon(parsed.data.coupon, user));
}
