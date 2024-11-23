import { useMutation, UseMutationOptions } from "@tanstack/react-query";

/**
 * A reusable mutation factory hook.
 * @template T - The type of data returned by the mutation.
 * @template V - The type of variables passed to the mutation function.
 * @param mutationFn - The function that performs the mutation.
 * @param options - Optional configurations for the mutation.
 */
export const useMutationFactory = <T, V>(
  mutationFn: (variables: V) => Promise<T>,
  options?: UseMutationOptions<T, unknown, V>
) => {
  return useMutation<T, unknown, V>({
    mutationFn,
    ...options,
  });
};
