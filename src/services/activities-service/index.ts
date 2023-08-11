import { notFoundError } from '@/errors';
import activitiesRepository from '@/repositories/activities-repository';

async function getActivitiesService() {
  const activitie = await activitiesRepository.findMany();
  if (!activitie) throw notFoundError();

  return activitie;
}

const activitiesService = {
    getActivitiesService,
};

export default activitiesService;
