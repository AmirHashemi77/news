import { prisma } from "@/shared/lib/prisma";
import { CommentInput } from "../schemas/comment.schema";

export async function createNewsComment(input: CommentInput & { userId: string }) {
  return prisma.comment.create({
    data: {
      commentText: input.commentText,
      news: {
        connect: {
          id: input.newsId,
        },
      },
      author: {
        connect: {
          id: input.userId,
        },
      },
    },
    select: {
      id: true,
      commentText: true,
      createdAt: true,
      author: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
}
