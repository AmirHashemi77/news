"use server";

import { redirect } from "next/navigation";
import { getSearchPathService } from "../server/serach.server";
import type { SearchActionState } from "../types/search.type";

export default async function SearchAction(_previousState: SearchActionState, formData: FormData): Promise<SearchActionState> {
  const result = getSearchPathService(formData.get("searchQuery"));

  if (result.status === "validation-error") {
    return { message: result.message };
  }

  redirect(result.path);
}
