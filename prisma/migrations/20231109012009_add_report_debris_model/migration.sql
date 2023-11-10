-- CreateTable
CREATE TABLE "ReportDebris" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "location" TEXT,
    "date" TEXT,
    "debrisType" TEXT,
    "ContainerStatus" TEXT,
    "biofouling" TEXT,
    "description" TEXT,
    "island" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "captcha" TEXT
);
