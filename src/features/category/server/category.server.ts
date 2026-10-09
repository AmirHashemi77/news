import "server-only";

import { getCategories } from "../repository/category.repository";

export async function getCategoriesService() {
  const result = await getCategories();

  return result;
}
