import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import type { User } from '@prisma/client';

export async function getUserFromSession(): Promise<User | null> {
  const session = await getServerSession(authOptions);
  return session?.user as User;
}
