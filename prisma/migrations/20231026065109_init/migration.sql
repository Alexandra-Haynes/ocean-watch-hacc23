-- CreateTable
CREATE TABLE "EventDetection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "detectionDate" DATETIME NOT NULL,
    "detectionLocation" TEXT NOT NULL,
    "environmentalDamage" TEXT NOT NULL,
    "debrisType" TEXT NOT NULL,
    "debrisApproxSize" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "EventRemovalTempStorage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "removalOrganization" TEXT NOT NULL,
    "removalDate" DATETIME NOT NULL,
    "removalLocation" TEXT NOT NULL,
    "environmentalDamage" TEXT NOT NULL,
    "debrisType" TEXT NOT NULL,
    "debrisSizeMass" TEXT NOT NULL,
    "storageLocation" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MultiEventTransport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shipmentDate" DATETIME NOT NULL,
    "shipmentFromToLocations" TEXT NOT NULL,
    "totalDebrisSizeMass" TEXT NOT NULL,
    "eventID" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "EventSorting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eventID" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "eventMass" TEXT NOT NULL,
    "componentTypes" TEXT NOT NULL,
    "componentMasses" TEXT NOT NULL,
    "componentPolymers" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ComponentDisposing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "disposalMassByComponentTypeAndPolymer" TEXT NOT NULL,
    "disposalDate" DATETIME NOT NULL,
    "disposalMechanism" TEXT NOT NULL
);
