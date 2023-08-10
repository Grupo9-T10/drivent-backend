import { notFoundError } from '@/errors';
import eventRepository from '@/repositories/event-repository';
import { exclude } from '@/utils/prisma-utils';
import { Event } from '@prisma/client';
import dayjs from 'dayjs';
import redisRepository from '../../repositories/redis-repository';

async function getFirstEvent(): Promise<GetFirstEventResult> {
  const cacheKey = 'defaultEvent';
  const cachedEvent = await redisRepository.getRedis(cacheKey);
  if (cachedEvent) {
    const parsedEvent: Event = JSON.parse(cachedEvent);
    return exclude(parsedEvent, 'createdAt', 'updatedAt');
  }
  const event = await eventRepository.findFirst();
  if (!event) throw notFoundError();
  await redisRepository.setRedis(cacheKey, JSON.stringify(event));

  return exclude(event, 'createdAt', 'updatedAt');
}

async function getEvents() {
  const events = await eventRepository.findMany();
  if (!events) throw notFoundError();

  return exclude(events);
}

export type GetFirstEventResult = Omit<Event, 'createdAt' | 'updatedAt'>;

async function isCurrentEventActive(): Promise<boolean> {
  const event = await eventRepository.findFirst();
  if (!event) return false;

  const now = dayjs();
  const eventStartsAt = dayjs(event.startsAt);
  const eventEndsAt = dayjs(event.endsAt);

  return now.isAfter(eventStartsAt) && now.isBefore(eventEndsAt);
}

const eventsService = {
  getFirstEvent,
  getEvents,
  isCurrentEventActive,
};

export default eventsService;
