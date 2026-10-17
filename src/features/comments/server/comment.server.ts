import "server-only";
import { createNewsComment } from "../repository/comment.repository";
import { CommentInput } from "../schemas/comment.schema";

interface CreateNewsCommentServiceInput extends CommentInput {
  userId: string;
}

export async function createNewsCommentService(input: CreateNewsCommentServiceInput) {
  const result = await createNewsComment(input);

  return {
    status: "success" as const,
    message: "نظر شما با موفقیت ثبت شد.",
    data: result,
  };
}
