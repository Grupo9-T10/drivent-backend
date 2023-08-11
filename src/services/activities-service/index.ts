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

const activitiesService = {
  getActivitiesService,
  getActivitiesDayService,
};

export default activitiesService;
