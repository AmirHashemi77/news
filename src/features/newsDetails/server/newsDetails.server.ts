import "server-only";

import { checkSaveNews, getNewsComments, getNewsDetails, incrementNewsViewCount, recordNewsView, savedNewsHandler, unSavedNewsHandler } from "../repository/newsDetails.repository";
import { RecordNewsViewInput } from "../types/newsDetails.type";

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
export async function getNewsCommentsService(newsId: string) {
  const result = await getNewsComments(newsId);

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
export async function recordNewsViewServices({ newsId, userId }: RecordNewsViewInput) {
  const result = await recordNewsView({ newsId, userId });

  return {
    status: "success" as const,
    data: result,
  };
}
export async function savedNewsHandlerServices({ newsId, userId }: RecordNewsViewInput) {
  const result = await savedNewsHandler({ newsId, userId });

  return {
    status: "success" as const,
    data: result,
  };
}
export async function unSavedNewsHandlerServices({ newsId, userId }: RecordNewsViewInput) {
  const result = await unSavedNewsHandler({ newsId, userId });

  return {
    status: "success" as const,
    data: result,
  };
}
export async function checkSaveNewsServices({ newsId, userId }: RecordNewsViewInput) {
  const result = await checkSaveNews({ newsId, userId });

  return {
    status: "success" as const,
    data: result,
  };
}
