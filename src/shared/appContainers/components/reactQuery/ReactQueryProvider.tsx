import React from "react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./queryClient";
import { ReactQueryDevtools } from "react-query/devtools";

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools />
  </QueryClientProvider>
);
