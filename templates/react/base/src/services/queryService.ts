import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
  type QueryKey,
} from "@tanstack/react-query";

type ApiMutationOptions<TData, TVariables> = UseMutationOptions<
  TData,
  Error,
  TVariables
> & {
  invalidateKeys?: QueryKey[];
};

// Generic Query Hook
export const useApiQuery = <T>(
  queryKey: readonly unknown[],
  queryFn: () => Promise<T>,
  options?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey,
    queryFn,
    staleTime: 5 * 60 * 1000, //in ms
    ...options,
  });
};

// Generic Mutation Hook (generally used to post the data / when modifies data on the server )
export const useApiMutation = <TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: ApiMutationOptions<TData, TVariables>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn,
    onSuccess: (data, variables, onMutateResult, context) => {
      options?.invalidateKeys?.forEach((key: QueryKey) => {
        queryClient.invalidateQueries({ queryKey: key });
      });

      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
};

// Specific invalidation helpers
export const useInvalidateQueries = () => {
  const queryClient = useQueryClient();

  return {
    invalidateByKey: (queryKey: readonly unknown[]) => {
      queryClient.invalidateQueries({ queryKey });
    },

    invalidateAll: () => {
      queryClient.invalidateQueries();
    },

    // ONLY for logout / reset
    clearAll: () => {
      queryClient.clear();
    },
  };
};
