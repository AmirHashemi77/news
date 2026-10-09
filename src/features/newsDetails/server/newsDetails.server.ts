import "server-only";

import { getNewsDetails } from "../repository/newsDetails.repository";

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
