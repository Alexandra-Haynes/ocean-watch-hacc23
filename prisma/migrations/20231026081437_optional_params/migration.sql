-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EventDetection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "detectionDate" TEXT,
    "detectionLocation" TEXT,
    "environmentalDamage" TEXT,
    "debrisType" TEXT,
    "debrisApproxSize" TEXT
);
INSERT INTO "new_EventDetection" ("debrisApproxSize", "debrisType", "detectionDate", "detectionLocation", "environmentalDamage", "id") SELECT "debrisApproxSize", "debrisType", "detectionDate", "detectionLocation", "environmentalDamage", "id" FROM "EventDetection";
DROP TABLE "EventDetection";
ALTER TABLE "new_EventDetection" RENAME TO "EventDetection";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
