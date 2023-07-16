import { db } from '@/utils/db';
import { getUserFromSession } from '@/utils/session';
import { NextRequest, NextResponse } from 'next/server';
import { fromZodError } from 'zod-validation-error';
import { z } from 'zod';

export async function POST(req: NextRequest) {
  const user = await getUserFromSession();
  if (!user) return NextResponse.json({}, { status: 401 });

  const body = await req.json();
  const nameSchema = z.object({
    name: z.string().trim().min(1, 'Business name is required'),
  });
  const parsed = nameSchema.safeParse(body);

  if (parsed.success === false) {
    const error = fromZodError(parsed.error);
    return NextResponse.json({ error }, { status: 400 });
  }

  return NextResponse.json(await db.recyclers.recyclerNameExists(parsed.data.name));
}
