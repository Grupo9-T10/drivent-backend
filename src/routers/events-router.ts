import { Router } from 'express';
import { getDefaultEvent, getEvents } from '@/controllers';

const eventsRouter = Router();

eventsRouter.get('/', getEvents);

export { eventsRouter };
