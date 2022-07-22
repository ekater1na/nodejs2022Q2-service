-- CreateTable
CREATE TABLE "albums" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "artistId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "albums_id_key" ON "albums"("id");
