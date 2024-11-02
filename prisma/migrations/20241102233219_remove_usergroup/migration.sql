/*
  Warnings:

  - You are about to drop the `userGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "userGroup" DROP CONSTRAINT "userGroup_groupId_fkey";

-- DropForeignKey
ALTER TABLE "userGroup" DROP CONSTRAINT "userGroup_userId_fkey";

-- AlterTable
ALTER TABLE "message" ALTER COLUMN "timestamp" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "userGroup";

-- CreateTable
CREATE TABLE "_groupTouser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_groupTouser_AB_unique" ON "_groupTouser"("A", "B");

-- CreateIndex
CREATE INDEX "_groupTouser_B_index" ON "_groupTouser"("B");

-- AddForeignKey
ALTER TABLE "_groupTouser" ADD CONSTRAINT "_groupTouser_A_fkey" FOREIGN KEY ("A") REFERENCES "group"("groupId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_groupTouser" ADD CONSTRAINT "_groupTouser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
