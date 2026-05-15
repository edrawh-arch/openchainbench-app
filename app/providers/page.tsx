'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { PROVIDERS_LIST } from '@/lib/mock-data';

export default function ProvidersIndex() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProviders = useMemo(() => {
    return PROVIDERS_LIST.filter(item => {
      const matchesSearch = !searchQuery.trim() || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    });
  }, [searchQuery]);

  return (
    <div className="w-full flex justify-center py-24 bg-transparent min-h-screen">
      <div className="w-full max-w-[1000px] px-6">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-[42px] font-semibold tracking-tight text-[#111] mb-6 font-sans">
            Providers
          </h1>
          <p className="text-[20px] text-[#777] font-sans leading-relaxed max-w-2xl tracking-tight">
            Every provider that appears in at least one live benchmark. Sorted by number of #1 finishes, then by reach across categories.
          </p>
          <div className="text-[10px] uppercase font-mono tracking-widest text-[#888] mt-12 mb-4">
            {PROVIDERS_LIST.length} PROVIDERS INDEXED
          </div>
          <div className="w-full h-px bg-[#111]"></div>
        </div>

        {/* Search */}
        <div className="flex justify-end mb-4 border-b border-[#E5E5E5] pb-3">
          <div className="relative w-[200px]">
             <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none w-[20px] h-full">
               <Search className="h-3.5 w-3.5 text-[#AAA]" />
             </div>
             <input
               type="text"
               placeholder="Search providers"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="block w-full pl-6 py-1 bg-transparent border-0 font-mono text-[11px] text-[#111] focus:outline-none placeholder:text-[#AAA] h-full"
             />
          </div>
        </div>

        {/* Providers List */}
        <div className="flex flex-col">
          {filteredProviders.map((provider) => (
             <Link key={provider.id} href={`/providers/${provider.id}`} className="group flex items-center justify-between py-6 border-b border-[#E5E5E5] hover:bg-[#F9F9F9] transition-colors -mx-4 px-4 rounded-sm">
                <div className="flex items-center gap-5">
                   <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold font-sans overflow-hidden border border-[#E5E5E5]" style={{ backgroundColor: provider.logoBg, color: provider.logoFg }}>
                      {provider.name.charAt(0)}
                   </div>
                   <div className="flex flex-col justify-center">
                     <div className="flex items-center gap-2 mb-1.5">
                       <span className="font-semibold text-[17px] text-[#111] group-hover:text-[#FF5C00] transition-colors">{provider.name}</span>
                       {provider.category && (
                         <span className="text-[9px] font-mono uppercase tracking-widest text-[#AAA]">
                           {provider.category}
                         </span>
                       )}
                     </div>
                     <div className="flex items-center gap-1.5 text-[12px] font-mono text-[#888]">
                        {provider.tags.map((tag, i) => (
                           <span key={tag} className="flex items-center">
                             {i > 0 && <span className="mx-1.5">·</span>}
                             <span className={tag === 'Bridges' ? 'text-[#FF5C00]' : (tag === 'Trading' ? 'text-[#FF3399]' : (tag === 'Blockchains' ? 'text-[#0098EA]' : ''))}>{tag}</span>
                           </span>
                        ))}
                     </div>
                   </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                   <div className="font-mono text-[12px] text-[#555]">
                      <span className="font-semibold text-[#111]">{provider.benches}</span> benches
                   </div>
                   <div className="font-mono text-[11px] text-[#555]">
                      <span className="font-semibold text-[#111] text-[#00A152]">{provider.firstPlaces}</span> #1
                   </div>
                </div>
             </Link>
          ))}
          {filteredProviders.length === 0 && (
            <div className="py-12 text-center text-[#888] font-sans text-sm">
               No providers found matching your search.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
