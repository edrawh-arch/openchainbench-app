"use client";
import Link from "next/link";
import { useState, useMemo, useEffect, useRef } from "react";
import { Search, LayoutGrid, List } from "lucide-react";
import { BENCHMARKS_LIST } from "@/lib/mock-data";
import { MiniMultiLineChart } from "@/components/mini-chart";
export default function BenchmarksIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const searchInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
  const categories = useMemo(() => {
    const cats = new Set(BENCHMARKS_LIST.map((b) => b.category));
    return ["ALL", ...Array.from(cats).sort()];
  }, []);
  const filteredBenchmarks = useMemo(() => {
    return BENCHMARKS_LIST.filter((item) => {
      const matchesSearch =
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "ALL" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);
  return (
    <div className="w-full flex justify-center py-24 bg-transparent min-h-screen">
      
      <div className="w-full max-w-[1400px] px-6">
        
        {/* Header Section */}
        <div className="mb-12">
          
          <h1 className="text-4xl md:text-[42px] font-semibold tracking-tight text-[#111] mb-4 font-sans dark:text-white">
            
            All benchmarks
          </h1>
          <p className="text-[20px] text-[#777] font-sans leading-relaxed max-w-2xl tracking-tight dark:text-[#A1A1AA]">
            
            Comprehensive registry of open, reproducible benchmarks running
            across major protocols, bridges and indexers.
          </p>
        </div>
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          
          <div className="flex flex-wrap items-center gap-2">
            
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-sm font-mono text-[10px] uppercase tracking-widest transition-colors ${selectedCategory === cat ? "bg-[#FF5C00] text-white border border-[#FF5C00] shadow-[0_2px_8px_rgba(255,92,0,0.25)]" : "bg-white text-[#666] border-[#E5E5E5] hover:border-[#111] hover:text-[#111]"} dark:text-[#A1A1AA] dark:border-[#222222] dark:hover:border-[#FFFFFF]`}
              >
                
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0 flex-col md:flex-row">
            
            <div className="flex items-center bg-white border border-[#E5E5E5] p-1 rounded-sm self-start md:self-auto h-[38px] dark:bg-[#0A0A0A] dark:border-[#222222]">
              
              <button
                onClick={() => setViewMode("card")}
                className={`p-1.5 rounded-sm transition-colors ${viewMode === "card" ? "bg-[#F0F0F0] text-[#111] shadow-sm" : "text-[#888] hover:text-[#111]"} dark:text-white`}
                aria-label="Card View"
              >
                
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded-sm transition-colors ${viewMode === "table" ? "bg-[#F0F0F0] text-[#111] shadow-sm" : "text-[#888] hover:text-[#111]"} dark:text-white`}
                aria-label="Table View"
              >
                
                <List className="w-4 h-4" />
              </button>
            </div>
            <div className="relative w-full md:w-[280px] h-[38px]">
              
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none w-[38px] h-[38px]">
                
                <Search className="h-4 w-4 text-[#888] dark:text-[#71717A]" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-12 py-2 bg-white border border-[#E5E5E5] rounded-sm text-sm focus:outline-none focus:border-[#111] focus:ring-1 focus:ring-[#111] transition-colors font-sans text-[#111] shadow-[0_2px_8px_rgba(0,0,0,0.02)] placeholder:text-[#AAA] h-full dark:bg-[#0A0A0A] dark:border-[#222222] dark:text-white dark:placeholder:text-[#52525B]"
              />
              <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none h-full">
                
                <span className="text-[10px] font-mono text-[#AAA] border border-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#111] px-1.5 py-0.5 rounded-[2px] dark:text-[#52525B] dark:border-[#222222] dark:bg-[#080808]">
                  
                  ⌘K
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Benchmarks Grid / Table */}
        {viewMode === "table" ? (
          <div className="bg-white border border-[#E5E5E5] rounded-sm overflow-hidden overflow-x-auto shadow-sm relative z-10 w-full mb-16 dark:bg-[#0A0A0A] dark:border-[#222222]">
            
            <table className="w-full text-left font-sans text-sm min-w-[800px]">
              
              <thead className="bg-[#FAFAFA] dark:bg-[#111] border-b border-[#E5E5E5] font-mono text-[10px] uppercase tracking-widest text-[#888] dark:bg-[#080808] dark:border-[#222222] dark:text-[#71717A]">
                
                <tr>
                  
                  <th className="px-5 py-4 font-normal">Benchmark</th>
                  <th className="px-5 py-4 font-normal">Category</th>
                  <th className="px-5 py-4 font-normal">Providers</th>
                  <th className="px-5 py-4 font-normal w-[240px]">24H View</th>
                  <th className="px-5 py-4 font-normal text-right">
                    
                    P50 · 24H
                  </th>
                  <th className="px-5 py-4 font-normal text-right">
                    Samples
                  </th>
                  <th className="px-5 py-4 font-normal">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5]">
                
                {filteredBenchmarks.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#F9F9F9] transition-colors group dark:hover:bg-[#111111]"
                  >
                    
                    <td className="px-5 py-4">
                      
                      <Link
                        href={`/benchmarks/${item.id}`}
                        className="inline-block group-hover:text-[#FF5C00] font-semibold text-[#111] transition-colors dark:text-white"
                      >
                        
                        {item.title}
                      </Link>
                    </td>
                    <td className="px-5 py-4">
                      
                      <span className="px-2 py-0.5 rounded-sm bg-[#F5F5F5] dark:bg-[#111] border border-[#E5E5E5] font-mono text-[9px] uppercase tracking-widest text-[#666] dark:bg-[#111111] dark:border-[#222222] dark:text-[#A1A1AA]">
                        
                        {item.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-mono text-[11px] text-[#111] dark:text-white">
                      
                      {item.providers}
                    </td>
                    <td className="px-5 py-4">
                      
                      <div className="w-[180px] h-[30px] pointer-events-none flex items-center">
                        
                        {item.lines ? (
                          <MiniMultiLineChart
                            lines={item.lines}
                            height="100%"
                          />
                        ) : (
                          <div className="w-full flex gap-1">
                            
                            <div className="h-4 flex-1 bg-black/5 rounded-sm"></div>
                            <div className="h-4 flex-1 bg-black/5 rounded-sm w-3/4"></div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      
                      <div className="font-mono text-[14px] text-[#111] font-medium dark:text-white">
                        
                        {item.value}
                        <span className="text-[11px] text-[#888] font-sans font-normal dark:text-[#71717A]">
                          
                          {item.unit}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-mono text-[11px] text-[#555] text-right dark:text-[#A1A1AA]">
                      
                      {item.samples}
                    </td>
                    <td className="px-5 py-4 font-mono text-[10px] text-[#888] dark:text-[#71717A]">
                      
                      {item.updatedAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredBenchmarks.length === 0 && (
              <div className="p-8 text-center text-[#888] text-sm py-12 dark:text-[#71717A]">
                
                No benchmarks found matching your criteria.
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative">
            
            {filteredBenchmarks.map((item) => (
              <Link
                key={item.id}
                href={`/benchmarks/${item.id}`}
                className="bg-white/80 /80 border border-[#E5E5E5] backdrop-blur-sm rounded-sm p-5 hover:border-[#FF5C00]/50 hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all block group flex flex-col relative z-10 dark:bg-[#0A0A0A]/80 dark:border-[#222222]"
              >
                
                <div className="flex items-center gap-4 mb-4">
                  
                  <div className="px-2 py-0.5 rounded-sm bg-[#F5F5F5] dark:bg-[#111] border border-[#E5E5E5] font-mono text-[9px] uppercase tracking-widest text-[#666] dark:bg-[#111111] dark:border-[#222222] dark:text-[#A1A1AA]">
                    
                    {item.category}
                  </div>
                  <div className="flex -space-x-1.5">
                    
                    {item.lines?.slice(0, 4).map((line) => (
                      <div
                        key={line.name}
                        className="w-5 h-5 rounded-full bg-white border border-[#E5E5E5] flex items-center justify-center text-[8px] font-bold overflow-hidden text-[#111] dark:bg-[#0A0A0A] dark:border-[#222222] dark:text-white"
                      >
                        
                        {line.name.charAt(0)}
                      </div>
                    ))}
                  </div>
                </div>
                <h3 className="text-[15px] font-semibold text-[#111] font-sans group-hover:text-[#FF5C00] tracking-tight mb-5 leading-snug transition-colors dark:text-white">
                  
                  {item.title}
                </h3>
                <div className="text-[9px] font-mono text-[#888] uppercase tracking-widest mb-1.5 dark:text-[#71717A]">
                  
                  FIELD COMPOSITE · P50
                </div>
                <div className="flex justify-between items-end mb-4">
                  
                  <div className="font-bold text-[28px] font-mono leading-none tracking-tight text-[#111] dark:text-white">
                    
                    {item.value}
                    <span className="text-[14px] text-[#888] ml-1 font-sans font-normal tracking-normal dark:text-[#71717A]">
                      
                      {item.unit}
                    </span>
                  </div>
                  <div className="text-[9px] font-mono text-[#AAA] mb-0.5 dark:text-[#52525B]">
                    
                    24H
                  </div>
                </div>
                <div className="h-[48px] mb-3 pointer-events-none flex items-center">
                  
                  {item.lines ? (
                    <MiniMultiLineChart lines={item.lines} height="100%" />
                  ) : (
                    <div className="w-full h-8 flex flex-col gap-1.5 justify-center opacity-60">
                      
                      <div className="h-2 w-full bg-[#E5E5E5] rounded-sm"></div>
                      <div className="h-2 w-3/4 bg-[#E5E5E5] rounded-sm"></div>
                      <div className="h-2 w-5/6 bg-[#E5E5E5] rounded-sm"></div>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3 flex-wrap mb-5">
                  
                  {item.lines?.map((line) => (
                    <div key={line.id} className="flex items-center gap-1.5">
                      
                      <div
                        className="w-2.5 h-[2px] rounded-full"
                        style={{ backgroundColor: line.color }}
                      ></div>
                      <span
                        className="font-sans text-[10px] font-medium"
                        style={{ color: line.color }}
                      >
                        
                        {line.name}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#E5E5E5] mt-auto dark:border-[#222222]">
                  
                  <div>
                    
                    <div className="text-[8px] font-mono uppercase tracking-widest text-[#888] mb-1 dark:text-[#71717A]">
                      
                      PROVIDERS
                    </div>
                    <div className="text-[11px] font-mono text-[#111] dark:text-white">
                      
                      {item.providers}
                    </div>
                  </div>
                  <div>
                    
                    <div className="text-[8px] font-mono uppercase tracking-widest text-[#888] mb-1 dark:text-[#71717A]">
                      
                      N · 24H
                    </div>
                    <div className="text-[11px] font-mono text-[#111] dark:text-white">
                      
                      {item.samples}
                    </div>
                  </div>
                  <div>
                    
                    <div className="text-[8px] font-mono uppercase tracking-widest text-[#888] mb-1 dark:text-[#71717A]">
                      
                      UPDATED
                    </div>
                    <div className="text-[10px] font-mono text-[#555] leading-snug dark:text-[#A1A1AA]">
                      
                      {item.updatedAt}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            {filteredBenchmarks.length === 0 && viewMode === "card" && (
              <div className="col-span-full p-8 text-center text-[#888] text-sm py-12 bg-white/50 /50 border border-[#E5E5E5] border-dashed rounded-sm dark:text-[#71717A] dark:bg-[#0A0A0A]/50 dark:border-[#222222]">
                
                No benchmarks found matching your criteria.
              </div>
            )}
          </div>
        )}
        {/* CTA Section */}
        <div className="mt-24 sm:mt-32 max-w-2xl mx-auto text-center relative z-10 border-t border-[#E5E5E5] pt-16 dark:border-[#222222]">
          
          <h2 className="text-2xl md:text-[32px] font-semibold tracking-tight text-[#111] mb-4 font-sans dark:text-white">
            
            Deploy yours today
          </h2>
          <p className="text-[16px] text-[#555] font-sans mb-8 leading-relaxed max-w-xl mx-auto dark:text-[#A1A1AA]">
            
            Anyone can submit a benchmark, provider correction, or methodology
            change. We welcome community contributions to keep measurements
            accurate and up to date.
          </p>
          <Link
            href="/contribute"
            className="inline-flex items-center justify-center bg-[#111] text-white px-8 py-3.5 rounded-sm font-sans font-medium text-[13px] hover:bg-[#FF5C00] transition-colors shadow-[0_4px_16px_rgba(0,0,0,0.1)] group"
          >
            
            Read Contribution Guide
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2 group-hover:translate-x-1 transition-transform"
            >
              
              <path d="M5 12h14" /> <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
