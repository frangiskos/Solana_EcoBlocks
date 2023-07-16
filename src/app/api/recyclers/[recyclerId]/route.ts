import { db } from '@/utils/db';
import { createRecyclerSchema } from '@/utils/form-validations';
import { getUserFromSession } from '@/utils/session';
import { removeUndefined } from '@/utils/utils';
import { NextRequest, NextResponse } from 'next/server';
import { fromZodError } from 'zod-validation-error';

export async function PUT(req: NextRequest, { params }: { params: { recyclerId: string } }) {
  const user = await getUserFromSession();
  if (!user) return NextResponse.json({}, { status: 401 });
  const recyclerId = params.recyclerId;
  if (!recyclerId) return NextResponse.json({}, { status: 401 });

  const body = await req.json();
  const parsed = createRecyclerSchema.safeParse(body);

  if (!parsed.success) {
    const error = fromZodError(parsed.error);
    return NextResponse.json({ error }, { status: 400 });
  }

  const data = { ...removeUndefined(parsed.data), id: recyclerId };
  return NextResponse.json(await db.recyclers.update(data, user));
}

export async function DELETE(_req: NextRequest, { params }: { params: { recyclerId: string } }) {
  const user = await getUserFromSession();
  if (!user) return NextResponse.json({}, { status: 401 });
  const recyclerId = params.recyclerId;
  if (!recyclerId) return NextResponse.json({}, { status: 401 });

  return NextResponse.json(await db.recyclers.delete(recyclerId, user));
}
