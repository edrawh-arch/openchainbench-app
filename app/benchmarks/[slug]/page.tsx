import Link from 'next/link';
import { ArrowLeft, ExternalLink, Download } from 'lucide-react';
import { notFound } from 'next/navigation';
import dynamicImport from 'next/dynamic';
import { ChartPlaceholder } from '@/components/chart-placeholder';
import { ShareableCards } from '@/components/shareable-cards';
import { BENCHMARKS_LIST } from '@/lib/mock-data';
import { BenchmarkActions } from './actions';

const BenchmarkChart = dynamicImport(() => import('@/components/benchmark-chart').then(mod => mod.BenchmarkChart), { ssr: false });

// Mock data to match the screenshot 'Fastest on-chain data provider'
const BENCHMARK_DETAILS: Record<string, any> = {
  'fastest-onchain-data-provider': {
    title: 'Fastest on-chain data provider',
    description: 'On-chain event to WebSocket emission, in seconds. Measured against canonical-tip archive nodes.',
    updatedAt: 'May 6, 2026, 8:51 AM UTC',
    number: '001',
    tags: [{ label: 'DATA', live: true }],
    stats: {
      best: '0.8 s',
      median: '1.3 s',
      worst: '7.1 s',
      spread: '10.6×   2.3 s → 24.6 s',
      samples: '155,140',
      providers: '3 providers'
    },
    results: [
      { id: '01', name: 'Mobula', type: 'WEBSOCKET FEED', p50: '0.8 s', p90: '1.6 s', p99: '2.4 s', mean: '0.9 s', min: '0.6 s', max: '1.0 s', dField: '-75%', success: '99.77%', n: '51,751', trend: [1, 2, 1, 3, 2, 1, 2, 1, 2, 1] },
      { id: '02', name: 'Codex', type: 'GRAPHQL FEED', p50: '1.3 s', p90: '1.7 s', p99: '2.3 s', mean: '1.3 s', min: '1.4 s', max: '1.7 s', dField: '-58%', success: '99.76%', n: '51,684', trend: [3, 2, 4, 3, 2, 3, 2, 3, 2, 2] },
      { id: '03', name: 'GeckoTerminal', type: 'REST FEED', p50: '7.1 s', p90: '13.7 s', p99: '24.6 s', mean: '8.2 s', min: '7.8 s', max: '11.6 s', dField: '+133%', success: '99.65%', n: '51,705', trend: [8, 10, 7, 9, 8, 11, 7, 8, 9, 7] },
    ],
    regions: [
      { provider: 'Mobula', usEast: '806 ms', euWest: '759 ms', apSoutheast: '837 ms', color: '#FF5C00' },
      { provider: 'Codex', usEast: '1312 ms', euWest: '1317 ms', apSoutheast: '1365 ms', color: '#111111' },
      { provider: 'GeckoTerminal', usEast: '7343 ms', euWest: '6929 ms', apSoutheast: '8203 ms', color: '#CCCCCC' },
    ],
    chartData: Array.from({length: 48}).map((_, i) => {
      let timeStr = '';
      if (i === 0) timeStr = '-24h';
      else if (i === 12) timeStr = '-18h';
      else if (i === 24) timeStr = '-12h';
      else if (i === 36) timeStr = '-6h';
      else if (i === 47) timeStr = 'now';
      
      const pseudoRandom = (seed: number) => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
      };
      
      return {
        time: timeStr,
        GeckoTerminal: 7 + pseudoRandom(i + 1) * 4.5,
        Codex: 1.2 + pseudoRandom(i + 48) * 0.6,
        Mobula: 0.6 + pseudoRandom(i + 96) * 0.4,
      };
    })
  }
};

import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const data = BENCHMARK_DETAILS[slug] || BENCHMARK_DETAILS['fastest-onchain-data-provider'];
  return {
    title: `OpenChainBench - ${data.title}`
  };
}

