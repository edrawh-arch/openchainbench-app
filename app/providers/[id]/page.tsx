'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { PROVIDERS_LIST, BENCHMARKS_LIST } from '@/lib/mock-data';
import { use } from 'react';

export default function ProviderDetail({ params }: { params: { id: string } }) {
  const provider = PROVIDERS_LIST.find(p => p.id === params.id);
  
  if (!provider) {
    notFound();
  }

  // Generate fake records based on the provider to match the screenshot
  const records = BENCHMARKS_LIST.slice(0, provider.benches).map((bench, idx) => {
    // Fake placement stuff
    const place = idx < provider.firstPlaces ? 1 : (idx % 3) + 2;
    const value = bench.lines[0]?.data?.[bench.lines[0]?.data?.length - 1]?.toFixed(1) || '0.0';
    return {
      place,
      total: bench.providers,
      title: bench.title,
      category: bench.category,
      desc: bench.description.split('.')[0], // Short description
      value: value,
      unit: bench.unit
    };
  }).sort((a, b) => a.place - b.place);

  return (
    <div className="w-full flex justify-center py-24 bg-transparent min-h-screen">
      <div className="w-full max-w-[1000px] px-6">
        
        <Link href="/providers" className="inline-flex items-center gap-2 text-[13px] text-[#888] font-sans hover:text-[#111] transition-colors mb-10">
          <ArrowLeft className="w-3.5 h-3.5" />
          All providers
        </Link>
        
        {/* Header Section */}
        <div className="flex items-center gap-5 mb-16 pb-16 border-b border-[#111]">
           <div className="w-[88px] h-[88px] rounded-full flex items-center justify-center text-[42px] font-bold font-sans overflow-hidden shrink-0 border border-[#111]/10 shadow-sm" style={{ backgroundColor: provider.logoBg, color: provider.logoFg }}>
              {provider.name.charAt(0)}
           </div>
           <div className="flex flex-col gap-1.5 pt-1">
             <h1 className="text-4xl md:text-[46px] font-semibold tracking-tight text-[#111] font-sans leading-none">
               {provider.name}
             </h1>
             <div className="flex items-center gap-3 text-[11px] font-mono text-[#666] uppercase tracking-widest mt-1">
               <span>{provider.benches} BENCHMARKS</span>
               <span className="w-0.5 h-0.5 rounded-full bg-[#666]"></span>
               <span>{provider.firstPlaces} <span className="text-[#00A152] font-semibold">#1</span> FINISH</span>
             </div>
           </div>
        </div>

        {/* Info row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-16">
          <p className="text-[18px] text-[#555] font-sans leading-relaxed max-w-2xl tracking-tight">
            Onchain market data API for EVM and Solana. GraphQL and WebSocket feeds for tokens, pairs, trades, and pricing.
          </p>
          <div className="flex flex-col items-start md:items-end gap-3 font-mono text-[10px] uppercase tracking-widest">
             <Link href="#" className="text-[#888] hover:text-[#111] transition-colors flex items-center gap-1.5 border-b border-transparent hover:border-[#111] pb-0.5">
               WWW.{provider.name.toUpperCase()}.IO <ExternalLink className="w-3 h-3" />
             </Link>
             <Link href="#" className="text-[#888] hover:text-[#111] transition-colors flex items-center gap-1.5 border-b border-transparent hover:border-[#111] pb-0.5">
               @{provider.name.toUpperCase()}DATA <ExternalLink className="w-3 h-3" />
             </Link>
          </div>
        </div>

        {/* Benchmark Record Section */}
        <div className="mb-16">
          <h2 className="text-[11px] font-mono text-[#888] uppercase tracking-widest mb-6">
            BENCHMARK RECORD
          </h2>
          <div className="flex flex-col border-t border-[#E5E5E5]">
            {records.map((record, i) => (
               <div key={i} className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-[#E5E5E5] group">
                  <div className="flex items-center gap-6 mb-4 md:mb-0">
                     <div className="flex flex-col items-center justify-center w-12 shrink-0">
                        <div className={`font-mono text-2xl font-bold mb-1 ${record.place === 1 ? 'text-[#00A152]' : 'text-[#888]'}`}>
                          #{record.place}
                        </div>
                        <div className="font-mono text-[8px] uppercase tracking-widest text-[#AAA]">
                          OF {record.total}
                        </div>
                     </div>
                     <div className="flex flex-col">
                        <div className="text-[9px] font-mono uppercase tracking-widest text-[#888] mb-1">
                          {record.category}
                        </div>
                        <div className="font-semibold text-[17px] text-[#111] font-sans group-hover:text-[#FF5C00] transition-colors mb-0.5">
                          {record.title}
                        </div>
                        <div className="text-[13px] text-[#888] font-sans">
                          {record.desc}
                        </div>
                     </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end pl-[72px] md:pl-0">
                     <div className="font-mono text-[17px] text-[#111] font-medium mb-1.5">
                        {record.value} <span className="text-[13px] text-[#888] font-sans font-normal ml-0.5">{record.unit}</span>
                     </div>
                     <div className="font-mono text-[9px] uppercase tracking-widest text-[#AAA]">
                        P50 · 24H
                     </div>
                  </div>
               </div>
            ))}
          </div>
        </div>

        {/* Embeddable Badges */}
        <div>
          <h2 className="text-[11px] font-mono text-[#888] uppercase tracking-widest mb-4">
            EMBEDDABLE BADGES
          </h2>
          <p className="text-[15px] text-[#555] font-sans leading-relaxed max-w-2xl tracking-tight mb-6">
            Drop these on your site to show your standing on a benchmark. The SVG fetches the latest figures on every request, so the badge stays accurate without redeploying.
          </p>
          <div className="border border-[#E5E5E5] rounded-sm p-6 bg-white overflow-hidden max-w-2xl">
             <div className="text-[9px] font-mono text-[#888] uppercase tracking-widest mb-4">
               {records[0]?.title.toUpperCase() || 'BEST PROVIDER FOR TOKEN ONCHAIN METADATA'}
             </div>
             
             {/* Fake Badge */}
             <div className="mb-6 flex">
                <div className="flex border border-[#E5E5E5] rounded-sm overflow-hidden h-10 w-[300px]">
                   <div className="bg-[#467d5e] text-white flex flex-col justify-center px-3 border-r border-[#E5E5E5] w-[60px] shrink-0">
                      <div className="text-[8px] font-bold font-mono tracking-widest uppercase mb-0.5 leading-none">OCB</div>
                      <div className="text-[11px] font-bold font-mono leading-none">#{records[0]?.place || 1}/{records[0]?.total || 3}</div>
                   </div>
                   <div className="bg-[#FAF9F5] flex flex-col justify-center px-3 flex-1 overflow-hidden">
                      <div className="text-[10px] font-mono font-bold text-[#111] truncate mb-0.5 leading-none">
                        {records[0]?.title || 'Best provider for token onchain metadata'}
                      </div>
                      <div className="text-[9px] font-mono text-[#888] leading-none">
                        {records[0]?.value || '52.5'}% (24h avg)
                      </div>
                   </div>
                </div>
             </div>

             <button className="text-[11px] font-mono text-[#888] hover:text-[#111] transition-colors flex items-center gap-1.5 uppercase font-medium">
               <span className="scale-x-75 text-[14px]">▶</span> COPY HTML
             </button>
          </div>
          
          <div className="mt-12 text-[10px] font-mono text-[#888] uppercase tracking-widest">
            RAW FIGURES <Link href="#" className="border-b border-[#E5E5E5] hover:border-[#111] hover:text-[#111] pb-0.5 ml-1 transition-colors">/API/CITABLE <ExternalLink className="inline w-3 h-3 ml-0.5 relative -top-[1px]" /></Link>
          </div>
        </div>

      </div>
    </div>
  );
}
