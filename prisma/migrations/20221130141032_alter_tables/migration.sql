/*
  Warnings:

  - A unique constraint covering the columns `[callId]` on the table `solutions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "solutions_callId_key" ON "solutions"("callId");
