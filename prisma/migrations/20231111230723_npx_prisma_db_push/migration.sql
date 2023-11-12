/*
  Warnings:

  - You are about to drop the column `location` on the `ReportDebris` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReportDebris" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT,
    "latitude" TEXT,
    "longitude" TEXT,
    "date" TEXT,
    "debrisType" TEXT,
    "containerStatus" TEXT,
    "biofouling" TEXT,
    "description" TEXT,
    "island" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "captcha" TEXT,
    "status" TEXT,
    "removalCompany" TEXT
);
INSERT INTO "new_ReportDebris" ("biofouling", "captcha", "containerStatus", "date", "debrisType", "description", "email", "id", "island", "phone", "removalCompany", "status") SELECT "biofouling", "captcha", "containerStatus", "date", "debrisType", "description", "email", "id", "island", "phone", "removalCompany", "status" FROM "ReportDebris";
DROP TABLE "ReportDebris";
ALTER TABLE "new_ReportDebris" RENAME TO "ReportDebris";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
