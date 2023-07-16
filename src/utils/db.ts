import { prisma } from '@/lib/prisma';
import { Product, Seller, User } from '@prisma/client';

export class db {
  static sellers = {
    getUserSellers: this.getUserSellers,
    sellerNameExists: this.sellerNameExists,
    create: this.createSeller,
    update: this.updateSeller,
    delete: this.deleteSeller,
  };

  static products = {
    getBusinessProducts: this.getBusinessProducts,
    create: this.createProduct,
    update: this.updateProduct,
    delete: this.deleteProduct,
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
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  private static async sellerNameExists(name: string, id?: string): Promise<{ exists: boolean }> {
    const seller = await prisma.seller.findFirst({
      where: {
        name,
        id: {
          not: id,
        },
      },
    });

    return { exists: !!seller };
  }

  private static async createSeller(
    seller: Omit<Seller, 'id' | 'createdAt' | 'updatedAt'>,
    user: User
  ): Promise<Seller> {
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

  private static async updateSeller(seller: Omit<Seller, 'createdAt' | 'updatedAt'>, user: User): Promise<Seller> {
    const sellerUsers = await prisma.userSeller.findMany({
      where: {
        userId: user.id,
        sellerId: seller.id,
        role: 'Owner',
      },
    });

    if (!sellerUsers.length) {
      throw new Error('User is not a seller owner');
    }

    const { id, ...sellerData } = seller;
    return await prisma.seller.update({
      where: {
        id,
      },
      data: {
        ...sellerData,
        updatedAt: new Date(),
      },
    });
  }

  private static async deleteSeller(sellerId: string, user: User): Promise<Seller> {
    const sellerUser = await prisma.userSeller.findFirst({
      where: {
        userId: user.id,
        sellerId: sellerId,
      },
    });

    if (!sellerUser) {
      // throw new Error('User is not a seller owner');
      const seller = await prisma.seller.findFirst({
        where: {
          id: sellerId,
        },
      });
      return seller!;
    }

    return await prisma.seller.delete({
      where: {
        id: sellerId,
      },
    });
  }

  private static async getBusinessProducts(sellerId: string, user: User): Promise<Product[]> {
    const sellerUser = await prisma.userSeller.findFirst({
      where: {
        userId: user.id,
        sellerId: sellerId,
      },
    });

    if (!sellerUser) {
      // throw new Error('User is not a seller owner');
      return [];
    }

    return await prisma.product.findMany({
      where: {
        sellerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  private static async createProduct(
    product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'quantity'>,
    coupons: string[],
    user: User
  ): Promise<Product> {
    const sellerUser = await prisma.userSeller.findFirst({
      where: {
        userId: user.id,
        sellerId: product.sellerId,
      },
    });

    if (!sellerUser) {
      throw new Error('User is not a seller owner');
    }

    return await prisma.product.create({
      data: {
        name: product.name,
        quantity: coupons.length,
        validFrom: product.validFrom || new Date(),
        validTo: product.validTo,
        couponTerms: product.couponTerms,
        sellerId: product.sellerId,
        Coupons: {
          createMany: {
            data: coupons.map((coupon) => ({
              code: coupon,
              status: 'New',
            })),
          },
        },
      },
    });
  }

  private static async updateProduct(
    product: Omit<Product, 'createdAt' | 'updatedAt' | 'quantity'>,
    coupons: string[],
    user: User
  ): Promise<Product> {
    const sellerUser = await prisma.userSeller.findFirst({
      where: {
        userId: user.id,
        sellerId: product.sellerId,
      },
    });

    if (!sellerUser) {
      throw new Error('User is not a seller owner');
    }

    const { id, ...productData } = product;
    return await prisma.product.update({
      where: {
        id,
      },
      data: {
        ...productData,
        updatedAt: new Date(),
        quantity: { increment: coupons.length },
        Coupons: {
          createMany: {
            data: coupons.map((coupon) => ({
              code: coupon,
              status: 'New',
            })),
          },
        },
      },
    });
  }

  private static async deleteProduct(productId: string, user: User): Promise<Product> {
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const sellerUser = await prisma.userSeller.findFirst({
      where: {
        userId: user.id,
        sellerId: product.sellerId,
      },
    });

    if (!sellerUser) {
      throw new Error('User is not a seller owner');
    }

    return await prisma.product.delete({
      where: {
        id: productId,
      },
    });
  }
}
