/*
  Warnings:

  - You are about to drop the column `category` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "category";

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "postCategory" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "postCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "postCategory_postId_idx" ON "postCategory"("postId");

-- CreateIndex
CREATE INDEX "postCategory_categoryId_idx" ON "postCategory"("categoryId");

-- CreateIndex
CREATE INDEX "Follows_userId_idx" ON "Follows"("userId");

-- CreateIndex
CREATE INDEX "comments_postId_idx" ON "comments"("postId");

-- AddForeignKey
ALTER TABLE "postCategory" ADD CONSTRAINT "postCategory_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postCategory" ADD CONSTRAINT "postCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
