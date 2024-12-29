/*
  Warnings:

  - A unique constraint covering the columns `[sprintId,issueId]` on the table `SprintTask` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SprintTask_sprintId_issueId_key" ON "SprintTask"("sprintId", "issueId");
