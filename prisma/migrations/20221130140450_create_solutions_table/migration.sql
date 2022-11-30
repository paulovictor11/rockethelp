-- CreateTable
CREATE TABLE "solutions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "callId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "solutions_callId_fkey" FOREIGN KEY ("callId") REFERENCES "calls" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
