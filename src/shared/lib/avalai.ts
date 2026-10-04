import OpenAI from "openai";

let client: OpenAI | null = null;

export function getAvalaiClient(): OpenAI {
  if (client) {
    return client;
  }

  const apiKey = process.env.AVALAI_API_KEY;

  if (!apiKey) {
    throw new Error("AVALAI_API_KEY is not configured");
  }

  client = new OpenAI({
    apiKey,
    baseURL: "https://api.avalai.ir/v1",
    timeout: 30_000,
    maxRetries: 1,
  });

  return client;
}
