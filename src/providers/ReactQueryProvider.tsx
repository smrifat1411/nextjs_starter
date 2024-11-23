import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Default stale time: 5 minutes
      refetchOnWindowFocus: false, // Prevent refetching on tab switch
      retry: 1, // Retry failed queries once
    },
  },
});

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

/**
 * React Query Provider for managing global query state.
 * Wraps the application to provide QueryClient context.
 */
const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
