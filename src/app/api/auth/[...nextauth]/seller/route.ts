import { db } from '@/utils/db';
import { createSellerSchema } from '@/utils/form-validations';
import { getUserFromSession } from '@/utils/session';
import { removeUndefined } from '@/utils/utils';
import { NextRequest, NextResponse } from 'next/server';
import { fromZodError } from 'zod-validation-error';

export async function POST(req: NextRequest) {
  const user = await getUserFromSession();
  if (!user) return NextResponse.json({}, { status: 401 });

  const seller = createSellerSchema.safeParse(req.body as any);

  if (seller.success === false) {
    const error = fromZodError(seller.error);
    return NextResponse.json({ error }, { status: 400 });
  }

  return NextResponse.json(await db.sellers.create(removeUndefined(seller.data), user));
}
