import { z } from "zod";

export const newsQuerySchema = z.object({
  pageNumber: z.coerce.number().int().min(1),

  pageSize: z.coerce.number().int().min(1).max(50),
});

export type LatestNewsQuery = z.infer<typeof newsQuerySchema>;
