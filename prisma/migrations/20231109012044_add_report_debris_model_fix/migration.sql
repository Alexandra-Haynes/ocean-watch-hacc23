/*
  Warnings:

  - You are about to drop the column `ContainerStatus` on the `ReportDebris` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReportDebris" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "location" TEXT,
    "date" TEXT,
    "debrisType" TEXT,
    "containerStatus" TEXT,
    "biofouling" TEXT,
    "description" TEXT,
    "island" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "captcha" TEXT
);
INSERT INTO "new_ReportDebris" ("biofouling", "captcha", "date", "debrisType", "description", "email", "id", "island", "location", "phone") SELECT "biofouling", "captcha", "date", "debrisType", "description", "email", "id", "island", "location", "phone" FROM "ReportDebris";
DROP TABLE "ReportDebris";
ALTER TABLE "new_ReportDebris" RENAME TO "ReportDebris";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
