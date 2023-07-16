import { db } from '@/utils/db';
import { createProductSchema } from '@/utils/form-validations';
import { getUserFromSession } from '@/utils/session';
import { removeUndefined } from '@/utils/utils';
import { Product } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { fromZodError } from 'zod-validation-error';

export async function PUT(req: NextRequest, { params }: { params: { sellerId: string; productId: string } }) {
  const user = await getUserFromSession();
  if (!user) return NextResponse.json({}, { status: 401 });
  const sellerId = params.sellerId;
  if (!sellerId) return NextResponse.json({}, { status: 401 });
  const productId = params.productId;
  if (!productId) return NextResponse.json({}, { status: 401 });

  const body = await req.json();
  const parsed = createProductSchema.safeParse(body);

  if (!parsed.success) {
    const error = fromZodError(parsed.error);
    return NextResponse.json({ error }, { status: 400 });
  }

  const data = removeUndefined(parsed.data);
  const validFrom = data.validFrom ? new Date(data.validFrom) : null;
  const validTo = data.validTo ? new Date(data.validTo) : null;
  const { coupons, ...rest } = data;
  const { validFrom: removedValidFrom, validTo: removedValidTo, ...restExcludingDates } = rest;
  const product: Partial<Product> = { ...restExcludingDates, sellerId, id: productId };
  if (validFrom) product.validFrom = validFrom;
  if (validTo) product.validTo = validTo;

  return NextResponse.json(await db.products.update(product, coupons, user));
}

export async function DELETE(_req: NextRequest, { params }: { params: { sellerId: string; productId: string } }) {
  const user = await getUserFromSession();
  if (!user) return NextResponse.json({}, { status: 401 });
  const productId = params.productId;
  if (!productId) return NextResponse.json({}, { status: 401 });

  return NextResponse.json(await db.products.delete(productId, user));
}
