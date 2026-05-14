'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const PROTOCOLS_BY_CHAIN: Record<string, { name: string, volume: number }[]> = {
  all: [
    { name: 'Uniswap', volume: 45.2 },
    { name: 'Raydium', volume: 28.1 },
    { name: 'PancakeSwap', volume: 15.4 },
    { name: 'Aerodrome', volume: 6.8 },
    { name: 'Curve', volume: 4.5 },
  ],
  eth: [
    { name: 'Uniswap', volume: 68.5 },
    { name: 'Curve', volume: 18.2 },
    { name: 'Balancer', volume: 8.4 },
    { name: 'SushiSwap', volume: 4.9 },
  ],
  sol: [
    { name: 'Raydium', volume: 55.4 },
    { name: 'Orca', volume: 28.6 },
    { name: 'Lifinity', volume: 10.2 },
    { name: 'Meteora', volume: 5.8 },
  ],
  base: [
    { name: 'Aerodrome', volume: 65.2 },
    { name: 'Uniswap', volume: 24.8 },
    { name: 'BaseSwap', volume: 6.5 },
    { name: 'Alien Base', volume: 3.5 },
  ],
  bnb: [
    { name: 'PancakeSwap', volume: 75.4 },
    { name: 'Uniswap', volume: 12.1 },
    { name: 'Biswap', volume: 8.5 },
    { name: 'THENA', volume: 4.0 },
  ],
  arb: [
    { name: 'Uniswap', volume: 52.4 },
    { name: 'Camelot', volume: 25.8 },
    { name: 'SushiSwap', volume: 12.5 },
    { name: 'Trader Joe', volume: 9.3 },
  ]
};

const BASE_METRICS: Record<string, { tps: number, gas: number, gasUnit: string }> = {
  all: { tps: 4500, gas: 0, gasUnit: '' },
  eth: { tps: 14, gas: 18, gasUnit: 'gwei' },
  sol: { tps: 3200, gas: 0.000005, gasUnit: 'SOL' },
  base: { tps: 45, gas: 0.005, gasUnit: 'gwei' },
  bnb: { tps: 65, gas: 3, gasUnit: 'gwei' },
  arb: { tps: 35, gas: 0.01, gasUnit: 'gwei' }
};

export function NetworkMetrics({ globalFilter = 'all' }: { globalFilter?: string }) {
  const [tps, setTps] = useState(BASE_METRICS[globalFilter].tps);
  const [gas, setGas] = useState(BASE_METRICS[globalFilter].gas);
  
  useEffect(() => {
    const baseTPS = BASE_METRICS[globalFilter].tps;
    const baseGas = BASE_METRICS[globalFilter].gas;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTps(baseTPS);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGas(baseGas);

    const interval = setInterval(() => {
      // Fluctuate TPS by ±5%
      setTps(prev => {
         const diff = prev * 0.05;
         return Math.max(0, baseTPS + (Math.random() * diff * 2 - diff));
      });
      // Fluctuate Gas by ±10%
      if (baseGas > 0) {
        setGas(prev => {
          const diff = prev * 0.1;
          return Math.max(0, baseGas + (Math.random() * diff * 2 - diff));
        });
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [globalFilter]);

  const protocols = PROTOCOLS_BY_CHAIN[globalFilter] || PROTOCOLS_BY_CHAIN.all;
  const metrics = BASE_METRICS[globalFilter] || BASE_METRICS.all;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6">
      
      {/* Network Health */}
      <div className="bg-white border border-[#E5E5E5] rounded-sm p-4 md:p-6 flex flex-col">
        <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-6">Network Performance</h3>
        
        <div className="flex-1 flex flex-col justify-center gap-8">
          <div className="flex items-end justify-between border-b border-dashed border-[#E5E5E5] pb-4">
             <div>
               <div className="text-[10px] font-sans text-[#666] mb-1">Current TPS (Transactions/sec)</div>
               <div className="font-mono text-3xl font-medium tracking-tight text-[#111]">
                 {tps.toLocaleString(undefined, { maximumFractionDigits: 0 })}
               </div>
             </div>
             <div className="w-16 h-8 flex items-end gap-0.5 opacity-50">
                {/* Fake mini bars for TPS */}
                {[...Array(12)].map((_, i) => (
                  <motion.div 
                    key={i}
                    className="w-full bg-[#111] rounded-t-sm"
                    initial={{ height: '20%' }}
                    animate={{ height: `${20 + (Math.abs(Math.sin((i + 1) * 13.7)) * 80)}%` }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', delay: i * 0.1 }}
                  />
                ))}
             </div>
          </div>

          <div className="flex items-end justify-between border-b border-dashed border-[#E5E5E5] pb-4">
             <div>
               <div className="text-[10px] font-sans text-[#666] mb-1">Avg Gas / Transact Fee</div>
               <div className="font-mono text-3xl font-medium tracking-tight text-[#111]">
                 {globalFilter === 'all' ? (
                   <span className="text-xl text-[#888] italic">Varies by chain</span>
                 ) : (
                   <>
                     {gas < 0.01 ? gas.toFixed(6) : gas.toFixed(2)}
                     <span className="text-sm text-[#888] ml-2">{metrics.gasUnit}</span>
                   </>
                 )}
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Protocol Dominance */}
      <div className="bg-white border border-[#E5E5E5] rounded-sm p-4 md:p-6 flex flex-col">
        <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-6">Protocol Dominance (24h Vol)</h3>
        
        <div className="flex-1 flex flex-col justify-center gap-4">
           {protocols.map((protocol, i) => (
             <div key={protocol.name} className="flex flex-col gap-1.5 group">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#111]">{protocol.name}</span>
                  <span className="text-[#888]">{protocol.volume}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${protocol.volume}%` }}
                     transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 }}
                     className="h-full bg-[#111] group-hover:bg-[#FF5C00] transition-colors"
                   />
                </div>
             </div>
           ))}
        </div>
      </div>

    </div>
  );
}
