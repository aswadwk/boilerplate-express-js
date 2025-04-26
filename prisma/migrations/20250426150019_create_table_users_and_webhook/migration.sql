-- CreateTable
CREATE TABLE "users" (
    "id" VARCHAR(100) NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "deleted_at" TIMESTAMP(6),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "webhooks" (
    "id" VARCHAR(100) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "response_json" JSONB NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "webhooks_pkey" PRIMARY KEY ("id")
);
