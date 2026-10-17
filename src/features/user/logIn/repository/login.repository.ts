import { prisma } from "@/shared/lib/prisma";

export async function loginUser(identifier: string) {
  return prisma.user.findFirst({
    where: {
      OR: [{ email: identifier }, { userName: identifier }, { phoneNumber: identifier }],
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      userName: true,
      email: true,
      phoneNumber: true,
      passwordHash: true,
    },
  });
}
