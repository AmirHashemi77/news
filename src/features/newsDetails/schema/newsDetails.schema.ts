import * as z from "zod";

export const newsDetailsSchema = z.object({
  newsId: z.uuid(),
});

export type NewsDetailsType = z.infer<typeof newsDetailsSchema>;
