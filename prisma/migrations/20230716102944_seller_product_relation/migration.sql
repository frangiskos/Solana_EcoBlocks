/*
  Warnings:

  - You are about to drop the column `isApproved` on the `Recycler` table. All the data in the column will be lost.
  - Added the required column `sellerId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "sellerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Recycler" DROP COLUMN "isApproved";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;
