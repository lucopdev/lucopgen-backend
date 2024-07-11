/*
  Warnings:

  - You are about to drop the column `email` on the `Account` table. All the data in the column will be lost.
  - Added the required column `login` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Account_email_key` ON `Account`;

-- AlterTable
ALTER TABLE `Account` DROP COLUMN `email`,
    ADD COLUMN `login` VARCHAR(191) NOT NULL;
