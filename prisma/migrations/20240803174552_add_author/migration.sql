/*
  Warnings:

  - Added the required column `Author` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "Author" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL;
