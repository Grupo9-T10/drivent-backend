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

async function checkConflictTime(activitieId: number, userId: number) {
  const activitie = await prisma.activities.findUnique({
    where: { id: activitieId },
    select: {
      day: true,
      duration: true,
    },
  });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      activities: {
        where: {
          day: {
            gte: activitie.day,
            lt: new Date(activitie.day.getTime() + activitie.duration * 60000),
          },
        },
        select: {
          day: true,
        },
      },
    },
  });

  if (user.activities.length > 0) {
    return true;
  }
  return false;
}

async function registerUserActivity(activitieId: number, userId: number) {
  const activitie = await prisma.activities.findUnique({
    where: { id: activitieId },
  });

  if (activitie.vacanciesCurrent > 0) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        activities: {
          connect: { id: activitieId },
        },
      },
    });

    await prisma.activities.update({
      where: { id: activitieId },
      data: {
        vacanciesCurrent: {
          decrement: 1,
        },
      },
    });

    return 'Registration completed successfully!';
  } else {
    return 'Cadastro realizado com sucesso!';
  }
}

async function userActivities(userId: number) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      activities: true,
    },
  });
}

const activitiesRepository = {
  findMany,
  findManyDay,
  checkConflictTime,
  registerUserActivity,
  userActivities,
};

export default activitiesRepository;
