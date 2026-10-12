import * as z from "zod";

export const filterSchema = z.object({
  // title: z.string().min(5, { error: "حداقل تعداد کاراکتر ۵ عدد است" }).optional().nullable(),
  title: z.string().optional().nullable(),
  fromDate: z.date("مقدار وارد شده صحیح نیست .").optional().nullable(),
  toDate: z.date("مقدار وارد شده صحیح نیست .").optional().nullable(),
});

export type filterType = z.infer<typeof filterSchema>;
