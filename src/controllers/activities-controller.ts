import activitiesService from '@/services/activities-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getActivities(req: Request, res: Response) {
  try {
    const events = await activitiesService.getActivitiesService();
    return res.status(httpStatus.OK).send(events);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function getActivitiesDay(req: Request, res: Response) {
  try {
    const day = req.body;

    const events = await activitiesService.getActivitiesDayService(day);
    return res.status(httpStatus.OK).send(events);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}
