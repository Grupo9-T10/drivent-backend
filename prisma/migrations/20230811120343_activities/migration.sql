-- CreateTable
CREATE TABLE "Activities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "day" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "vacanciesTotal" INTEGER NOT NULL,
    "vacanciesCurrent" INTEGER NOT NULL,
    "local" TEXT NOT NULL,

    CONSTRAINT "Activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ActivitiesUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ActivitiesUsers_AB_unique" ON "_ActivitiesUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivitiesUsers_B_index" ON "_ActivitiesUsers"("B");

-- AddForeignKey
ALTER TABLE "_ActivitiesUsers" ADD CONSTRAINT "_ActivitiesUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivitiesUsers" ADD CONSTRAINT "_ActivitiesUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
