-- CreateTable
CREATE TABLE "artists" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "grammy" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "tracks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "artistId" TEXT,
    "albumId" TEXT,
    "duration" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" TEXT NOT NULL,
    "artists" TEXT[],
    "albums" TEXT[],
    "tracks" TEXT[]
);

-- CreateIndex
CREATE UNIQUE INDEX "artists_id_key" ON "artists"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tracks_id_key" ON "tracks"("id");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_id_key" ON "favorites"("id");
