import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
}

async function create(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
}

async function findById(id:number){
  return prisma.user.findFirst({
    where:{id},
    select:{email:true}
  })
}

const userRepository = {
  findByEmail,
  create,
  findById,
};

export default userRepository;
