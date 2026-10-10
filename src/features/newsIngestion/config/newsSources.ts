import { fetchHamshahriArticleDetails, fetchHamshahriNewsLinks } from "../adapters/hamshahri.adaptor";
import { fetchMehrArticleDetails, fetchMehrNewsLinks } from "../adapters/mehr.adaptor";
import { fetchTasnimArticleDetails, fetchTasnimNewsLinks } from "../adapters/tasnim.adapter";
import { fetchVarzesh3ArticleDetails, fetchVarzesh3NewsLinks } from "../adapters/varzesh3.adaptor";
import { NewsSource } from "../types/ingestNewsType";

export const newsSources = [
  {
    name: "Tasnim",

    fetchNewsLinks: fetchTasnimNewsLinks,

    fetchArticleDetails: fetchTasnimArticleDetails,
  },
  {
    name: "Mehr",

    fetchNewsLinks: fetchMehrNewsLinks,

    fetchArticleDetails: fetchMehrArticleDetails,
  },
  {
    name: "Hamshahri",

    fetchNewsLinks: fetchHamshahriNewsLinks,

    fetchArticleDetails: fetchHamshahriArticleDetails,
  },
  {
    name: "Varzesh3",

    fetchNewsLinks: fetchVarzesh3NewsLinks,

    fetchArticleDetails: fetchVarzesh3ArticleDetails,
  },
] satisfies NewsSource[];
