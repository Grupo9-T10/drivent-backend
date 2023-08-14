import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

async function cleanDatabase() {
  await prisma.activities.deleteMany({});
  await prisma.room.deleteMany({});
  await prisma.hotel.deleteMany({});
  await prisma.event.deleteMany({});
}

async function main() {
  await cleanDatabase();

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

  let hotel1 = await prisma.hotel.findFirst({ where: { id: 1 } });
  if (!hotel1) {
    hotel1 = await prisma.hotel.create({
      data: {
        id: 1,
        name: 'Hotel 1',
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  let hotel2 = await prisma.hotel.findFirst({ where: { id: 2 } });
  if (!hotel2) {
    hotel2 = await prisma.hotel.create({
      data: {
        id: 2,
        name: 'Hotel 2',
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  let room1 = await prisma.room.findFirst({ where: { id: 1 } });
  if (!room1) {
    room1 = await prisma.room.create({
      data: {
        id: 1,
        name: 'Room 1',
        capacity: 3,
        hotelId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  let room2 = await prisma.room.findFirst({ where: { id: 2 } });
  if (!room2) {
    room2 = await prisma.room.create({
      data: {
        id: 2,
        name: 'Room 2',
        capacity: 2,
        hotelId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  let room3 = await prisma.room.findFirst({ where: { id: 3 } });
  if (!room3) {
    room3 = await prisma.room.create({
      data: {
        id: 3,
        name: 'Room 3',
        capacity: 2,
        hotelId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  let room4 = await prisma.room.findFirst({ where: { id: 4 } });
  if (!room4) {
    room4 = await prisma.room.create({
      data: {
        id: 4,
        name: 'Room 1',
        capacity: 3,
        hotelId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  let room5 = await prisma.room.findFirst({ where: { id: 5 } });
  if (!room5) {
    room5 = await prisma.room.create({
      data: {
        id: 5,
        name: 'Room 2',
        capacity: 2,
        hotelId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  let room6 = await prisma.room.findFirst({ where: { id: 6 } });
  if (!room6) {
    room6 = await prisma.room.create({
      data: {
        id: 6,
        name: 'Room 3',
        capacity: 2,
        hotelId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  let activities1 = await prisma.activities.findFirst({ where: { id: 1 } });
  if (!activities1) {
    activities1 = await prisma.activities.create({
      data: {
        name: 'Minecraft: montando o PC ideal',
        day: new Date('2023-08-16'),
        startTime: new Date('2023-08-16T09:00:00.000Z'),
        duration: 60,
        vacanciesTotal: 30,
        vacanciesCurrent: 8,
        local: 'Sala de Workshop',
      },
    });
  }

  let activities2 = await prisma.activities.findFirst({ where: { id: 2 } });
  if (!activities2) {
    activities2 = await prisma.activities.create({
      data: {
        name: 'Primeiros passos na programação',
        day: new Date('2023-08-16'),
        startTime: new Date('2023-08-16T11:00:00.000Z'),
        duration: 120,
        vacanciesTotal: 20,
        vacanciesCurrent: 10,
        local: 'Auditório Principal',
      },
    });
  }

  let activities3 = await prisma.activities.findFirst({ where: { id: 3 } });
  if (!activities3) {
    activities3 = await prisma.activities.create({
      data: {
        name: 'Palestra Sobre Prism 5.0',
        day: new Date('2023-08-17'),
        startTime: new Date('2023-08-17T10:00:00.000Z'),
        duration: 90,
        vacanciesTotal: 15,
        vacanciesCurrent: 5,
        local: 'Auditório Lateral',
      },
    });
  }

  let activities4 = await prisma.activities.findFirst({ where: { id: 4 } });
  if (!activities4) {
    activities4 = await prisma.activities.create({
      data: {
        name: 'Aprendendo TypeScript',
        day: new Date('2023-08-17'),
        startTime: new Date('2023-08-17T11:00:00.000Z'),
        duration: 120,
        vacanciesTotal: 25,
        vacanciesCurrent: 0,
        local: 'Auditório Principal',
      },
    });
  }

  let activities5 = await prisma.activities.findFirst({ where: { id: 5 } });
  if (!activities5) {
    activities5 = await prisma.activities.create({
      data: {
        name: 'Criação de jogos',
        day: new Date('2023-08-18'),
        startTime: new Date('2023-08-18T09:00:00.000Z'),
        duration: 120,
        vacanciesTotal: 35,
        vacanciesCurrent: 15,
        local: 'Sala de Workshop',
      },
    });
  }

  let activities6 = await prisma.activities.findFirst({ where: { id: 6 } });
  if (!activities6) {
    activities6 = await prisma.activities.create({
      data: {
        name: 'Programação Web',
        day: new Date('2023-08-18'),
        startTime: new Date('2023-08-18T10:00:00.000Z'),
        duration: 90,
        vacanciesTotal: 50,
        vacanciesCurrent: 5,
        local: 'Auditório Principal',
      },
    });
  }

  console.log({
    event,
    hotel1,
    hotel2,
    room1,
    room2,
    room3,
    room4,
    room5,
    room6,
    activities1,
    activities2,
    activities3,
    activities4,
    activities5,
    activities6,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
