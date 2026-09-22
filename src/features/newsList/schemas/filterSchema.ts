import * as z from "zod";

export const filterSchema = z.object({
  title: z.string().min(5, { error: "حداقل تعداد کاراکتر ۵ عدد است" }).nullable(),
  publishDate: z.date("مقدار وارد شده صحیح نیست .").nullable(),
});

export type filterType = z.infer<typeof filterSchema>;
