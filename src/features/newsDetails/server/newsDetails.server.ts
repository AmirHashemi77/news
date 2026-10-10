import "server-only";

import { getNewsDetails, incrementNewsViewCount } from "../repository/newsDetails.repository";

export async function getNewsDetailsService(newsId: string) {
  const result = await getNewsDetails(newsId);

  if (!result) {
    return {
      status: "not-found" as const,
    };
  }

  return {
    status: "success" as const,
    data: result,
  };
}
export async function incrementNewsViewService(newsId: string) {
  const updated = await incrementNewsViewCount(newsId);

  if (!updated) {
    return {
      status: "not-found" as const,
    };
  }

  return {
    status: "success" as const,
  };
}
