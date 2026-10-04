import { fetchTasnimNewsLinks, fetchTasnimArticleDetails } from "../adapters/tasnim.adapter";
import { NewsSource } from "../types/ingestNewsType";

export const newsSources = [
  {
    name: "Tasnim",

    fetchNewsLinks: fetchTasnimNewsLinks,

    fetchArticleDetails: fetchTasnimArticleDetails,
  },
] satisfies NewsSource[];
