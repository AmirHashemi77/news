import * as z from "zod";

export const commentInputSchema = z.object({
  newsId: z.uuid(),

  commentText: z.string().trim().min(1, "متن نظر را وارد کنید.").max(500, "متن نظر نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد."),
});

export type CommentInput = z.infer<typeof commentInputSchema>;
