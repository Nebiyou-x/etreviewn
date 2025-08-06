/*
  Warnings:

  - You are about to drop the column `slug` on the `Genre` table. All the data in the column will be lost.
  - You are about to drop the column `backdrop` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `imdbId` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `letterboxdId` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `originalTitle` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `trailerUrl` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Actor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ActorMovie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Director` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DirectorMovie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrendingMovie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ActorMovie" DROP CONSTRAINT "ActorMovie_actorId_fkey";

-- DropForeignKey
ALTER TABLE "ActorMovie" DROP CONSTRAINT "ActorMovie_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "DirectorMovie" DROP CONSTRAINT "DirectorMovie_directorId_fkey";

-- DropForeignKey
ALTER TABLE "DirectorMovie" DROP CONSTRAINT "DirectorMovie_movieId_fkey";

-- DropForeignKey
ALTER TABLE "TrendingMovie" DROP CONSTRAINT "TrendingMovie_movieId_fkey";

-- DropIndex
DROP INDEX "Genre_slug_key";

-- DropIndex
DROP INDEX "Rating_movieId_idx";

-- DropIndex
DROP INDEX "Review_authorId_idx";

-- DropIndex
DROP INDEX "Review_movieId_idx";

-- AlterTable
ALTER TABLE "Genre" DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "backdrop",
DROP COLUMN "duration",
DROP COLUMN "imdbId",
DROP COLUMN "letterboxdId",
DROP COLUMN "originalTitle",
DROP COLUMN "trailerUrl";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified";

-- DropTable
DROP TABLE "Actor";

-- DropTable
DROP TABLE "ActorMovie";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Director";

-- DropTable
DROP TABLE "DirectorMovie";

-- DropTable
DROP TABLE "TrendingMovie";
