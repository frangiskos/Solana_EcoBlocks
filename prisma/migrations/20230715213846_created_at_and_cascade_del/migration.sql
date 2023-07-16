/*
  Warnings:

  - You are about to drop the column `dateAssigned` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `dateCreated` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `dateRecycled` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `dateRefunded` on the `Coupon` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Coupon" DROP CONSTRAINT "Coupon_productId_fkey";

-- DropForeignKey
ALTER TABLE "Coupon" DROP CONSTRAINT "Coupon_recyclerId_fkey";

-- DropForeignKey
ALTER TABLE "Coupon" DROP CONSTRAINT "Coupon_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserRecycler" DROP CONSTRAINT "UserRecycler_recyclerId_fkey";

-- DropForeignKey
ALTER TABLE "UserRecycler" DROP CONSTRAINT "UserRecycler_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserSeller" DROP CONSTRAINT "UserSeller_sellerId_fkey";

-- DropForeignKey
ALTER TABLE "UserSeller" DROP CONSTRAINT "UserSeller_userId_fkey";

-- AlterTable
ALTER TABLE "Coupon" DROP COLUMN "dateAssigned",
DROP COLUMN "dateCreated",
DROP COLUMN "dateRecycled",
DROP COLUMN "dateRefunded",
ADD COLUMN     "assignedAt" TIMESTAMPTZ,
ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "recycledAt" TIMESTAMPTZ,
ADD COLUMN     "refundedAt" TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "Recycler" ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "UserRecycler" ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "UserSeller" ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "UserSeller" ADD CONSTRAINT "UserSeller_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSeller" ADD CONSTRAINT "UserSeller_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRecycler" ADD CONSTRAINT "UserRecycler_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRecycler" ADD CONSTRAINT "UserRecycler_recyclerId_fkey" FOREIGN KEY ("recyclerId") REFERENCES "Recycler"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coupon" ADD CONSTRAINT "Coupon_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coupon" ADD CONSTRAINT "Coupon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coupon" ADD CONSTRAINT "Coupon_recyclerId_fkey" FOREIGN KEY ("recyclerId") REFERENCES "Recycler"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
