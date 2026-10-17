"use server";

import { getCurrentUser } from "@/features/user/session/server/session.server";
import { commentInputSchema } from "../schemas/comment.schema";
import { createNewsCommentService } from "../server/comment.server";
import { CreateCommentActionResult } from "../types/comment.type";

export async function createCommentAction(input: unknown): Promise<CreateCommentActionResult> {
  const parsed = commentInputSchema.safeParse(input);

  if (!parsed.success) {
    return {
      status: "validation-error",
      message: "اطلاعات واردشده معتبر نیستند.",
      errors: parsed.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    };
  }

  try {
    const user = await getCurrentUser();

    if (!user) {
      return {
        status: "unauthorized",
        message: "برای ثبت نظر ابتدا وارد حساب کاربری شوید.",
      };
    }

    const result = await createNewsCommentService({
      ...parsed.data,
      userId: user.id,
    });

    return {
      status: "success",
      message: result.message,
    };
  } catch (error) {
    console.error("Failed to create news comment:", error);

    return {
      status: "error",
      message: "ثبت نظر با خطا مواجه شد. لطفاً دوباره تلاش کنید.",
    };
  }
}
