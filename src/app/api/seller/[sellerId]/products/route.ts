import { db } from '@/utils/db';
import { createProductSchema } from '@/utils/form-validations';
import { getUserFromSession } from '@/utils/session';
import { removeUndefined } from '@/utils/utils';
import { NextRequest, NextResponse } from 'next/server';
import { fromZodError } from 'zod-validation-error';

export async function GET(_req: NextRequest, { params }: { params: { sellerId: string } }) {
  const user = await getUserFromSession();
  if (!user) return NextResponse.json({}, { status: 401 });
  const sellerId = params.sellerId;
  if (!sellerId) return NextResponse.json({}, { status: 401 });

  return NextResponse.json(await db.products.getBusinessProducts(sellerId, user));
}

export async function POST(req: NextRequest, { params }: { params: { sellerId: string } }) {
  const user = await getUserFromSession();
  if (!user) return NextResponse.json({}, { status: 401 });
  const sellerId = params.sellerId;
  if (!sellerId) return NextResponse.json({}, { status: 401 });

  const body = await req.json();
  const parsed = createProductSchema.safeParse(body);

  if (!parsed.success) {
    const error = fromZodError(parsed.error);
    return NextResponse.json({ error }, { status: 400 });
  }

  const data = removeUndefined(parsed.data);
  const validFrom = new Date(data.validFrom);
  const validTo = new Date(data.validTo);
  const { coupons, ...rest } = { ...data, validFrom, validTo };
  const clean = removeUndefined(rest);
  const product = { ...clean, sellerId };
  return NextResponse.json(await db.products.create(product, coupons, user));
}
