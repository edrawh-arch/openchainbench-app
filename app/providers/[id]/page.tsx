"use client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Code } from "lucide-react";
import { PROVIDERS_LIST, BENCHMARKS_LIST } from "@/lib/mock-data";
export default function ProviderDetail({ params }: { params: { id: string } }) {
  const provider = PROVIDERS_LIST.find((p) => p.id === params.id);
  if (!provider) {
    notFound();
  } // Generate fake records based on the provider to match the screenshot
  const records = BENCHMARKS_LIST.slice(0, provider.benches)
    .map((bench, idx) => {
      // Fake placement stuff
      const place = idx < provider.firstPlaces ? 1 : (idx % 3) + 2;
      const value =
        bench.lines?.[0]?.data?.[
          (bench.lines?.[0]?.data?.length || 1) - 1
        ]?.toFixed(1) || "0.0";
      return {
        place,
        total: bench.providers,
        title: bench.title,
        category: bench.category,
        desc: bench.description.split(".")[0], // Short description
        value: value,
        unit: bench.unit,
      };
    })
    .sort((a, b) => a.place - b.place);
  return (
    <div className="w-full flex justify-center py-24 bg-transparent min-h-screen">
      
      <div className="w-full max-w-[1000px] px-6">
        
        <Link
          href="/providers"
          className="inline-flex items-center gap-1.5 text-[13px] text-[#888] font-sans hover:text-[#111] transition-colors mb-12 group dark:text-[#71717A] dark:hover:text-[#FFFFFF]"
        >
          
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          All providers
        </Link>
        {/* Header Section */}
        <div className="flex items-center gap-6 mb-12 pb-12 border-b border-[#E5E5E5] dark:border-[#222222]">
          
          <div
            className="w-[88px] h-[88px] rounded-full flex items-center justify-center text-[42px] font-bold font-sans overflow-hidden shrink-0 border border-[#111]/10 shadow-sm"
            style={{ backgroundColor: provider.logoBg, color: provider.logoFg }}
          >
            
            {provider.name.charAt(0)}
          </div>
          <div className="flex flex-col gap-1.5 pt-1">
            
            <h1 className="text-4xl md:text-[46px] font-semibold tracking-tight text-[#111] font-sans leading-none dark:text-white">
              
              {provider.name}
            </h1>
            <div className="flex items-center gap-3 text-[11px] font-mono text-[#666] uppercase tracking-widest mt-2 dark:text-[#A1A1AA]">
              
              <span className="flex items-center gap-1.5">
                
                <span className="w-1.5 h-1.5 rounded-full bg-[#111]"></span>
                {provider.benches} BENCHMARKS
              </span>
              <span className="flex items-center gap-1.5">
                
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A152]"></span>
                {provider.firstPlaces} #1 FINISH
                {provider.firstPlaces !== 1 ? "ES" : ""}
              </span>
            </div>
          </div>
        </div>
        {/* Info row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-16 px-2">
          
          <div className="flex flex-col gap-4">
            
            <p className="text-[18px] text-[#555] font-sans leading-relaxed max-w-2xl tracking-tight dark:text-[#A1A1AA]">
              
              Onchain market data API for EVM and Solana. GraphQL and WebSocket
              feeds for tokens, pairs, trades, and pricing.
            </p>
            <div className="flex items-center gap-2">
              
              {provider.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono uppercase tracking-widest text-[#666] bg-[#F5F5F5] dark:bg-[#111] px-2 py-1 rounded-[2px] border border-[#E5E5E5] dark:text-[#A1A1AA] dark:bg-[#111111] dark:border-[#222222]"
                >
                  
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3 font-mono text-[10px] uppercase tracking-widest shrink-0 pt-1">
            
            <Link
              href="#"
              className="text-[#888] hover:text-[#111] transition-colors flex items-center gap-1.5 border-b border-transparent hover:border-[#111] pb-0.5 dark:text-[#71717A] dark:hover:text-[#FFFFFF] dark:hover:border-[#FFFFFF]"
            >
              
              WWW.{provider.name.toUpperCase()}.IO
              <ExternalLink className="w-3 h-3" />
            </Link>
            <Link
              href="#"
              className="text-[#888] hover:text-[#111] transition-colors flex items-center gap-1.5 border-b border-transparent hover:border-[#111] pb-0.5 dark:text-[#71717A] dark:hover:text-[#FFFFFF] dark:hover:border-[#FFFFFF]"
            >
              
              @{provider.name.toUpperCase()}DATA
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
        {/* Benchmark Record Section */}
        <div className="mb-16">
          
          <h2 className="text-[11px] font-mono text-[#888] uppercase tracking-widest mb-6 px-2 dark:text-[#71717A]">
            
            BENCHMARK RECORD
          </h2>
          <div className="flex flex-col border border-[#E5E5E5] rounded-sm bg-white shadow-sm dark:border-[#222222] dark:bg-[#0A0A0A]">
            
            {records.map((record, i) => (
              <div
                key={i}
                className={`flex flex-col md:flex-row md:items-center justify-between p-6 group ${i !== records.length - 1 ? "border-b border-[#E5E5E5]" : ""} hover:bg-[#F9F9F9] transition-colors dark:hover:bg-[#111111]`}
              >
                
                <div className="flex items-center gap-6 mb-4 md:mb-0">
                  
                  <div className="flex flex-col items-center justify-center w-12 shrink-0">
                    
                    <div
                      className={`font-mono text-2xl font-bold mb-1 ${record.place === 1 ? "text-[#00A152]" : "text-[#888]"}`}
                    >
                      
                      #{record.place}
                    </div>
                    <div className="font-mono text-[8px] uppercase tracking-widest text-[#AAA] dark:text-[#52525B]">
                      
                      OF {record.total}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    
                    <div className="flex items-center gap-2 mb-1">
                      
                      <Link
                        href={`/benchmarks/${record.title.toLowerCase().replace(/\s+/g, "-")}`}
                        className="font-semibold text-[17px] text-[#111] font-sans hover:text-[#FF5C00] transition-colors leading-none tracking-tight dark:text-white"
                      >
                        
                        {record.title}
                      </Link>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#AAA] bg-[#F5F5F5] dark:bg-[#111] px-1.5 py-0.5 rounded-[2px] border border-[#E5E5E5] leading-none dark:text-[#52525B] dark:bg-[#111111] dark:border-[#222222]">
                        
                        {record.category}
                      </span>
                    </div>
                    <div className="text-[13px] text-[#888] font-sans mt-1 dark:text-[#71717A]">
                      
                      {record.desc}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start md:items-end pl-[72px] md:pl-0 pt-2 md:pt-0">
                  
                  <div className="font-mono text-[18px] text-[#111] font-medium mb-1.5 dark:text-white">
                    
                    {record.value}
                    <span className="text-[13px] text-[#888] font-sans font-normal ml-0.5 dark:text-[#71717A]">
                      
                      {record.unit}
                    </span>
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-[#AAA] flex items-center gap-1.5 dark:text-[#52525B]">
                    
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5E5E5]"></span>
                    P50 · 24H
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Embeddable Badges */}
        <div className="pt-8 mb-16 border-t border-[#E5E5E5] dark:border-[#222222]">
          
          <h2 className="text-[11px] font-mono text-[#888] uppercase tracking-widest mb-4 px-2 dark:text-[#71717A]">
            
            EMBEDDABLE BADGES
          </h2>
          <div className="px-2 mb-8">
            
            <p className="text-[16px] text-[#666] font-sans leading-relaxed tracking-tight max-w-2xl dark:text-[#A1A1AA]">
              
              Drop these on your site to show your standing on a benchmark. The
              SVG fetches the latest figures on every request, so the badge
              stays accurate without redeploying.
            </p>
          </div>
          <div className="border border-[#E5E5E5] rounded-sm p-8 bg-[#FAFAFA] dark:bg-[#111] max-w-3xl dark:border-[#222222] dark:bg-[#080808]">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              
              <div>
                
                <div className="text-[10px] font-mono text-[#888] uppercase tracking-widest mb-4 font-medium dark:text-[#71717A]">
                  
                  {records[0]?.title.toUpperCase() ||
                    "BEST PROVIDER FOR TOKEN ONCHAIN METADATA"}
                </div>
                {/* Fake Badge */}
                <div className="flex border border-[#E5E5E5] rounded-sm overflow-hidden h-10 w-full max-w-[300px] shadow-sm bg-white dark:border-[#222222] dark:bg-[#0A0A0A]">
                  
                  <div className="bg-[#467d5e] text-white flex flex-col justify-center px-3 border-r border-[#E5E5E5] w-[60px] shrink-0 dark:border-[#222222]">
                    
                    <div className="text-[8px] font-bold font-mono tracking-widest uppercase mb-0.5 leading-none">
                      
                      OCB
                    </div>
                    <div className="text-[11px] font-bold font-mono leading-none">
                      
                      #{records[0]?.place || 1}/{records[0]?.total || 3}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center px-3 flex-1 overflow-hidden">
                    
                    <div className="text-[10px] font-mono font-bold text-[#111] truncate mb-0.5 leading-none dark:text-white">
                      
                      {records[0]?.title ||
                        "Best provider for token onchain metadata"}
                    </div>
                    <div className="text-[9px] font-mono text-[#888] leading-none dark:text-[#71717A]">
                      
                      {records[0]?.value || "52.5"}% (24h avg)
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-end self-start md:self-end">
                
                <button className="h-10 px-4 bg-white border border-[#E5E5E5] rounded-sm text-[12px] font-mono text-[#111] hover:bg-[#F5F5F5] dark:hover:bg-[#222] transition-colors flex items-center gap-2 font-medium shadow-sm dark:bg-[#0A0A0A] dark:border-[#222222] dark:text-white dark:hover:bg-[#1A1A1A]">
                  
                  <Code className="w-3.5 h-3.5" /> COPY HTML
                </button>
              </div>
            </div>
            <div className="bg-[#111] rounded-sm p-4 text-[#00FF41] font-mono text-[11px] overflow-x-auto">
              
              <pre>
                
                {`<a href="https://onchainbench.com/benchmarks/${(records[0]?.title || "best-provider").toLowerCase().replace(/\s+/g, "-")}"> <img src="https://onchainbench.com/api/badge/${provider.id}/${(records[0]?.title || "best-provider").toLowerCase().replace(/\s+/g, "-")}.svg" alt="OnchainBench Badge" />
</a>`}
              </pre>
            </div>
          </div>
          <div className="mt-8 px-2 flex items-center gap-4">
            
            <div className="text-[10px] font-mono text-[#888] uppercase tracking-widest flex items-center gap-1.5 dark:text-[#71717A]">
              
              <span className="w-1.5 h-1.5 rounded-full bg-[#111]"></span> RAW
              FIGURES
            </div>
            <Link
              href="#"
              className="text-[10px] font-mono uppercase tracking-widest text-[#888] border-b border-[#E5E5E5] hover:border-[#111] hover:text-[#111] transition-colors flex items-center gap-1 pb-px dark:text-[#71717A] dark:border-[#222222] dark:hover:border-[#FFFFFF] dark:hover:text-[#FFFFFF]"
            >
              
              /API/CITABLE <ExternalLink className="w-2.5 h-2.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
