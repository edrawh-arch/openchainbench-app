"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { NetworkMetrics } from "@/components/network-metrics";
import { MarketInsights } from "@/components/market-insights";

const LiveEcosystem = dynamic(
  () => import("@/components/live-ecosystem").then((mod) => mod.LiveEcosystem),
  { ssr: false },
);

const FILTER_CHAINS = [
  { id: "all", name: "All chains" },
  { id: "eth", name: "Ethereum" },
  { id: "sol", name: "Solana" },
  { id: "base", name: "Base" },
  { id: "bnb", name: "BNB" },
  { id: "arb", name: "Arbitrum" },
];

export default function EcosystemPage() {
  const [selectedChain, setSelectedChain] = useState("all");

  const selectedName =
    FILTER_CHAINS.find((c) => c.id === selectedChain)?.name || "Network";

  return (
    <div className="w-full flex justify-center py-24 bg-transparent min-h-screen">
      <div className="w-full max-w-[1400px] px-6">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-[42px] font-semibold tracking-tight text-[#111] dark:text-white mb-4 font-sans">
            {selectedChain === "all"
              ? "Network Ecosystem"
              : `${selectedName} Ecosystem`}
          </h1>
          <p className="text-[20px] text-[#777] font-sans leading-relaxed max-w-2xl tracking-tight">
            Live stream of ecosystem data, transaction volumes, and network
            activity{" "}
            {selectedChain === "all"
              ? "across supported chains"
              : `on ${selectedName}`}
            .
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            {FILTER_CHAINS.map((chain) => (
              <button
                key={chain.id}
                onClick={() => setSelectedChain(chain.id)}
                className={`px-3 py-1.5 rounded-sm font-mono text-[10px] uppercase tracking-widest transition-colors ${ selectedChain === chain.id ? "bg-[#FF5C00] text-white border border-[#FF5C00] shadow-[0_2px_8px_rgba(255,92,0,0.25)]" : "bg-white dark:bg-[#0a0a0a] text-[#666] border-[#E5E5E5] hover:border-[#111] hover:text-[#111]" } dark:text-[#AAAAAA] dark:border-[#333333] dark:hover:border-[#AAAAAA]`}
              >
                {chain.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <LiveEcosystem globalFilter={selectedChain} />
        <NetworkMetrics globalFilter={selectedChain} />
        <MarketInsights globalFilter={selectedChain} />
      </div>
    </div>
  );
}
