import activitiesService from "@/services/activities-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getActivities(req: Request, res: Response) {
  try {
    const activities = await activitiesService.getActivitiesService();
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function getActivitiesDay(req: Request, res: Response) {
  try {
    const date = req.query.date;

    const day = new Date(date as string);

    const activities = await activitiesService.getActivitiesDayService(day);
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function registerUserActivity(req: Request, res: Response) {
  try {
    const activitieId = req.body;
    const userId = req.body;

    const activities = await activitiesService.registerUserActivityService(activitieId, userId);
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function getUserActivities(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.id);

    const user = await activitiesService.getUserActivitiesService(userId);
    return res.status(200).json(user.activities);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
