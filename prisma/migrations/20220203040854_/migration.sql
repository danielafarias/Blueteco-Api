/*
  Warnings:

  - You are about to drop the `_MenuToTable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MenuToTable" DROP CONSTRAINT "_MenuToTable_A_fkey";

-- DropForeignKey
ALTER TABLE "_MenuToTable" DROP CONSTRAINT "_MenuToTable_B_fkey";

-- DropTable
DROP TABLE "_MenuToTable";

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "menuId" INTEGER,
    "tableId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "table"("id") ON DELETE SET NULL ON UPDATE CASCADE;
