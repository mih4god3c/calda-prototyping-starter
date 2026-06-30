/**
 * Mock API utilities for prototyping.
 *
 * Use mockFetch() for every simulated async operation so prototypes
 * feel realistic and loading states are exercised.
 */

/**
 * Simulates a network request by wrapping data in a delayed Promise.
 * Always use this instead of real fetch() calls.
 *
 * @param data - The mock response data to return
 * @param delayMs - How long to wait before resolving (default 600ms)
 */
export async function mockFetch<T>(data: T, delayMs = 600): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  return data;
}

/**
 * Simulates a network request that occasionally fails.
 * Useful for prototyping error states.
 *
 * @param data - The mock response data
 * @param errorMessage - The error message to throw on failure
 * @param failureRate - Probability of failure (0–1, default 0.3)
 * @param delayMs - Simulated delay in ms
 */
export async function mockFetchWithError<T>(
  data: T,
  errorMessage = "Something went wrong. Please try again.",
  failureRate = 0.3,
  delayMs = 800
): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  if (Math.random() < failureRate) {
    throw new Error(errorMessage);
  }
  return data;
}

/**
 * Simulates a paginated list response.
 *
 * @param allItems - The full array of mock items
 * @param page - Page number (1-indexed)
 * @param pageSize - Number of items per page
 * @param delayMs - Simulated delay
 */
export async function mockPaginatedFetch<T>(
  allItems: T[],
  page = 1,
  pageSize = 10,
  delayMs = 500
): Promise<{ items: T[]; total: number; page: number; hasMore: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  const start = (page - 1) * pageSize;
  const items = allItems.slice(start, start + pageSize);
  return {
    items,
    total: allItems.length,
    page,
    hasMore: start + pageSize < allItems.length,
  };
}

/**
 * Simulates a file upload with progress.
 * Returns a Promise that resolves to a fake file URL.
 *
 * @param fileName - Name of the "uploaded" file
 * @param onProgress - Progress callback (0–100)
 * @param delayMs - Total upload duration
 */
export async function mockUpload(
  fileName: string,
  onProgress?: (percent: number) => void,
  delayMs = 2000
): Promise<{ url: string; fileName: string }> {
  const steps = 10;
  const stepDelay = delayMs / steps;
  for (let i = 1; i <= steps; i++) {
    await new Promise((resolve) => setTimeout(resolve, stepDelay));
    onProgress?.(i * 10);
  }
  return {
    url: `https://storage.example.com/uploads/${Date.now()}-${fileName}`,
    fileName,
  };
}
