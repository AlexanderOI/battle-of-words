-- CreateTable
CREATE TABLE "Words" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "word" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Words_word_key" ON "Words"("word");
