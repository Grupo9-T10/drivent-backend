import { prisma } from '@/config';

async function findMany() {
  return prisma.activities.findMany();
}

async function findManyDay(day: Date) {
  return prisma.activities.findMany({
    where: {
      day: { equals: day },
    },
    select: {
      name: true,
      day: true,
      duration: true,
      local: true,
      vacanciesCurrent: true,
    },
  });
}

const activitiesRepository = {
  findMany,
  findManyDay,
};

export default activitiesRepository;
