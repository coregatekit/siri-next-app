-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "status" VARCHAR(10) NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "total_paid" DOUBLE PRECISION NOT NULL,
    "paid_method" VARCHAR(10) NOT NULL,
    "paid_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);
