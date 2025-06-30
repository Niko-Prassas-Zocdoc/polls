import { PrismaClient, Prisma } from './generated/client';

const prisma = new PrismaClient();

const pollData: Prisma.PollCreateInput[] = [
  {
    title: 'What is your favorite color?',
    question: 'What is your favorite color?',
    options: {
      create: [
        { text: 'Red' },
        { text: 'Blue' },
        { text: 'Green' },
        { text: 'Yellow' },
      ],
    },
  },
];

async function main() {
  console.log('Seeding database...');
  for (const poll of pollData) {
    await prisma.poll.create({ data: poll });
  }
  console.log('Database seeded successfully');
}

main();