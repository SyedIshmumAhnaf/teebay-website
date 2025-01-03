const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: 'ELECTRONICS' },
    { name: 'FURNITURE' },
    { name: 'HOME APPLIANCES' },
    { name: 'SPORTING GOODS' },
    { name: 'OUTDOOR' },
    { name: 'TOYS' },
  ];

  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }
  console.log('Categories seeded successfully!');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });