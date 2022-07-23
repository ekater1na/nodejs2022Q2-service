/*
  Warnings:

  - You are about to drop the column `albums` on the `favorites` table. All the data in the column will be lost.
  - You are about to drop the column `artists` on the `favorites` table. All the data in the column will be lost.
  - You are about to drop the column `tracks` on the `favorites` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "albums" ADD COLUMN     "favoritesId" TEXT;

-- AlterTable
ALTER TABLE "artists" ADD COLUMN     "favoritesId" TEXT;

-- AlterTable
ALTER TABLE "favorites" DROP COLUMN "albums",
DROP COLUMN "artists",
DROP COLUMN "tracks";

-- AlterTable
ALTER TABLE "tracks" ADD COLUMN     "favoritesId" TEXT;

-- AddForeignKey
ALTER TABLE "artists" ADD CONSTRAINT "artists_favoritesId_fkey" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "albums" ADD CONSTRAINT "albums_favoritesId_fkey" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_favoritesId_fkey" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
