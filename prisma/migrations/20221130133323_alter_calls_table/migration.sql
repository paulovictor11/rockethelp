-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_calls" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patrimony" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Em andamento',
    "ownerId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "calls_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_calls" ("code", "createdAt", "description", "id", "ownerId", "patrimony", "updatedAt") SELECT "code", "createdAt", "description", "id", "ownerId", "patrimony", "updatedAt" FROM "calls";
DROP TABLE "calls";
ALTER TABLE "new_calls" RENAME TO "calls";
CREATE UNIQUE INDEX "calls_code_key" ON "calls"("code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
