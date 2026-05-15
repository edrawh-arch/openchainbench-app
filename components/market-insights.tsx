"use client";
import { useState, useMemo } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
const CHART_DATA: Record<
  string,
  { date: string; volume: number; tvl: number }[]
> = {
  all: [
    { date: "1", volume: 3.2, tvl: 45.1 },
    { date: "2", volume: 3.5, tvl: 44.8 },
    { date: "3", volume: 4.1, tvl: 46.2 },
    { date: "4", volume: 3.8, tvl: 47.5 },
    { date: "5", volume: 4.5, tvl: 49.0 },
    { date: "6", volume: 5.1, tvl: 51.2 },
    { date: "7", volume: 4.9, tvl: 52.5 },
  ],
  eth: [
    { date: "1", volume: 2.1, tvl: 30.1 },
    { date: "2", volume: 2.3, tvl: 29.8 },
    { date: "3", volume: 2.6, tvl: 30.5 },
    { date: "4", volume: 2.4, tvl: 31.0 },
    { date: "5", volume: 2.8, tvl: 31.5 },
    { date: "6", volume: 3.2, tvl: 32.8 },
    { date: "7", volume: 3.0, tvl: 33.5 },
  ],
  sol: [
    { date: "1", volume: 0.8, tvl: 5.1 },
    { date: "2", volume: 0.9, tvl: 5.3 },
    { date: "3", volume: 1.1, tvl: 5.8 },
    { date: "4", volume: 1.0, tvl: 6.2 },
    { date: "5", volume: 1.2, tvl: 6.8 },
    { date: "6", volume: 1.4, tvl: 7.5 },
    { date: "7", volume: 1.3, tvl: 7.9 },
  ],
  base: [
    { date: "1", volume: 0.1, tvl: 1.1 },
    { date: "2", volume: 0.15, tvl: 1.2 },
    { date: "3", volume: 0.2, tvl: 1.5 },
    { date: "4", volume: 0.18, tvl: 1.8 },
    { date: "5", volume: 0.25, tvl: 2.1 },
    { date: "6", volume: 0.3, tvl: 2.5 },
    { date: "7", volume: 0.4, tvl: 2.8 },
  ],
  bnb: [
    { date: "1", volume: 0.5, tvl: 4.1 },
    { date: "2", volume: 0.45, tvl: 4.0 },
    { date: "3", volume: 0.55, tvl: 4.2 },
    { date: "4", volume: 0.6, tvl: 4.3 },
    { date: "5", volume: 0.58, tvl: 4.5 },
    { date: "6", volume: 0.7, tvl: 4.6 },
    { date: "7", volume: 0.65, tvl: 4.8 },
  ],
  arb: [
    { date: "1", volume: 0.4, tvl: 2.5 },
    { date: "2", volume: 0.38, tvl: 2.4 },
    { date: "3", volume: 0.45, tvl: 2.6 },
    { date: "4", volume: 0.5, tvl: 2.8 },
    { date: "5", volume: 0.48, tvl: 3.0 },
    { date: "6", volume: 0.6, tvl: 3.2 },
    { date: "7", volume: 0.55, tvl: 3.4 },
  ],
};
const WHALE_TXS = [
  {
    time: "Just now",
    amount: "$1.2M",
    pair: "WETH/USDC",
    type: "Buy",
    chain: "Ethereum",
  },
  {
    time: "2m ago",
    amount: "$850K",
    pair: "SOL/USDT",
    type: "Sell",
    chain: "Solana",
  },
  {
    time: "5m ago",
    amount: "$2.4M",
    pair: "WBTC/USDC",
    type: "Buy",
    chain: "Ethereum",
  },
  {
    time: "12m ago",
    amount: "$500K",
    pair: "AERO/USDC",
    type: "Buy",
    chain: "Base",
  },
  {
    time: "18m ago",
    amount: "$1.5M",
    pair: "LINK/WETH",
    type: "Sell",
    chain: "Ethereum",
  },
]; // Format for tooltip
const CustomTooltip = ({ active, payload, label, metric }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111] text-white p-3 rounded-sm shadow-xl text-xs font-mono">
        
        <div className="text-[#888] mb-1 dark:text-[#71717A]">
          Day {label}
        </div>
        <div>
          
          {metric === "volume" ? "Volume" : "TVL"}: $
          {payload[0].value.toFixed(2)}B
        </div>
      </div>
    );
  }
  return null;
};
export function MarketInsights({
  globalFilter = "all",
}: {
  globalFilter?: string;
}) {
  const [metric, setMetric] = useState<"volume" | "tvl">("volume");
  const dat = CHART_DATA[globalFilter] || CHART_DATA.all;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
      
      {/* Chart Section */}
      <div className="bg-white border border-[#E5E5E5] rounded-sm p-4 md:p-6 lg:col-span-2 flex flex-col dark:bg-[#0A0A0A] dark:border-[#222222]">
        
        <div className="flex justify-between items-center mb-6">
          
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#888] dark:text-[#71717A]">
            
            7-Day Trend
          </h3>
          <div className="flex bg-[#F5F5F5] dark:bg-[#111] p-1 rounded-sm dark:bg-[#111111]">
            
            <button
              onClick={() => setMetric("volume")}
              className={`text-[10px] uppercase font-mono tracking-widest px-3 py-1 rounded-sm transition-colors ${metric === "volume" ? "bg-white text-[#111] shadow-sm" : "text-[#888] hover:text-[#111]"} dark:text-white`}
            >
              
              Volume
            </button>
            <button
              onClick={() => setMetric("tvl")}
              className={`text-[10px] uppercase font-mono tracking-widest px-3 py-1 rounded-sm transition-colors ${metric === "tvl" ? "bg-white text-[#111] shadow-sm" : "text-[#888] hover:text-[#111]"} dark:text-white`}
            >
              
              TVL
            </button>
          </div>
        </div>
        <div className="flex-1 h-[250px] w-full min-h-[250px]">
          
          <ResponsiveContainer width="100%" height="100%">
            
            <AreaChart
              data={dat}
              margin={{ top: 5, right: 0, left: -20, bottom: 0 }}
            >
              
              <defs>
                
                <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                  
                  <stop
                    offset="5%"
                    stopColor={metric === "volume" ? "#FF5C00" : "#111"}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={metric === "volume" ? "#FF5C00" : "#111"}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#888", fontFamily: "monospace" }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#888", fontFamily: "monospace" }}
                tickFormatter={(val) => `$${val}B`}
              />
              <Tooltip content={<CustomTooltip metric={metric} />} />
              <Area
                type="monotone"
                dataKey={metric}
                stroke={metric === "volume" ? "#FF5C00" : "#111"}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorMetric)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Whale Tracker */}
      <div className="bg-white border border-[#E5E5E5] rounded-sm p-4 md:p-6 flex flex-col dark:bg-[#0A0A0A] dark:border-[#222222]">
        
        <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-6 flex items-center gap-2 dark:text-[#71717A]">
          
          <span>Whale Radar</span>
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
        </h3>
        <div className="flex-1 flex flex-col gap-3">
          
          {WHALE_TXS.map((tx, i) => {
            if (
              globalFilter !== "all" &&
              tx.chain.toLowerCase() !==
                (globalFilter === "bnb" ? "bsc" : globalFilter) &&
              !tx.chain.toLowerCase().includes(globalFilter)
            ) {
              return null;
            }
            return (
              <div
                key={i}
                className="flex justify-between items-center py-2 border-b border-[#F5F5F5] last:border-0"
              >
                
                <div className="flex flex-col">
                  
                  <span className="text-xs font-medium text-[#111] dark:text-white">
                    
                    {tx.pair}
                  </span>
                  <span className="text-[10px] font-mono text-[#888] mt-0.5 dark:text-[#71717A]">
                    
                    {tx.time} • {tx.chain}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  
                  <span className="font-mono text-xs font-bold text-[#111] dark:text-white">
                    
                    {tx.amount}
                  </span>
                  <span
                    className={`text-[10px] font-mono uppercase mt-0.5 ${tx.type === "Buy" ? "text-green-600" : "text-red-500"}`}
                  >
                    
                    {tx.type}
                  </span>
                </div>
              </div>
            );
          })}
          {globalFilter !== "all" &&
            WHALE_TXS.filter((t) =>
              t.chain.toLowerCase().includes(globalFilter),
            ).length === 0 && (
              <div className="flex-1 flex items-center justify-center text-xs text-[#888] font-mono italic dark:text-[#71717A]">
                
                No recent whale activity on this network.
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
