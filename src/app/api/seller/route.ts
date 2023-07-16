import { db } from '@/utils/db';
import { createSellerSchema } from '@/utils/form-validations';
import { getUserFromSession } from '@/utils/session';
import { removeUndefined } from '@/utils/utils';
import { NextRequest, NextResponse } from 'next/server';
import { fromZodError } from 'zod-validation-error';

export async function GET() {
  const user = await getUserFromSession();
  if (!user) return NextResponse.json({}, { status: 401 });

  return NextResponse.json(await db.sellers.getUserSellers(user));
}

export async function POST(req: NextRequest) {
  const user = await getUserFromSession();
  if (!user) return NextResponse.json({}, { status: 401 });

  const body = await req.json();
  const parsed = createSellerSchema.safeParse(body);

  if (!parsed.success) {
    const error = fromZodError(parsed.error);
    return NextResponse.json({ error }, { status: 400 });
  }

  const data = removeUndefined(parsed.data);
  return NextResponse.json(await db.sellers.create(data, user));
}
