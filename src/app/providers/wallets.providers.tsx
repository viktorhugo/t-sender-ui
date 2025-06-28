"use client";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import React from "react";
import { WagmiProvider } from "wagmi";
import { rainbowKitConfig } from "@/rainbowKitConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

export function WalletProviders(props: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={rainbowKitConfig}> {/* for interactions with the blockchain */}
            <QueryClientProvider client={queryClient}> {/* for caching and fetching data */}
                <RainbowKitProvider>
                    {props.children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}