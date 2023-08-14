import { Router } from 'express';
import { getActivities, getActivitiesDay, getUserActivities, registerUserActivity } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const activitiesRouter = Router();

activitiesRouter
  .all('/*', authenticateToken)
  .get('/', getActivities)
  .get('/user/:id', getUserActivities)
  .get('/day', getActivitiesDay)
  .post('/register', registerUserActivity);

export { activitiesRouter };
