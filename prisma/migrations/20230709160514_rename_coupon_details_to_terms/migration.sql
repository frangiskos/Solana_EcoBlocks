/*
  Warnings:

  - You are about to drop the column `couponDescription` on the `Product` table. All the data in the column will be lost.
  - Added the required column `couponTerms` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "couponDescription",
ADD COLUMN     "couponTerms" TEXT NOT NULL;
