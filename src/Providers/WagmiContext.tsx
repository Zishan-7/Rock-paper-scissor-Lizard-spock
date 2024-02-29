"use client";

import { WagmiProvider } from "wagmi";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "@/utils/wagmiConfig";

const WagmiContext = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {" "}
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default WagmiContext;
