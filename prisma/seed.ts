import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
  }

  let activities1 = await prisma.activities.findFirst();
  if (!activities1) {
    activities1 = await prisma.activities.create({
      data: {
        name: 'Minecraft: montando o PC ideal',
        day: new Date('2023-08-16T09:00:00.000Z'),
        duration: 60,
        vacanciesTotal: 20,
        vacanciesCurrent: 10,
        local: 'Sala de Workshop',
      },
    });
  }

  let activities2 = await prisma.activities.findFirst();
  if (!activities2) {
    activities2 = await prisma.activities.create({
      data: {
        name: 'Palestra Sobre Prism 5.0',
        day: new Date('2023-08-17T10:00:00.000Z'),
        duration: 90,
        vacanciesTotal: 15,
        vacanciesCurrent: 5,
        local: 'Auditório Lateral',
      },
    });
  }

  let activities3 = await prisma.activities.findFirst();
  if (!activities3) {
    activities3 = await prisma.activities.create({
      data: {
        name: 'Aprendendo TypeScript',
        day: new Date('2023-08-17T11:00:00.000Z'),
        duration: 120,
        vacanciesTotal: 25,
        vacanciesCurrent: 0,
        local: 'Auditório Principal',
      },
    });
  }

  console.log({ event, activities1, activities2, activities3 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
