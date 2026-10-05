export async function fetchWithRetry(url: string, options?: RequestInit, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const response = await fetch(url, options);

    if (response.ok) {
      return response;
    }

    if (response.status !== 502 && response.status !== 503 && response.status !== 504) {
      return response;
    }

    await new Promise((resolve) => setTimeout(resolve, attempt * 3000));
  }

  throw new Error(`Failed after retries: ${url}`);
}
