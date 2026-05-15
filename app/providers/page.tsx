"use client";

import Link from "next/link";
import { useState, useMemo, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { PROVIDERS_LIST } from "@/lib/mock-data";

export default function ProvidersIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
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
    const cats = new Set<string>();
    PROVIDERS_LIST.forEach((p) => p.tags.forEach((t) => cats.add(t)));
    return ["ALL", ...Array.from(cats).sort()];
  }, []);

  const filteredProviders = useMemo(() => {
    return PROVIDERS_LIST.filter((item) => {
      const matchesSearch =
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      const matchesCategory =
        selectedCategory === "ALL" || item.tags.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="w-full flex justify-center py-24 bg-transparent min-h-screen">
      <div className="w-full max-w-[1000px] px-6">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-[42px] font-semibold tracking-tight text-[#111] dark:text-white mb-4 font-sans">
            Providers
          </h1>
          <p className="text-[20px] text-[#777] font-sans leading-relaxed max-w-2xl tracking-tight">
            Every provider that appears in at least one live benchmark. Sorted
            by number of #1 finishes, then by reach across categories.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-sm font-mono text-[10px] uppercase tracking-widest transition-colors ${ selectedCategory === cat ? "bg-[#FF5C00] text-white border border-[#FF5C00] shadow-[0_2px_8px_rgba(255,92,0,0.25)]" : "bg-white dark:bg-[#0a0a0a] text-[#666] border-[#E5E5E5] hover:border-[#111] hover:text-[#111]" } dark:text-[#AAAAAA] dark:border-[#333333] dark:hover:border-[#AAAAAA]`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto shrink-0 flex-col md:flex-row">
            <div className="relative w-full md:w-[280px] h-[38px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none w-[38px] h-[38px]">
                <Search className="h-4 w-4 text-[#888] dark:text-[#888888]" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search providers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full h-[38px] pl-10 pr-12 bg-white dark:bg-[#0a0a0a] border border-[#E5E5E5] dark:border-[#333] rounded-sm font-sans tracking-tight text-[14px] text-[#111] dark:text-white focus:outline-none focus:border-[#111] focus:ring-1 focus:ring-[#111] placeholder:text-[#888] dark:placeholder:text-[#555] shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-colors dark:bg-[#000000] dark:border-[#333333] dark:placeholder:text-[#666666]"
                spellCheck={false}
              />
              <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none h-full">
                <span className="text-[10px] font-mono text-[#AAA] border border-[#E5E5E5] dark:border-[#333] bg-[#FAFAFA] dark:bg-[#111] px-1.5 py-0.5 rounded-[2px] dark:text-[#666666] dark:border-[#333333] dark:bg-[#0a0a0a]">
                  ⌘K
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Providers List */}
        <div className="flex flex-col border border-[#E5E5E5] dark:border-[#333] rounded-sm bg-white dark:bg-[#0a0a0a] shadow-sm dark:border-[#333333] dark:bg-[#000000]">
          {filteredProviders.map((provider, i) => (
            <Link
              key={provider.id}
              href={`/providers/${provider.id}`}
              className={`group flex flex-col md:flex-row md:items-center justify-between p-6 ${i !== filteredProviders.length - 1 ? "border-b border-[#E5E5E5]" : ""} hover:bg-[#F9F9F9] transition-colors dark:hover:bg-[#151515]`}
            >
              <div className="flex items-center gap-5 mb-4 md:mb-0">
                <div
                  className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-[22px] font-bold font-sans overflow-hidden border border-[#111]/10 shadow-sm shrink-0"
                  style={{
                    backgroundColor: provider.logoBg,
                    color: provider.logoFg,
                  }}
                >
                  {provider.name.charAt(0)}
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-semibold text-[17px] text-[#111] dark:text-white group-hover:text-[#FF5C00] transition-colors tracking-tight">
                      {provider.name}
                    </span>
                    {provider.category && (
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#AAA] bg-[#F5F5F5] dark:bg-[#111] px-1.5 py-0.5 rounded-[2px] border border-[#E5E5E5] dark:border-[#333] dark:text-[#666666] dark:bg-[#111111] dark:border-[#333333]">
                        {provider.category}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] font-mono text-[#888] dark:text-[#888888]">
                    {provider.tags.map((tag, i) => (
                      <span key={tag} className="flex items-center">
                        {i > 0 && <span className="mx-1.5 text-[#CCC] dark:text-[#444444]">·</span>}
                        <span
                          className={
                            tag === "Bridges"
                              ? "text-[#FF5C00]"
                              : tag === "Trading"
                                ? "text-[#FF3399]"
                                : tag === "Blockchains"
                                  ? "text-[#0098EA]"
                                  : ""
                          }
                        >
                          {tag}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-8 pl-[72px] md:pl-0">
                <div className="flex flex-col items-start md:items-end gap-1">
                  <div className="font-mono text-[10px] text-[#AAA] uppercase tracking-widest dark:text-[#666666]">
                    Benchmarks
                  </div>
                  <div className="font-mono text-[16px] text-[#111] dark:text-white font-medium">
                    {provider.benches}
                  </div>
                </div>
                <div className="flex flex-col items-start md:items-end gap-1">
                  <div className="font-mono text-[10px] text-[#AAA] uppercase tracking-widest dark:text-[#666666]">
                    Top 1
                  </div>
                  <div className="font-mono text-[16px] text-[#00A152] font-semibold">
                    {provider.firstPlaces}
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {filteredProviders.length === 0 && (
            <div className="py-16 flex flex-col items-center justify-center text-center">
              <Search className="w-8 h-8 text-[#E5E5E5] mb-3" />
              <div className="text-[14px] text-[#111] dark:text-white font-medium tracking-tight mb-1">
                No providers found
              </div>
              <div className="text-[13px] text-[#888] font-sans dark:text-[#888888]">
                We couldn&apos;t find any providers matching &quot;{searchQuery}&quot;
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
