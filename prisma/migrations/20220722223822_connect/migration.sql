/*
  Warnings:

  - You are about to drop the column `favoritesId` on the `albums` table. All the data in the column will be lost.
  - You are about to drop the column `favoritesId` on the `artists` table. All the data in the column will be lost.
  - You are about to drop the column `favoritesId` on the `tracks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "albums" DROP CONSTRAINT "albums_favoritesId_fkey";

-- DropForeignKey
ALTER TABLE "artists" DROP CONSTRAINT "artists_favoritesId_fkey";

-- DropForeignKey
ALTER TABLE "tracks" DROP CONSTRAINT "tracks_favoritesId_fkey";

-- AlterTable
ALTER TABLE "albums" DROP COLUMN "favoritesId";

-- AlterTable
ALTER TABLE "artists" DROP COLUMN "favoritesId";

-- AlterTable
ALTER TABLE "favorites" ADD COLUMN     "albums" TEXT[],
ADD COLUMN     "artists" TEXT[],
ADD COLUMN     "tracks" TEXT[];

-- AlterTable
ALTER TABLE "tracks" DROP COLUMN "favoritesId";
