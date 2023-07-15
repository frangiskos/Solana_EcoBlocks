import { prisma } from '@/lib/prisma';
import { Seller, User } from '@prisma/client';

export class db {
  static sellers = {
    getUserSellers: this.getUserSellers,
    sellerNameExists: this.sellerNameExists,
    create: this.createSeller,
  };

  private static async getUserSellers(user: User): Promise<Seller[]> {
    return await prisma.seller.findMany({
      where: {
        UserSeller: {
          some: {
            userId: user.id,
          },
        },
      },
    });
  }

  private static async sellerNameExists(name: string, id?: string): Promise<boolean> {
    const seller = await prisma.seller.findFirst({
      where: {
        name,
        id: {
          not: id,
        },
      },
    });

    return !!seller;
  }

  private static async createSeller(seller: Omit<Seller, 'id'>, user: User): Promise<Seller> {
    return await prisma.seller.create({
      data: {
        name: seller.name,
        address: seller.address,
        description: seller.description,
        url: seller.url,
        UserSeller: {
          create: {
            userId: user.id,
            role: 'Owner',
          },
        },
      },
    });
  }
}
