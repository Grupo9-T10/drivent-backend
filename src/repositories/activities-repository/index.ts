import { prisma } from '@/config';

async function findMany() {
  return prisma.event.findMany();
}

const activitiesRepository = {
  findMany,
};

export default activitiesRepository;
