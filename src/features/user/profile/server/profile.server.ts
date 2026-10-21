import { findProfileConflicts, getUserComments, updateProfile, userNewsSaved, userNewsView } from "../repository/profile.repository";
import { UserViewListInput } from "../types/profile.type";
import type { EditProfileErrors, EditProfileResult } from "../types/profile.type";
import type { EditProfileInput } from "../schema/editProfile.schema";

export async function updateProfileService(userId: string, input: EditProfileInput): Promise<EditProfileResult> {
  const conflicts = await findProfileConflicts(userId, input);
  const errors: EditProfileErrors = {};

  if (conflicts.some((user) => user.email === input.email)) {
    errors.email = ["با این ایمیل حساب کاربری ثبت شده است."];
  }
  if (conflicts.some((user) => user.userName === input.userName)) {
    errors.userName = ["این نام کاربری قبلاً انتخاب شده است."];
  }
  if (Object.keys(errors).length > 0) {
    return { status: "validation-error", message: "ایمیل یا نام کاربری دیگری انتخاب کنید.", errors };
  }

  const data = await updateProfile(userId, input);
  return { status: "success", message: "اطلاعات پروفایل با موفقیت ذخیره شد.", data };
}

export async function userNewsViewServices({ userId, pageSize, pageNumber }: UserViewListInput) {
  const result = await userNewsView({ userId, pageSize, pageNumber });

  return {
    status: "success" as const,
    data: {
      category: null,
      pagination: {
        pageNumber: pageNumber,
        pageSize: pageSize,
        totalCount: result.totalCount,
        totalPages: Math.ceil(result.totalCount / pageSize),
      },
      newsList: result.newsList,
    },
  };
}
export async function userNewsSavedServices({ userId, pageSize, pageNumber }: UserViewListInput) {
  const result = await userNewsSaved({ userId, pageSize, pageNumber });

  return {
    status: "success" as const,
    data: {
      category: null,
      pagination: {
        pageNumber: pageNumber,
        pageSize: pageSize,
        totalCount: result.totalCount,
        totalPages: Math.ceil(result.totalCount / pageSize),
      },
      newsList: result.newsList,
    },
  };
}

export async function getUserCommentsServices({ userId, pageSize, pageNumber }: UserViewListInput) {
  const result = await getUserComments({ userId, pageSize, pageNumber });

  return {
    status: "success" as const,
    data: {
      pagination: {
        pageNumber: pageNumber,
        pageSize: pageSize,
        totalCount: result.totalCount,
        totalPages: Math.ceil(result.totalCount / pageSize),
      },
      commentsList: result.commentsList,
    },
  };
}
