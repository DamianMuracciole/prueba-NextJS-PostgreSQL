-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "firstname" VARCHAR(100) NOT NULL,
    "lastname" VARCHAR(100) NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "email" VARCHAR(45) NOT NULL,
    "company" VARCHAR(45) NOT NULL,
    "password" VARCHAR(200) NOT NULL,
    "avatar" VARCHAR(200) NOT NULL,
    "newsletter" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(250) NOT NULL,
    "hiddendescription" BOOLEAN NOT NULL,
    "price" DECIMAL(16,2) NOT NULL,
    "hiddenprice" BOOLEAN NOT NULL,
    "hiddenproduct" BOOLEAN NOT NULL,
    "urlImage" VARCHAR(200) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
