import { Gender } from "@/generated/prisma/enums";

export type CreateUserInput = {
  firstName: string;
  lastName: string;
  userName: string;
  phoneNumber: string;
  email: string;
  gender: Gender;
  passwordHash: string;
};
