"use client";

import { http, createConfig } from "@wagmi/core";
import { sepolia } from "@wagmi/core/chains";
import { WagmiProvider } from "wagmi";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const WagmiContext = ({ children }: { children: ReactNode }) => {
  const config = createConfig({
    chains: [sepolia],
    transports: {
      [sepolia.id]: http(),
    },
  });
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {" "}
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default WagmiContext;
