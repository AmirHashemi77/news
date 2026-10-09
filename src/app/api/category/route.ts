import { getCategoriesService } from "@/features/category/server/category.server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await getCategoriesService();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to fetch category list", error);
    return NextResponse.json(
      {
        message: "Failed to fetch category list",
      },
      {
        status: 500,
      },
    );
  }
}
