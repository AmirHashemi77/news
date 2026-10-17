import { prisma } from "@/shared/lib/prisma";
import { CreateUserInput } from "../types/signup.type";

export async function signupUser(input: CreateUserInput) {
  return prisma.user.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      gender: input.gender,
      passwordHash: input.passwordHash,
      phoneNumber: input.phoneNumber,
      userName: input.userName,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      gender: true,
      phoneNumber: true,
      email: true,
      userName: true,
    },
  });
}

export async function findUserByUniqueFields(input: { email: string; userName: string; phoneNumber: string }) {
  return prisma.user.findFirst({
    where: {
      OR: [
        {
          email: input.email,
        },
        {
          userName: input.userName,
        },
        {
          phoneNumber: input.phoneNumber,
        },
      ],
    },
    select: {
      id: true,
      phoneNumber: true,
      userName: true,
      email: true,
    },
  });
}
