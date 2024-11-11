-- CreateTable
CREATE TABLE "Slides" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "speaker" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "link" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "eventId" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "Slides_eventId_key" ON "Slides"("eventId");

-- CreateIndex
CREATE INDEX "Slides_eventId_idx" ON "Slides"("eventId");
