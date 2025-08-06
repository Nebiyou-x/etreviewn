import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const genres = [
  { name: "Drama", slug: "drama" },
  { name: "Comedy", slug: "comedy" },
  { name: "Action", slug: "action" },
  { name: "Romance", slug: "romance" },
  { name: "Thriller", slug: "thriller" },
  { name: "Family", slug: "family" },
  { name: "Biography", slug: "biography" },
  { name: "History", slug: "history" },
  { name: "Crime", slug: "crime" },
  { name: "Epic", slug: "epic" },
  { name: "Legal", slug: "legal" },
  { name: "Coming-of-age", slug: "coming-of-age" },
];

async function main() {
  for (const genre of genres) {
    await prisma.genre.upsert({
      where: { name: genre.name },
      update: {},
      create: genre,
    });
  }
  console.log("Genres seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 