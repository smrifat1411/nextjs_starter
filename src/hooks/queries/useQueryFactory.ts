import {
  useQuery,
  UseQueryOptions,
  QueryKey,
  UseQueryResult,
} from "@tanstack/react-query";

/**
 * A reusable query factory hook.
 * @template T - The type of data returned by the query function.
 * @param queryKey - The unique query key.
 * @param queryFn - The function to fetch data.
 * @param options - Optional configurations for the query.
 * @returns The result of the React Query `useQuery` hook.
 */
export const useQueryFactory = <T>(
  queryKey: QueryKey,
  queryFn: () => Promise<T>,
  options?: Omit<UseQueryOptions<T, Error, T, QueryKey>, "queryKey" | "queryFn">
): UseQueryResult<T, Error> => {
  return useQuery<T, Error, T>({
    queryKey, // Explicitly include the query key
    queryFn, // Include the query function
    staleTime: 1000 * 60 * 5, // Default: Cache data for 5 minutes
    refetchOnWindowFocus: false, // Default: Don't refetch when the window regains focus
    retry: 1, // Default: Retry once on failure
    ...options, // Allow overriding default options
  });
};
