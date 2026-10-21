"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma/client";
import { getCurrentUser } from "@/features/user/session/server/session.server";
import { editProfileSchema } from "../schema/editProfile.schema";
import { updateProfileService } from "../server/profile.server";
import type { EditProfileResult } from "../types/profile.type";

export async function updateProfileAction(input: unknown): Promise<EditProfileResult> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { status: "unauthorized", message: "برای ویرایش اطلاعات ابتدا وارد حساب کاربری شوید." };
    }

    const parsed = editProfileSchema.safeParse(input);
    if (!parsed.success) {
      return {
        status: "validation-error",
        message: "اطلاعات واردشده معتبر نیست.",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const result = await updateProfileService(user.id, parsed.data);
    if (result.status === "success") {
      revalidatePath("/profile");
      revalidatePath("/profile/edit");
    }
    return result;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { status: "error", message: "این ایمیل یا نام کاربری قبلاً انتخاب شده است. مقدار دیگری وارد کنید." };
    }
    console.error("Failed to update profile:", error);
    return { status: "error", message: "ذخیره اطلاعات با خطا مواجه شد. لطفاً دوباره تلاش کنید." };
  }
}
