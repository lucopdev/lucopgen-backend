/*
  Warnings:

  - Added the required column `ownerId` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Account` ADD COLUMN `ownerId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