export default function BenchmarkPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  // Only the specific slug is fully mocked, otherwise fall back to fastest on-chain
  const data = BENCHMARK_DETAILS[slug] || BENCHMARK_DETAILS['fastest-onchain-data-provider'];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-12">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-8 md:mb-12">
        <Link href="/" className="inline-flex items-center text-[13px] text-[#888] hover:text-[#111] transition-colors font-medium">
          <ArrowLeft className="w-3.5 h-3.5 mr-2" />
          All benchmarks
        </Link>
        <BenchmarkActions data={data} />
      </div>

      {/* Meta Area */}
      <div className="flex justify-between items-center mb-6">
         <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {data.tags.map((tag: any) => (
                <span key={tag.label} className="font-mono text-[10px] tracking-widest uppercase text-[#FF5C00]">
                  {tag.label}
                </span>
              ))}
            </div>
            {(data.results || data.lines) && (data.results || data.lines).length > 0 && (
              <div className="flex -space-x-1.5 mt-1">
                {(data.results || data.lines).slice(0, 4).map((row: any) => (
                  <div key={row.name} className="w-6 h-6 rounded-full bg-white border border-[#E5E5E5] flex items-center justify-center text-[9px] font-bold overflow-hidden text-[#111] shadow-sm">
                    {row.name.charAt(0)}                   
                  </div>
                ))}
              </div>
            )}
         </div>
         <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#888]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#888]"></div> 
            {data.tags.some((t: any) => t.live) ? 'Live' : 'Stale'} · Updated 6m ago
         </div>
      </div>

      <h1 className="text-3xl md:text-[40px] font-semibold tracking-tight text-[#111] mb-3 font-sans md:leading-[1.1]">
        {data.title}
      </h1>
      
      <p className="text-[18px] md:text-[20px] text-[#444] font-sans leading-relaxed max-w-3xl mb-8 tracking-tight">
        {data.description}
      </p>

      {/* Methodology Section */}
      <div className="border-t border-[#E5E5E5] mb-12">
        <details className="group border-b border-[#E5E5E5]">
          <summary className="flex justify-between items-center font-mono text-[10px] uppercase tracking-widest py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
             METHODOLOGY
             <span className="transition group-open:rotate-180 text-[#888]">
                <svg fill="none" height="16" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="16"><path d="M6 9l6 6 6-6"></path></svg>
             </span>
          </summary>
          <div className="text-[#444] font-sans text-[13px] leading-relaxed max-w-4xl pb-6">
            <p className="mb-6">
              We measure the gap between a transaction settling on chain and the same transaction appearing on each aggregator&apos;s data feed. The harness watches reference pools across Base, BNB Chain and Solana from three regions (us-east, eu-west, sgp), records every new on-chain event with millisecond timestamps, and observes when each aggregator&apos;s WebSocket reflects the same event. Lower is better.
            </p>
            <ul className="space-y-2 list-none text-[#555]">
              <li className="flex gap-2 before:content-['·'] before:text-[#888]">Aggregators measured: Mobula, Codex, GeckoTerminal.</li>
              <li className="flex gap-2 before:content-['·'] before:text-[#888]">Chains: Base, BNB Chain, Solana.</li>
              <li className="flex gap-2 before:content-['·'] before:text-[#888]">Regions: us-east, eu-west, sgp. Cross-region median reported in the headline.</li>
              <li className="flex gap-2 before:content-['·'] before:text-[#888]">Reference: archive nodes per chain, validated against block hashes.</li>
              <li className="flex gap-2 before:content-['·'] before:text-[#888]">Metric: gauge <code className="font-mono text-[11px] bg-[#F9F9F9] px-1 py-0.5 rounded-sm">head_lag_seconds</code>, sampled every 15 seconds. Aggregated over the 24-hour window using <code className="font-mono text-[11px] bg-[#F9F9F9] px-1 py-0.5 rounded-sm">quantile_over_time</code>.</li>
              <li className="flex gap-2 before:content-['·'] before:text-[#888]">Success rate: presence ratio. share of expected sampling slots where a value was actually emitted (5,760 expected per provider per day at the 15s cadence). 100% means the aggregator&apos;s feed was reachable for the full window.</li>
              <li className="flex gap-2 before:content-['·'] before:text-[#888]">Cardinality: 3 aggregators × 3 chains × 3 regions = 27 active series.</li>
            </ul>
          </div>
        </details>
      </div>

      {/* Aggregate Stats Bar */}
      <div className="bg-white p-4 md:px-6 md:py-4 mb-16 rounded-sm border border-[#E5E5E5] shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-wrap items-center justify-between text-[10px] font-mono uppercase tracking-widest gap-2">
         <div className="flex gap-6 items-center">
           <div className="flex items-center gap-2">
             <span className="text-[#888]">Best</span>
             <span className="text-[#111] font-semibold text-xs">{data.stats.best}</span>
           </div>
           <div className="flex items-center gap-2">
             <span className="text-[#888]">Median</span>
             <span className="text-[#111] font-semibold text-xs">{data.stats.median}</span>
           </div>
           <div className="flex items-center gap-2">
             <span className="text-[#888]">Worst</span>
             <span className="text-[#111] font-semibold text-xs">{data.stats.worst}</span>
           </div>
         </div>
         <div className="flex items-center gap-2">
           <span className="text-[#888]">Spread</span>
           <span className="text-[#111] font-semibold text-[11px] font-sans">10.6×</span>
           <span className="text-[#111] font-semibold text-[11px] font-sans flex items-center gap-2 ml-1 text-[#888]">2.3 s <ArrowLeft className="w-3 rotate-180 text-[#888] inline" /> 24.6 s</span>
         </div>
         <div className="flex items-center gap-2">
           <span className="text-[#888]">Samples · 24H</span>
           <span className="text-[#111] font-semibold text-xs">{data.stats.samples} <span className="text-[#888] font-normal uppercase">{data.stats.providers}</span></span>
         </div>
      </div>

      {/* Chart Section */}
      <div className="mb-16 bg-white p-6 md:p-8 rounded-sm border border-[#E5E5E5] shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#888]">Head Lag · Last 24 Hours</h3>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-[#888]">
               <button className="hover:text-[#111] transition-colors">1H</button>
               <button className="hover:text-[#111] transition-colors">6H</button>
               <button className="bg-[#FF5C00] text-white px-2 py-0.5 rounded-sm shadow-[0_2px_8px_rgba(255,92,0,0.25)]">24H</button>
               <button className="hover:text-[#111] transition-colors">7D</button>
            </div>
            <div className="w-px h-3 bg-[#E5E5E5] hidden md:block"></div>
            <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-[#888]">
               <span className="text-[#AAA] mr-1 hidden md:inline">REGION</span>
               <button className="bg-[#FF5C00] text-white px-2 py-0.5 rounded-sm shadow-[0_2px_8px_rgba(255,92,0,0.25)]">ALL</button>
               <button className="hover:text-[#111] transition-colors">AP-SOUTHEAST</button>
               <button className="hover:text-[#111] transition-colors">EU-WEST</button>
               <button className="hover:text-[#111] transition-colors">US-EAST</button>
            </div>
          </div>
        </div>
        <BenchmarkChart type="area" data={data.chartData} />
      </div>

      {/* Provider Ledger Table */}
      <div className="mb-16 bg-white p-6 md:p-8 rounded-sm border border-[#E5E5E5] shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-6">Provider Ledger · Sorted by P50</h3>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-t border-[#E5E5E5] border-b">
            <thead>
              <tr className="border-b border-[#E5E5E5] relative">
                <th colSpan={3} className="py-2 px-0 font-mono text-[10px] font-normal tracking-widest uppercase text-[#888] w-[25%] relative">Provider</th>
                <th colSpan={7} className="py-2 px-2 font-mono text-[10px] font-normal tracking-widest uppercase text-[#888] text-center bg-[#F9F9F9]">Latency Aggregates</th>
                <th colSpan={2} className="py-2 px-2 font-mono text-[10px] font-normal tracking-widest uppercase text-[#888] text-center border-l border-white/50">Reliability</th>
                <th className="py-2 px-0 font-mono text-[10px] font-normal tracking-widest uppercase text-[#888] text-right">Trend</th>
              </tr>
              <tr className="border-b border-[#F0F0F0]">
                <th className="py-2 px-0 font-mono text-[10px] font-normal tracking-widest uppercase text-[#888] w-8">Nº</th>
                <th className="py-2 px-0 font-mono text-[10px] font-normal tracking-widest uppercase text-[#888]" colSpan={2}>Name</th>
                
                <th className="py-2 px-2 font-mono text-[10px] font-normal tracking-widest uppercase text-[#888] text-center bg-[#F9F9F9]">P50</th>
                <th className="py-2 px-2 font-mono text-[10px] font-normal tracking-widest uppercase text-[#888] text-center bg-[#F9F9F9]">P90</th>
                <th className="py-2 px-2 font-mono text-[10px] font-normal tracking-widest uppercase text-[#888] text-center bg-[#F9F9F9]">P99</th>
                <th className="py-2 px-2 font-mono text-[10px] font-normal tracking-widest uppercase text-[#888] text-center bg-[#F9F9F9]">Mean</th>
                <th className="py-2 px-2 font-mono text-[10px] font-normal tracking-widest uppercase text-[#888] text-center">Min</th>
                <th className="py-2 px-2 font-mono text-[10px] font-normal tracking-widest uppercase text-[#888] text-center">Max</th>
                <th className="py-2 px-2 font-mono text-[10px] font-normal tracking-widest uppercase text-[#888] text-center">Δ Field</th>
                
                <th className="py-2 px-2 font-mono text-[10px] font-normal tracking-widest uppercase text-[#888] text-center">Success</th>
                <th className="py-2 px-2 font-mono text-[10px] font-normal tracking-widest uppercase text-[#888] text-center">N</th>
                
                <th className="py-2 px-0 font-mono text-[10px] font-normal tracking-widest uppercase text-[#888] text-right">24H</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0F0] text-[13px] font-mono tracking-tight text-[#444]">
              {data.results.map((row: any, i: number) => (
                <tr key={row.id} className="hover:bg-black/5 transition-colors group">
                  <td className="py-4 pl-3 pr-0 text-[#888] text-[10px] align-top relative w-8">
                    <div className="absolute top-4 left-0 w-0.5 h-4" style={{ backgroundColor: data.regions[i]?.color || '#000' }}></div>
                    {row.id}
                  </td>
                  <td className="py-4 px-0 align-top" colSpan={2}>
                     <div className="font-bold text-[#111] font-sans text-[14px] leading-none mb-1.5 pt-0.5 flex items-center">
                        <div className="w-5 h-5 rounded-full bg-white border border-[#E5E5E5] flex items-center justify-center text-[8px] font-bold overflow-hidden text-[#111] shrink-0 mr-2">{row.name.charAt(0)}</div>
                        {row.name} 
                        <span className="text-[8px] font-mono font-normal tracking-widest uppercase text-[#888] ml-2 align-middle">{row.type}</span>
                     </div>
                  </td>
                  
                  <td className="py-4 px-2 text-center align-top bg-[#F9F9F9]/50 bg-gradient-to-r from-transparent to-[#F9F9F9] relative">
                     {i === 0 && <span className="absolute left-1 top-4 text-[8px] text-[#FF5C00]">◀</span>}
                     <span className="font-semibold text-[#111]">{row.p50}</span>
                  </td>
                  <td className="py-4 px-2 text-center align-top bg-[#F9F9F9]">
                     <div className="flex flex-col"><span className="text-[#111]">{row.p90.split(' ')[0]}</span><span className="text-[#888] text-[9px] uppercase">s</span></div>
                  </td>
                  <td className="py-4 px-2 text-center align-top bg-[#F9F9F9]">
                     <div className="flex flex-col"><span className="text-[#111]">{row.p99.split(' ')[0]}</span><span className="text-[#888] text-[9px] uppercase">s</span></div>
                  </td>
                  <td className="py-4 px-2 text-center align-top bg-[#F9F9F9]">
                     <div className="flex flex-col"><span className="text-[#111]">{row.mean.split(' ')[0]}</span><span className="text-[#888] text-[9px] uppercase">s</span></div>
                  </td>
                  <td className="py-4 px-2 text-center align-top">
                    <div className="flex flex-col"><span className="text-[#111]">{row.min.split(' ')[0]}</span><span className="text-[#888] text-[9px] uppercase">s</span></div>
                  </td>
                  <td className="py-4 px-2 text-center align-top">
                    <div className="flex flex-col"><span className="text-[#111]">{row.max.split(' ')[0]}</span><span className="text-[#888] text-[9px] uppercase">s</span></div>
                  </td>
                  <td className="py-4 px-2 text-center align-top">{row.dField}</td>
                  
                  <td className="py-4 px-2 text-center align-top">{row.success}</td>
                  <td className="py-4 px-2 text-center align-top">{row.n}</td>
                  
                  <td className="py-4 px-0 align-middle text-right">
                    <ChartPlaceholder trend={row.trend} color={data.regions[i]?.color || '#888'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Regional Table */}
      <div className="mb-16 bg-white p-6 md:p-8 rounded-sm border border-[#E5E5E5] shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-6">By Region</h3>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-t border-[#E5E5E5]">
           <thead>
             <tr className="border-b border-[#E5E5E5]">
                <th className="py-2 px-0 font-mono text-[10px] font-normal tracking-widest uppercase text-[#888] w-[25%] p-4">Provider</th>
                <th className="py-2 px-4 font-mono text-[10px] font-normal tracking-widest uppercase text-[#888] w-[25%] text-left">US-East</th>
                <th className="py-2 px-4 font-mono text-[10px] font-normal tracking-widest uppercase text-[#888] w-[25%] text-left">EU-West</th>
                <th className="py-2 px-4 font-mono text-[10px] font-normal tracking-widest uppercase text-[#888] w-[25%] text-left">AP-Southeast</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-[#E5E5E5] text-[13px] font-mono tracking-tight text-[#444]">
             {data.regions.map((region: any) => (
                <tr key={region.provider} className="hover:bg-black/5 transition-colors group">
                  <td className="py-4 px-0 p-4">
                    <div className="flex items-center font-bold font-sans text-[14px]" style={{ color: region.color === '#CCCCCC' ? '#111' : region.color }}>
                      <div className="w-5 h-5 rounded-full bg-white border border-[#E5E5E5] flex items-center justify-center text-[8px] font-bold overflow-hidden text-[#111] shrink-0 mr-2" style={{ color: '#111' }}>{region.provider.charAt(0)}</div>
                      {region.provider}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                       <div className="w-full max-w-[120px] h-1.5 bg-[#F0F0F0] rounded-full relative">
                         <div className="h-full rounded-full absolute top-0 left-0" style={{ width: `${Math.max(5, Math.min((parseFloat(region.usEast) / 8500) * 100, 100))}%`, backgroundColor: region.color }}></div>
                       </div>
                       <span className="flex-shrink-0 text-left w-16 font-mono text-[11px]" style={{ color: region.color === '#CCCCCC' ? '#888' : region.color }}>{region.usEast}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                       <div className="w-full max-w-[120px] h-1.5 bg-[#F0F0F0] rounded-full relative">
                         <div className="h-full rounded-full absolute top-0 left-0" style={{ width: `${Math.max(5, Math.min((parseFloat(region.euWest) / 8500) * 100, 100))}%`, backgroundColor: region.color }}></div>
                       </div>
                       <span className="flex-shrink-0 text-left w-16 font-mono text-[11px]" style={{ color: region.color === '#CCCCCC' ? '#888' : region.color }}>{region.euWest}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                       <div className="w-full max-w-[120px] h-1.5 bg-[#F0F0F0] rounded-full relative">
                         <div className="h-full rounded-full absolute top-0 left-0" style={{ width: `${Math.max(5, Math.min((parseFloat(region.apSoutheast) / 8500) * 100, 100))}%`, backgroundColor: region.color }}></div>
                       </div>
                       <span className="flex-shrink-0 text-left w-16 font-mono text-[11px]" style={{ color: region.color === '#CCCCCC' ? '#888' : region.color }}>{region.apSoutheast}</span>
                    </div>
                  </td>
                </tr>
             ))}
           </tbody>
          </table>
        </div>
      </div>

      {/* Share / Export */}
      <div className="bg-white p-6 md:p-8 rounded-sm border border-[#E5E5E5] shadow-[0_4px_24px_rgba(0,0,0,0.02)] pb-12">
        <details className="group border-b border-[#E5E5E5]">
          <summary className="flex justify-between items-center font-mono text-[10px] uppercase tracking-widest py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
             Share · Embed
             <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
             </span>
          </summary>
          <div className="pb-8">
            <ShareableCards data={data} />
            <div className="mt-12 pt-8 border-t border-[#F0F0F0]">
               <span className="text-[#888] font-mono text-[10px] uppercase tracking-widest flex items-center gap-4">
                 SOURCE CODE 
                 <a href="#" className="border-b border-[#888] hover:text-[#111] hover:border-[#111] transition-colors flex items-center gap-1">
                   GITHUB.COM/OPENCHAINBENCH/OPENCHAINBENCH/TREE/MAIN/HARNESSES/AGGREGATOR-HEAD-LAG <ExternalLink className="w-3 h-3" />
                 </a>
               </span>
            </div>
          </div>
        </details>
      </div>
      
      {/* More Benchmarks */}
      <div className="pt-24 pb-12 w-full relative">
        <div className="relative z-10">
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-8">More Benchmarks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {BENCHMARKS_LIST.filter(b => b.id !== data.id).slice(0, 3).map((item) => (
                <Link key={item.id} href={`/benchmarks/${item.id}`} className="block border border-[#E5E5E5] rounded-[4px] p-6 hover:bg-[#F9F9F9] transition-colors bg-white/80 backdrop-blur-sm hover:border-[#111]/20 group flex flex-col justify-between h-full">
                  <div>
                    <div className="flex gap-2 font-mono text-[9px] uppercase tracking-widest items-center mb-4">
                      <span className="bg-[#F5F5F5] border border-[#E5E5E5] px-2 py-0.5 rounded-sm text-[#666]">{item.category}</span>
                    </div>
                    <h4 className="text-[15px] font-semibold text-[#111] font-sans mb-3 tracking-tight group-hover:text-[#FF5C00] transition-colors leading-snug">{item.title}</h4>
                    <p className="text-[13px] text-[#777] font-sans leading-snug mb-8 line-clamp-3">{item.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-auto">
                     <div className="flex -space-x-1.5">
                       {item.lines?.slice(0, 4).map((line) => (
                         <div key={line.name} className="w-5 h-5 rounded-full bg-white border border-[#E5E5E5] flex items-center justify-center text-[8px] font-bold overflow-hidden text-[#111]">
                           {line.name.charAt(0)}
                         </div>
                       ))}
                     </div>
                  </div>
                </Link>
             ))}
          </div>
        </div>
      </div>

    </div>
  );
}
