import { Router } from 'express';
import { getActivities, getActivitiesDay, registerUserActivity } from '@/controllers';

const activitiesRouter = Router();

activitiesRouter.get('/', getActivities);
activitiesRouter.get('/', getActivitiesDay);
activitiesRouter.post('/register', registerUserActivity);

export { activitiesRouter };
