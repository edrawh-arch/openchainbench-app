"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, Box } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const CHAINS = [
  { id: "eth", name: "Ethereum", color: "#111111", amt: "$1.18M" },
  { id: "sol", name: "Solana", color: "#FF5C00", amt: "$2.27M" },
  { id: "base", name: "Base", color: "#888888", amt: "$3.06M" },
  { id: "bnb", name: "BNB", color: "#DDDDDD", amt: "$3.40M" },
  { id: "arb", name: "Arbitrum", color: "#AAAAAA", amt: "$1.24M" },
];

const FEED = [
  {
    pair: "QUQ/BSC-USD",
    direction: "down",
    amount: "$1.5K",
    time: "1.6s",
    chain: "bnb",
  },
  {
    pair: "BSC-USD/BNB",
    direction: "up",
    amount: "$0",
    time: "2.8s",
    chain: "bnb",
  },
  {
    pair: "ETH/USDC",
    direction: "down",
    amount: "$3.2K",
    time: "2.6s",
    chain: "eth",
  },
  {
    pair: "BSC-USD/BNB",
    direction: "up",
    amount: "$0",
    time: "2.6s",
    chain: "bnb",
  },
  {
    pair: "BSC-USD/BNB",
    direction: "up",
    amount: "$0",
    time: "2.6s",
    chain: "bnb",
  },
  {
    pair: "QUQ/BSC-USD",
    direction: "up",
    amount: "$854",
    time: "2.5s",
    chain: "bnb",
  },
  {
    pair: "QUQ/BSC-USD",
    direction: "up",
    amount: "$0",
    time: "2.6s",
    chain: "bnb",
  },
  {
    pair: "ETH/USDC",
    direction: "up",
    amount: "$1",
    time: "433ms",
    chain: "eth",
  },
  {
    pair: "QUQ/BSC-USD",
    direction: "up",
    amount: "$1.5K",
    time: "785ms",
    chain: "bnb",
  },
  {
    pair: "QUQ/BSC-USD",
    direction: "up",
    amount: "$200",
    time: "797ms",
    chain: "bnb",
  },
];

const POINTS = 400;
const X_STEP = 1000 / (POINTS - 1);

const generateNoise = () => {
  const arr = [];
  let val = 0;
  for (let i = 0; i < POINTS; i++) {
    val += (Math.random() - 0.5) * 0.05;
    arr.push(val);
  }
  return arr;
};

const INITIAL_NOISE_DATA = {
  eth: generateNoise(),
  sol: generateNoise(),
  base: generateNoise(),
  bnb: generateNoise(),
  arb: generateNoise(),
};

const curveSettings = {
  bnb: { power: 1.8, height: 280 },
  base: { power: 2.2, height: 240 },
  sol: { power: 2.5, height: 190 },
  arb: { power: 2.8, height: 140 },
  eth: { power: 3.0, height: 100 },
};

const generateSmoothCurve = (
  noiseOffsets: number[],
  power: number,
  targetHeight: number,
) => {
  const values = [];
  for (let i = 0; i < POINTS; i++) {
    const x = i / (POINTS - 1);
    const val = Math.pow(x, power) + noiseOffsets[i] * 0.8 * Math.pow(x, 1.5);
    values.push(val);
  }

  // Ensure monotonically increasing
  let max = 0;
  for (let i = 0; i < POINTS; i++) {
    if (values[i] > max) {
      max = values[i];
    } else {
      // Apply slight upward drift if noise dips to keep it looking organic but growing
      max += 0.0005;
      values[i] = max;
    }
  }

  const maxVal = values[POINTS - 1] || 1;
  return values.map((v) => 300 - (v / maxVal) * targetHeight);
};

const createRoundedPath = (data: number[]) => {
  if (data.length === 0) return "";
  let path = `M0,${data[0]}`;
  for (let i = 0; i < data.length - 1; i++) {
    const xMid = (i + 0.5) * X_STEP;
    path += ` C${xMid},${data[i]} ${xMid},${data[i + 1]} ${(i + 1) * X_STEP},${data[i + 1]}`;
  }
  return path;
};

