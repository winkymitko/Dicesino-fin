-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "cryptoWallet" TEXT,
    "realBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "virtualBalance" DOUBLE PRECISION NOT NULL DEFAULT 1000,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "winChanceModifier" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "totalInvested" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalGames" INTEGER NOT NULL DEFAULT 0,
    "totalWins" INTEGER NOT NULL DEFAULT 0,
    "totalLosses" INTEGER NOT NULL DEFAULT 0,
    "currentWinStreak" INTEGER NOT NULL DEFAULT 0,
    "maxWinStreak" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."games" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gameType" TEXT NOT NULL,
    "stake" DOUBLE PRECISION NOT NULL,
    "totalPot" DOUBLE PRECISION NOT NULL,
    "finalPot" DOUBLE PRECISION,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."game_rounds" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roundNumber" INTEGER NOT NULL,
    "dice1" INTEGER NOT NULL,
    "dice2" INTEGER NOT NULL,
    "dice3" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "multiplier" DOUBLE PRECISION NOT NULL,
    "potBefore" DOUBLE PRECISION NOT NULL,
    "potAfter" DOUBLE PRECISION NOT NULL,
    "serverSeed" TEXT NOT NULL,
    "clientSeed" TEXT NOT NULL,
    "nonce" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "game_rounds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."bonuses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bonuses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."games" ADD CONSTRAINT "games_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."game_rounds" ADD CONSTRAINT "game_rounds_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "public"."games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."game_rounds" ADD CONSTRAINT "game_rounds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bonuses" ADD CONSTRAINT "bonuses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
