import { z } from "zod";

export const newsQuerySchema = z.object({
  pageNumber: z.coerce.number().int().min(1),

  pageSize: z.coerce.number().int().min(1).max(50),
  title: z.string().trim().min(1).max(200).optional(),

  fromDate: z.coerce.date().optional(),
  toDate: z.coerce.date().optional(),
});

export type NewsQuery = z.infer<typeof newsQuerySchema>;
