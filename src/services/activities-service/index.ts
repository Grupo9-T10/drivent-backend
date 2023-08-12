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
  const isConflict = await checkConflictTimeService(activitieId, userId);

  if (isConflict) {
    return 'Time conflict with another activity.';
  } else {
    return await activitiesRepository.registerUserActivity(activitieId, userId);
  }
}

async function getUserActivitiesService(userId: number) {
  const user = await activitiesRepository.userActivities(userId);
  if (!user) throw notFoundError();

  return user;
}

const activitiesService = {
  getActivitiesService,
  getActivitiesDayService,
  registerUserActivityService,
  getUserActivitiesService,
};

export default activitiesService;
