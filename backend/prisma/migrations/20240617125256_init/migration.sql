-- CreateTable
CREATE TABLE "Mock" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status_code" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "Mock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mock_url_key" ON "Mock"("url");
