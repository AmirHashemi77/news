import { prisma } from "@/shared/lib/prisma";

type createSessionInput = {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
};

export async function createSessionRecord(input: createSessionInput) {
  return prisma.session.create({
    data: input,
    select: {
      id: true,
      expiresAt: true,
    },
  });
}

export async function findSessionByTokenHash(token: string) {
  return prisma.session.findUnique({
    where: {
      tokenHash: token,
    },
    select: {
      expiresAt: true,
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          userName: true,
          email: true,
        },
      },
    },
  });
}

export async function deleteSessionByTokenHash(token: string) {
  return prisma.session.deleteMany({
    where: {
      tokenHash: token,
    },
  });
}
