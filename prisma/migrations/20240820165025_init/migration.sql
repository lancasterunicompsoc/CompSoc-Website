-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "suVerified" BOOLEAN DEFAULT false,
    "displayName" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "username" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "mazemapLink" TEXT NOT NULL DEFAULT '',
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slides" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "image" TEXT,
    "unixEndTime" INTEGER NOT NULL,
    "unixStartTime" INTEGER NOT NULL,
    "hidden" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Announcement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eventId" INTEGER NOT NULL,
    "reminder" BOOLEAN NOT NULL,
    "released" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timestamp" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_id_username_idx" ON "User"("id", "username");

-- CreateIndex
CREATE UNIQUE INDEX "Announcement_eventId_key" ON "Announcement"("eventId");

-- CreateIndex
CREATE INDEX "Review_eventId_idx" ON "Review"("eventId");

-- CreateIndex
CREATE INDEX "Review_userId_idx" ON "Review"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_eventId_userId_key" ON "Review"("eventId", "userId");
