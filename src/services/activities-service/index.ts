import { notFoundError } from '@/errors';
import activitiesRepository from '@/repositories/activities-repository';

async function getActivitiesService() {
  const activitie = await activitiesRepository.findMany();
  if (!activitie) throw notFoundError();

  return activitie;
}

async function getActivitiesDayService(day: Date) {
  const activitie = await activitiesRepository.findManyDay(day);
  if (!activitie) throw notFoundError();

  return activitie;
}

async function checkConflictTimeService(activitieId: number, userId: number) {
  return await activitiesRepository.checkConflictTime(activitieId, userId);
}

async function registerUserActivityService(activitieId: number, userId: number) {
  if (checkConflictTimeService) {
    return await activitiesRepository.registerUserActivity(activitieId, userId);
  } else {
    return 'Time conflict with another activity.';
  }
}

const activitiesService = {
  getActivitiesService,
  getActivitiesDayService,
  registerUserActivityService,
};

export default activitiesService;
