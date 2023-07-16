import { prisma } from '@/lib/prisma';
import { NestedCoupon } from '@/types';
import { Coupon, Product, Recycler, Seller, User } from '@prisma/client';

export class db {
  static sellers = {
    getUserSellers: this.getUserSellers,
    sellerNameExists: this.sellerNameExists,
    create: this.createSeller,
    update: this.updateSeller,
    delete: this.deleteSeller,
    refundCoupon: this.refundCoupon,
  };

  static products = {
    getBusinessProducts: this.getBusinessProducts,
    create: this.createProduct,
    update: this.updateProduct,
    delete: this.deleteProduct,
  };

  static consumers = {
    getCoupons: this.getCoupons,
    assignCoupon: this.assignCoupon,
    unassignCoupon: this.unassignCoupon,
  };

  static recyclers = {
    getUserRecyclers: this.getUserRecyclers,
    recyclerNameExists: this.recyclerNameExists,
    create: this.createRecycler,
    update: this.updateRecycler,
    delete: this.deleteRecycler,
    recycleCoupon: this.recycleCoupon,
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

  private static async refundCoupon(couponCode: string, user: User): Promise<Coupon> {
    const coupon = await prisma.coupon.findFirst({
      where: {
        code: couponCode,
      },
      include: {
        Product: {
          include: {
            Seller: {
              include: {
                UserSeller: true,
              },
            },
          },
        },
      },
    });

    if (!coupon) {
      throw new Error('Coupon not found');
    }

    const sellerUser = await prisma.userSeller.findFirst({
      where: {
        userId: user.id,
        sellerId: coupon.Product.sellerId,
      },
    });

    if (!sellerUser) {
      throw new Error('User does not have access to refund coupon from this seller');
    }

    return await prisma.coupon.update({
      where: {
        code: coupon.code,
      },
      data: {
        refundedAt: new Date(),
      },
    });
  }

  /**
   * PRODUCTS
   */
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
    product: Partial<Omit<Product, 'createdAt' | 'updatedAt' | 'quantity'>>,
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

  /**
   * CONSUMERS
   */
  private static async getCoupons(user: User): Promise<NestedCoupon[]> {
    return await prisma.coupon.findMany({
      include: {
        Product: {
          include: {
            Seller: true,
          },
        },
      },
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  private static async assignCoupon(code: string, user: User): Promise<Coupon> {
    const coupon = await prisma.coupon.findFirst({
      where: {
        code,
      },
    });

    if (!coupon) {
      throw new Error('Coupon does not exist');
    }

    if (coupon.userId === user.id) {
      throw new Error('Coupon already assigned to user');
    }

    if (coupon.status !== 'New') {
      throw new Error('Coupon already assigned to another user');
    }

    return await prisma.coupon.update({
      where: {
        code: coupon.code,
      },
      data: {
        userId: user.id,
        status: 'Assigned',
        assignedAt: new Date(),
      },
    });
  }

  private static async unassignCoupon(code: string, user: User): Promise<Coupon> {
    const coupon = await prisma.coupon.findFirst({
      where: {
        code,
      },
    });

    if (!coupon) {
      throw new Error('Coupon does not exist');
    }

    if (coupon.userId !== user.id) {
      throw new Error('Coupon is not assigned to user');
    }

    return prisma.coupon.update({
      where: {
        code,
      },
      data: {
        userId: null,
        status: 'New',
        assignedAt: null,
      },
    });
  }

  /**
   * RECYCLERS
   */
  private static async getUserRecyclers(user: User): Promise<Recycler[]> {
    return await prisma.recycler.findMany({
      where: {
        UserRecycler: {
          some: {
            userId: user.id,
          },
        },
      },
    });
  }

  private static async recyclerNameExists(name: string): Promise<boolean> {
    const recycler = await prisma.recycler.findFirst({
      where: {
        name,
      },
    });

    return !!recycler;
  }

  private static async createRecycler(
    recycler: Omit<Recycler, 'id' | 'createdAt' | 'updatedAt'>,
    user: User
  ): Promise<Recycler> {
    return await prisma.recycler.create({
      data: {
        ...recycler,
        UserRecycler: {
          create: {
            userId: user.id,
            role: 'Owner',
          },
        },
      },
    });
  }

  private static async updateRecycler(
    recycler: Partial<Omit<Recycler, 'createdAt' | 'updatedAt'>>,
    user: User
  ): Promise<Recycler> {
    const userRecycler = await prisma.userRecycler.findFirst({
      where: {
        userId: user.id,
        recyclerId: recycler.id,
      },
    });

    if (!userRecycler) {
      throw new Error('User is not a recycler owner');
    }

    const { id, ...recyclerData } = recycler;
    return await prisma.recycler.update({
      where: {
        id,
      },
      data: {
        ...recyclerData,
        updatedAt: new Date(),
      },
    });
  }

  private static async deleteRecycler(recyclerId: string, user: User): Promise<Recycler> {
    const recycler = await prisma.recycler.findFirst({
      where: {
        id: recyclerId,
      },
    });

    if (!recycler) {
      throw new Error('Recycler not found');
    }

    const userRecycler = await prisma.userRecycler.findFirst({
      where: {
        userId: user.id,
        recyclerId: recycler.id,
      },
    });

    if (!userRecycler) {
      throw new Error('User is not a recycler owner');
    }

    return await prisma.recycler.delete({
      where: {
        id: recyclerId,
      },
    });
  }

  private static async recycleCoupon(code: string, user: User): Promise<Coupon> {
    const coupon = await prisma.coupon.findFirst({
      where: {
        code,
      },
    });

    if (!coupon) {
      throw new Error('Coupon does not exist');
    }

    if (coupon.userId !== user.id) {
      throw new Error('Coupon is not assigned to user');
    }

    return prisma.coupon.update({
      where: {
        code,
      },
      data: {
        status: 'Recycled',
        recycledAt: new Date(),
      },
    });
  }
}
