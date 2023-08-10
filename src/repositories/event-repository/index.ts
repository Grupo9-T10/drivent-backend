import { prisma } from '@/config';

async function findFirst() {
  return prisma.event.findFirst();
}

async function findMany() {
  return prisma.event.findMany();
}

const eventRepository = {
  findFirst,
  findMany,
};

export default eventRepository;
