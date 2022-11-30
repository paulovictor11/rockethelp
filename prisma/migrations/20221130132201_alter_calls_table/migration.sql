/*
  Warnings:

  - You are about to drop the column `userId` on the `calls` table. All the data in the column will be lost.
  - Added the required column `code` to the `calls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `calls` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_calls" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patrimony" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "calls_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_calls" ("createdAt", "description", "id", "patrimony", "updatedAt") SELECT "createdAt", "description", "id", "patrimony", "updatedAt" FROM "calls";
DROP TABLE "calls";
ALTER TABLE "new_calls" RENAME TO "calls";
CREATE UNIQUE INDEX "calls_code_key" ON "calls"("code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
