import { z } from "zod";

export const SEARCH_MIN_LENGTH = 4;
export const SEARCH_MAX_LENGTH = 200;

export const searchTextSchema = z.string({ message: "متن جستجو را وارد کنید." }).trim()
  .min(SEARCH_MIN_LENGTH, `متن جستجو باید حداقل ${SEARCH_MIN_LENGTH} کاراکتر باشد.`)
  .max(SEARCH_MAX_LENGTH, `متن جستجو نباید بیشتر از ${SEARCH_MAX_LENGTH} کاراکتر باشد.`);

export const searchQuerySchema = z.object({
  searchText: searchTextSchema,
  pageNumber: z.coerce.number().int().min(1).max(1_000_000).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(10),
});

export type SearchQuery = z.infer<typeof searchQuerySchema>;
export type SearchQueryInput = z.input<typeof searchQuerySchema>;
