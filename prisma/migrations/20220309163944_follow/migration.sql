/*
  Warnings:

  - A unique constraint covering the columns `[followerId]` on the table `Follows` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[followingId]` on the table `Follows` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Follows_followerId_key" ON "Follows"("followerId");

-- CreateIndex
CREATE UNIQUE INDEX "Follows_followingId_key" ON "Follows"("followingId");
