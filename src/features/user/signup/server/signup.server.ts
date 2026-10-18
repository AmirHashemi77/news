import { CreateUserInput } from "../types/signup.type";
import { findUserByUniqueFields, signupUser } from "../repository/signup.repository";
import bcrypt from "bcryptjs";

export async function signupUserServices(input: Omit<CreateUserInput, "passwordHash"> & { password: string }) {
  const existingUser = await findUserByUniqueFields({
    email: input.email,
    phoneNumber: input.phoneNumber,
    userName: input.userName,
  });

  if (existingUser) {
    if (existingUser.email === input.email) {
      return {
        status: "email-already-exists",
        message: "با این ایمیل حساب کاربری ثبت شده است",
      } as const;
    }
    if (existingUser.phoneNumber === input.phoneNumber) {
      return {
        status: "phone-number-already-exists",
        message: "با این شماره موبایل حساب کاربری ثبت شده است",
      } as const;
    }
    if (existingUser.userName === input.userName) {
      return {
        status: "username-already-exists",
        message: "این نام کاربری قبلا انتخاب شده است .",
      } as const;
    }
  }
  const passwordHash = await bcrypt.hash(input.password, 12);

  const user = await signupUser({
    firstName: input.firstName,
    lastName: input.lastName,
    userName: input.userName,
    email: input.email,
    phoneNumber: input.phoneNumber,
    gender: input.gender,
    passwordHash,
  });

  return {
    status: "success",
    data: user,
  };
}
