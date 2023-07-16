import { db } from '@/utils/db';
import { getUserFromSession } from '@/utils/session';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest) {
  const user = await getUserFromSession();
  if (!user) return NextResponse.json({}, { status: 401 });

  return NextResponse.json(await db.consumers.getCoupons(user));
}