export function LiveEcosystem({
  globalFilter = "all",
}: {
  globalFilter?: string;
}) {
  const [disabledChains, setDisabledChains] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);
  const [noiseData, setNoiseData] = useState(INITIAL_NOISE_DATA);
  const [liveTags, setLiveTags] = useState<any[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showFeed, setShowFeed] = useState(true);
  const [feedItems, setFeedItems] = useState(
    FEED.map((f, i) => ({ ...f, id: `init-${i}` })),
  );

  const isPlayingRef = useRef(isPlaying);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    let idCounter = 0;
    let tickCounter = 0;

    const interval = setInterval(() => {
      if (!isPlayingRef.current) return;

      tickCounter++;

      // Update tags occasionally
      if (tickCounter % 15 === 0) {
        const chainList = ["eth", "sol", "base", "bnb", "arb"];
        const randomChainId =
          chainList[Math.floor(Math.random() * chainList.length)];
        const info = CHAINS.find((c) => c.id === randomChainId);

        if (info) {
          const tradeAmt = Math.floor(Math.random() * 5000);
          const newTag = {
            id: idCounter++,
            chain: randomChainId,
            pair: `${info.name}/USDC`,
            amt: `+$${tradeAmt}`,
            color: info.color,
          };
          setLiveTags((tags) => [...tags, newTag].slice(-8));

          // Also push to sidebar feed
          setFeedItems((prev) => {
            const direction = Math.random() > 0.5 ? "up" : "down";
            const isUp = direction === "up";
            const sign = isUp ? "+$" : "$"; // the UI handles color, but let's just make it look right
            const newItem = {
              id: `live-${newTag.id}`,
              pair: newTag.pair,
              direction,
              amount: `${isUp ? "+" : ""}$${tradeAmt}`,
              time: "just now",
              chain: randomChainId,
            };
            return [newItem, ...prev].slice(0, 50);
          });
        }
      }

      // Chart sequence update - smooth constant noise evolution
      setNoiseData((prev) => ({
        eth: [
          ...prev.eth.slice(1),
          prev.eth[POINTS - 1] + (Math.random() - 0.5) * 0.05,
        ],
        sol: [
          ...prev.sol.slice(1),
          prev.sol[POINTS - 1] + (Math.random() - 0.5) * 0.05,
        ],
        base: [
          ...prev.base.slice(1),
          prev.base[POINTS - 1] + (Math.random() - 0.5) * 0.05,
        ],
        bnb: [
          ...prev.bnb.slice(1),
          prev.bnb[POINTS - 1] + (Math.random() - 0.5) * 0.05,
        ],
        arb: [
          ...prev.arb.slice(1),
          prev.arb[POINTS - 1] + (Math.random() - 0.5) * 0.05,
        ],
      }));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const toggleChain = (id: string) => {
    setDisabledChains((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isChainActive = (id: string) => {
    if (globalFilter !== "all" && globalFilter !== id) return false;
    return !disabledChains.has(id);
  };

  const visibleFeed = feedItems.filter((item) => isChainActive(item.chain));

  const curves = {
    eth: generateSmoothCurve(
      noiseData.eth,
      curveSettings.eth.power,
      curveSettings.eth.height,
    ),
    sol: generateSmoothCurve(
      noiseData.sol,
      curveSettings.sol.power,
      curveSettings.sol.height,
    ),
    base: generateSmoothCurve(
      noiseData.base,
      curveSettings.base.power,
      curveSettings.base.height,
    ),
    bnb: generateSmoothCurve(
      noiseData.bnb,
      curveSettings.bnb.power,
      curveSettings.bnb.height,
    ),
    arb: generateSmoothCurve(
      noiseData.arb,
      curveSettings.arb.power,
      curveSettings.arb.height,
    ),
  };

  const statsMultiplier =
    {
      all: 1,
      eth: 0.55,
      sol: 0.25,
      base: 0.08,
      bnb: 0.1,
      arb: 0.02,
    }[globalFilter] || 1;

  if (!mounted)
    return (
      <div className="mb-24 w-full h-[600px] bg-[#fafafa] rounded-sm animate-pulse border border-[#E5E5E5] dark:border-[#333]"></div>
    );

  return (
    <div className="mb-24 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 font-mono text-[10px] uppercase tracking-widest text-[#888]">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF5C00] animate-pulse"></div>
          <span className="text-[#111] dark:text-white font-semibold">STREAMING</span>
          <span>&middot;</span>
          <span>MOBULA FAST-TRADE</span>
        </div>
        <div>&middot; REFRESHED 2M AGO</div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 bg-white dark:bg-[#0a0a0a] border border-[#E5E5E5] dark:border-[#333] rounded-sm mb-4">
        <div className="p-4 md:p-5 border-b lg:border-b-0 lg:border-r border-[#E5E5E5] dark:border-[#333] group cursor-pointer hover:bg-[#F9F9F9] dark:hover:bg-[#1A1A1A] transition-colors flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-1">
              VOL 24H
            </div>
            <div className="text-xl font-mono tracking-tight text-[#111] dark:text-white mb-2 group-hover:text-[#FF5C00] transition-colors">
              <span className="text-[14px] text-[#888]">$</span>
              {(25.01 * statsMultiplier).toFixed(2)}
              <span className="text-[14px] text-[#888]">B</span>
            </div>
          </div>
          <div className="text-[10px] font-sans text-[#666] dark:text-[#AAA]">
            {globalFilter === "all"
              ? "All chains"
              : CHAINS.find((c) => c.id === globalFilter)?.name}{" "}
            &middot; DEX trades
          </div>
        </div>
        <div className="p-4 md:p-5 border-b lg:border-b-0 lg:border-r border-[#E5E5E5] dark:border-[#333] group cursor-pointer hover:bg-[#F9F9F9] dark:hover:bg-[#1A1A1A] transition-colors flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-1">
              TXS 24H
            </div>
            <div className="text-xl font-mono tracking-tight text-[#111] dark:text-white mb-2 group-hover:text-[#FF5C00] transition-colors">
              {(50.98 * statsMultiplier).toFixed(2)}
              <span className="text-[14px] text-[#888]">M</span>
            </div>
          </div>
          <div className="text-[10px] font-sans text-[#666] dark:text-[#AAA]">
            {(26.2 * statsMultiplier).toFixed(1)}M buys &middot;{" "}
            {(24.6 * statsMultiplier).toFixed(1)}M sells
          </div>
        </div>
        <div className="p-4 md:p-5 border-b md:border-b-0 lg:border-r border-[#E5E5E5] dark:border-[#333] group cursor-pointer hover:bg-[#F9F9F9] dark:hover:bg-[#1A1A1A] transition-colors flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-1">
              MARKET CAP
            </div>
            <div className="text-xl font-mono tracking-tight text-[#111] dark:text-white mb-2 group-hover:text-[#FF5C00] transition-colors">
              <span className="text-[14px] text-[#888]">$</span>
              {(7.4 * statsMultiplier).toFixed(2)}
              <span className="text-[14px] text-[#888]">T</span>
            </div>
          </div>
          <div className="text-[10px] font-sans text-[#666] dark:text-[#AAA]">
            {globalFilter === "all"
              ? "All tracked assets"
              : `${CHAINS.find((c) => c.id === globalFilter)?.name} ecosystem assets`}
          </div>
        </div>
        <div className="p-4 md:p-5 bg-[#FAFAFA] dark:bg-[#111] flex flex-col justify-between relative">
          <div className="absolute right-4 top-4 text-[9px] font-mono text-[#FF5C00] animate-pulse">
            +24
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-1">
              STREAMED LIVE
            </div>
            <div className="text-xl font-mono tracking-tight text-[#111] dark:text-white mb-2">
              {Math.floor(12312 * statsMultiplier).toLocaleString()}
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] font-sans text-[#666] dark:text-[#AAA]">
            <span>
              ${(20.02 * statsMultiplier).toFixed(2)}M updates since load
            </span>
            <button
              onClick={() => setShowFeed(!showFeed)}
              className="hidden md:flex font-mono text-[9px] uppercase tracking-widest text-[#888] hover:text-[#111] items-center gap-1 transition-colors"
            >
              {showFeed ? "HIDE FEED" : "SHOW FEED"}{" "}
              <ChevronDown
                className={`w-3 h-3 transition-transform ${showFeed ? "" : "rotate-180"}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Main Chart Panel */}
      <div className="bg-white dark:bg-[#0a0a0a] border border-[#E5E5E5] dark:border-[#333] rounded-sm flex flex-col">
        {/* Panel Header */}
        <div className="border-b border-[#E5E5E5] dark:border-[#333] p-3 md:p-4 flex flex-col md:flex-row md:items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#888] gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative group">
              <span className="text-[#111] dark:text-white font-semibold flex items-center cursor-help border-b border-dashed border-[#888] hover:text-[#FF5C00] transition-colors relative z-10">
                STREAMED VOLUME
              </span>
              {/* Tooltip Content */}
              <div className="absolute left-0 top-full mt-2 w-64 bg-[#111] text-[#fff] font-sans text-[11px] leading-relaxed p-3 rounded-[2px] opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-[60] normal-case tracking-normal shadow-xl translate-y-1 group-hover:translate-y-0">
                Real-time transaction volume aggregated across multiple
                decentralized exchanges and chains. Powered by Mobula&apos;s
                high-throughput indexing node.
                <div className="absolute -top-1 left-6 w-2 h-2 bg-[#111] rotate-45"></div>
              </div>
            </div>
            <span>&middot;</span>
            <span>LAST 10 MIN</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#111]"></div>
            <span className="hidden md:inline">&middot;</span>
            <span className="text-[#111] dark:text-white normal-case tracking-normal font-sans italic text-[11px]">
              ${(11.15 * statsMultiplier).toFixed(2)}M total
            </span>
            <span className="hidden md:inline text-[#E5E5E5] mx-1">|</span>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center justify-center w-5 h-5 rounded-[2px] hover:bg-[#F0F0F0] hover:text-[#111] text-[#888] transition-colors"
              title={isPlaying ? "Pause stream" : "Play stream"}
            >
              {isPlaying ? (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>
          </div>
          <button
            onClick={() => setShowFeed(!showFeed)}
            className="hidden md:flex items-center gap-1 hover:text-[#111] transition-colors"
          >
            {showFeed ? "HIDE FEED" : "SHOW FEED"}{" "}
            <ChevronDown
              className={`w-3 h-3 transition-transform ${showFeed ? "" : "rotate-180"}`}
            />
          </button>
        </div>

        {/* Panel Body */}
        <div className="flex flex-col md:flex-row md:h-[340px]">
          {/* Chart Area */}
          <div className="flex-1 p-4 md:p-6 flex flex-col relative h-[300px] md:h-auto">
            {/* Chart Legend */}
            <div className="flex flex-wrap gap-4 md:gap-6 mb-6">
              {CHAINS.map((chain) => {
                const isDisabled = !isChainActive(chain.id);
                return (
                  <div
                    key={chain.id}
                    className={`flex items-center gap-2 cursor-pointer transition-opacity ${isDisabled ? "opacity-40 grayscale" : "hover:opacity-80"}`}
                    onClick={() => toggleChain(chain.id)}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-[2px]"
                      style={{ backgroundColor: chain.color }}
                    ></div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="font-sans text-[12px] font-medium text-[#111] dark:text-white">
                        {chain.name}
                      </span>
                      <span className="font-mono text-[10px] text-[#888]">
                        {chain.amt}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Fake Chart Lines Area */}
            <div className="flex-1 relative w-full h-full">
              {/* Grid */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-0 right-12 top-[6px] h-px border-t border-dashed border-[#E5E5E5]/60 z-0"></div>
                <div className="absolute left-0 right-12 top-[calc(50%-12px)] h-px border-t border-dashed border-[#E5E5E5]/60 z-0"></div>
                <div className="absolute right-0 top-0 bottom-0 w-12 border-l border-dashed border-[#E5E5E5]/50 flex flex-col justify-between items-end pb-8 z-10 bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-[1px]">
                  <span className="text-[#888] font-mono text-[9px]">
                    5.00M
                  </span>
                  <span className="text-[#888] font-mono text-[9px]">
                    2.50M
                  </span>
                  <span></span>
                </div>
              </div>

              {/* X Axis */}
              <div className="absolute left-0 right-12 bottom-0 h-6 border-t border-dashed border-[#E5E5E5]/50 flex justify-between items-end">
                <span className="text-[#888] font-mono text-[9px]">
                  10 min ago
                </span>
                <span className="text-[#888] font-mono text-[9px]">now</span>
              </div>

              {/* Chart Mock - Lines SVG */}
              <svg
                className="absolute inset-0 w-[calc(100%-48px)] h-[calc(100%-24px)] overflow-visible"
                preserveAspectRatio="none"
                viewBox="0 0 1000 300"
              >
                {/* Area Fills */}
                <path
                  d={`${createRoundedPath(curves.sol)} L1000,300 L0,300 Z`}
                  fill="#FF5C00"
                  fillOpacity={isChainActive("sol") ? "0.05" : "0"}
                  className="transition-opacity duration-300"
                />

                {/* Ethereum */}
                {isChainActive("eth") && (
                  <g className="transition-opacity duration-300">
                    <path
                      d={createRoundedPath(curves.eth)}
                      fill="none"
                      stroke="#111111"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                    <circle
                      cx="1000"
                      cy={curves.eth[POINTS - 1]}
                      r="3"
                      fill="#111111"
                    />
                  </g>
                )}

                {/* Solana */}
                {isChainActive("sol") && (
                  <g className="transition-opacity duration-300">
                    <path
                      d={createRoundedPath(curves.sol)}
                      fill="none"
                      stroke="#FF5C00"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                    <circle
                      cx="1000"
                      cy={curves.sol[POINTS - 1]}
                      r="4"
                      fill="#FF5C00"
                    />
                  </g>
                )}

                {/* Base */}
                {isChainActive("base") && (
                  <g className="transition-opacity duration-300">
                    <path
                      d={createRoundedPath(curves.base)}
                      fill="none"
                      stroke="#888888"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                    <circle
                      cx="1000"
                      cy={curves.base[POINTS - 1]}
                      r="3"
                      fill="#888888"
                    />
                  </g>
                )}

                {/* BNB */}
                {isChainActive("bnb") && (
                  <g className="transition-opacity duration-300">
                    <path
                      d={createRoundedPath(curves.bnb)}
                      fill="none"
                      stroke="#DDDDDD"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                    <circle
                      cx="1000"
                      cy={curves.bnb[POINTS - 1]}
                      r="3"
                      fill="#DDDDDD"
                    />
                  </g>
                )}

                {/* Arbitrum */}
                {isChainActive("arb") && (
                  <g className="transition-opacity duration-300">
                    <path
                      d={createRoundedPath(curves.arb)}
                      fill="none"
                      stroke="#AAAAAA"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                    <circle
                      cx="1000"
                      cy={curves.arb[POINTS - 1]}
                      r="3"
                      fill="#AAAAAA"
                    />
                  </g>
                )}
              </svg>

              {/* Dynamic Live Floating Tags pinned to lines */}
              <div className="absolute right-12 top-0 bottom-[24px] z-30 pointer-events-none">
                <AnimatePresence>
                  {liveTags
                    .filter((t) => isChainActive(t.chain))
                    .map((tag, i, arr) => {
                      const sameChainTags = arr.filter(
                        (t) => t.chain === tag.chain,
                      );
                      const chainIndex = sameChainTags.findIndex(
                        (t) => t.id === tag.id,
                      );
                      const reverseChainIndex =
                        sameChainTags.length - 1 - chainIndex;

                      const val =
                        curves[tag.chain as keyof typeof curves][POINTS - 1];
                      const relativeY = (val / 300) * 100;

                      return (
                        <motion.div
                          key={tag.id}
                          initial={{ opacity: 0, scale: 0.9, x: 20, y: 0 }}
                          animate={{
                            opacity: reverseChainIndex > 0 ? 0 : 1,
                            scale: reverseChainIndex > 0 ? 0.95 : 1,
                            x: 0,
                            y: reverseChainIndex > 0 ? -15 : 0,
                          }}
                          exit={{
                            opacity: 0,
                            scale: 0.9,
                            x: -20,
                            transition: { duration: 0.15 },
                          }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="absolute right-0 bg-white dark:bg-[#0a0a0a] border shadow-[0_2px_8px_rgba(0,0,0,0.08)] rounded-[2px] py-1 pl-1.5 pr-2.5 flex items-center justify-between pointer-events-auto whitespace-nowrap min-w-0 overflow-hidden"
                          style={{
                            top: `calc(${relativeY}% - 14px)`,
                            borderColor: tag.color,
                            zIndex: tag.id,
                          }}
                        >
                          <div className="flex items-center gap-1.5">
                            <div
                              className="flex items-center justify-center w-3 h-3 rounded-[2px] text-[7px] font-bold text-white shadow-sm"
                              style={{ backgroundColor: tag.color }}
                            >
                              {tag.chain.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-mono text-[9px] text-[#111] dark:text-white font-medium">
                              {tag.pair}
                            </span>
                          </div>
                          <span
                            className="font-mono text-[9px] font-bold ml-2"
                            style={{ color: tag.color }}
                          >
                            {tag.amt}
                          </span>
                        </motion.div>
                      );
                    })}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Live Feed Sidebar */}
          {showFeed && (
            <div className="w-full md:w-[320px] lg:w-[360px] border-t md:border-t-0 md:border-l border-[#E5E5E5] dark:border-[#333] flex flex-col bg-[#FAFAFA] dark:bg-[#111]">
              <div className="border-b border-[#E5E5E5] dark:border-[#333] p-3 md:p-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#888]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#111] dark:text-white">LIVE FEED</span>
                  <div
                    className={`w-1.5 h-1.5 rounded-full bg-[#111] ${isPlaying ? "animate-pulse" : "opacity-30"}`}
                  ></div>
                </div>
                <span>LAST {visibleFeed.length}</span>
              </div>

              <div className="flex-1 overflow-auto h-[300px] md:h-auto overflow-x-hidden">
                <AnimatePresence initial={false}>
                  {visibleFeed.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.2 }}
                      className="flex justify-between items-center px-3 md:px-4 border-b border-[#E5E5E5]/50 hover:bg-white transition-colors cursor-pointer group overflow-hidden origin-top"
                    >
                      <div className="flex w-full items-center justify-between py-2.5">
                        <div className="flex items-center gap-2 md:gap-3 min-w-0 pr-4">
                          <div className="text-[#888] shrink-0">
                            <Box className="w-4 h-4" />
                          </div>
                          <span className="font-mono text-[11px] text-[#222] dark:text-[#E0E0E0] truncate">
                            {item.pair}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span
                            className={
                              item.direction === "down"
                                ? "text-[#888] text-[9px]"
                                : "text-[#FF5C00] text-[9px]"
                            }
                          >
                            {item.direction === "down" ? "▼" : "▲"}
                          </span>
                          <span className="font-mono text-[11px] text-[#111] dark:text-white text-right w-10">
                            {item.amount}
                          </span>
                          <span className="font-mono text-[11px] text-[#FF5C00] text-right w-[40px] truncate">
                            {item.time}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
