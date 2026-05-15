import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BENCHMARKS_LIST } from '@/lib/mock-data';
import { MiniMultiLineChart } from '@/components/mini-chart';



export default function Home() {
  return (
    <div className="w-full flex justify-center py-24 bg-transparent">
      <div className="w-full max-w-[1400px] px-6">
        
        {/* Hero Section */}
        <div className="mb-24 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-4xl md:max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-[42px] font-semibold tracking-tight text-[#111] mb-3 font-sans">
              Highest accuracy at every price point
            </h1>
            <p className="text-xl sm:text-[24px] text-[#777] leading-snug font-sans tracking-tight mb-10">
              State of the art across the most challenging benchmarks for crypto infrastructure, data providers, and bridge nodes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="#benchmarks" 
                className="flex bg-[#FF5C00] w-fit rounded-sm shadow-[0_2px_8px_rgba(255,92,0,0.25)] hover:bg-[#E65300] transition-colors"
              >
                <div className="px-4 py-2 text-[11px] font-mono text-white tracking-widest uppercase flex items-center">
                   View All Benchmarks
                </div>
                <div className="px-2.5 py-2 border-l border-white/20 text-[10px] font-mono text-white flex items-center bg-white/10">
                   B
                </div>
              </Link>
              <Link 
                href="/contribute" 
                className="flex border border-[#E5E5E5] bg-white hover:bg-[#F9F9F9] text-[#111] w-fit rounded-sm shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-colors"
              >
                <div className="px-4 py-2 text-[11px] font-mono tracking-widest uppercase flex items-center gap-2">
                   Contribute <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </div>

          {/* Aesthetic Faded Detail (Minimal & Technical) */}
          <div className="hidden md:flex flex-1 w-full max-w-[500px] justify-center ml-auto select-none mt-4 -translate-x-12 z-10">
             <div className="relative w-[340px] h-[340px] flex items-center justify-center transform scale-[1.3]">
                {/* Gradient mask for smooth edge fading (fondu) */}
                <div 
                   className="absolute inset-0"
                   style={{
                      maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
                      WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
                   }}
                >
                   {/* Elegant Ambient Glow */}
                   <div className="absolute top-1/3 left-1/3 w-[200px] h-[200px] bg-[#111]/[0.05] blur-[40px] rounded-full" />

                   {/* Delicate perspective grid */}
                   <svg className="absolute inset-0 w-full h-full opacity-100" viewBox="0 0 400 400" fill="none">
                       {/* Radial background lines matching blockchain/network vibe */}
                       <g opacity="0.3">
                         {[...Array(12)].map((_, i) => (
                           <line 
                             key={i} 
                             x1="200" y1="200" 
                             x2={200 + Math.cos((i * 30 * Math.PI) / 180) * 300} 
                             y2={200 + Math.sin((i * 30 * Math.PI) / 180) * 300} 
                             stroke="#111" strokeWidth="0.5" 
                           />
                         ))}
                       </g>
                       
                       {/* Concentric precise rings */}
                       <circle cx="200" cy="200" r="40" stroke="#111" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.7" />
                       <circle cx="200" cy="200" r="90" stroke="#FF5C00" strokeWidth="0.5" opacity="0.5" />
                       <circle cx="200" cy="200" r="140" stroke="#111" strokeWidth="0.5" opacity="0.35" />
                       <circle cx="200" cy="200" r="190" stroke="#111" strokeWidth="0.5" strokeDasharray="1 8" opacity="0.6" />

                       {/* Subtle orbital data points (Benchmark nodes) */}
                       <g opacity="0.8">
                           {/* Highlight arcs on the rings */}
                           <path d="M 290 200 A 90 90 0 0 1 200 290" stroke="#FF5C00" strokeWidth="1" fill="none" opacity="0.4" />
                           <path d="M 60 200 A 140 140 0 0 1 101 101" stroke="#111" strokeWidth="0.5" strokeDasharray="2 4" fill="none" opacity="0.6" />
                       </g>

                       {/* Radar Sweep Animation */}
                       <g className="origin-center animate-[spin_12s_linear_infinite]" style={{ transformOrigin: '200px 200px' }}>
                         <defs>
                           <linearGradient id="radar-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                             <stop offset="0%" stopColor="#FF5C00" stopOpacity="0" />
                             <stop offset="50%" stopColor="#FF5C00" stopOpacity="0.02" />
                             <stop offset="100%" stopColor="#FF5C00" stopOpacity="0.15" />
                           </linearGradient>
                         </defs>
                         {/* A quarter-circle sweeping from top to right, rotating clockwise */}
                         <path d="M 200 200 L 200 10 A 190 190 0 0 1 390 200 Z" fill="url(#radar-glow)" />
                         <line x1="200" y1="200" x2="390" y2="200" stroke="#FF5C00" strokeWidth="1" opacity="0.3" />
                         {/* Subtle inner sweep line for depth */}
                         <line x1="200" y1="200" x2="290" y2="200" stroke="#FF5C00" strokeWidth="1.5" opacity="0.15" />
                       </g>
                   </svg>
                </div>
             </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-[#F0F0F0] pt-16 mb-24 max-w-5xl">
           <div>
             <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-3">01 / Methodology</h3>
             <p className="text-[13px] font-sans leading-relaxed text-[#444]">Runs continuously on independent hardware across US, EU and AP zones. Open-source runner configurations ensure full reproducibility of results.</p>
           </div>
           <div>
             <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-3">02 / Live Sync</h3>
             <p className="text-[13px] font-sans leading-relaxed text-[#444]">Latency and error metrics are indexed to the nearest canonical chain tip and exposed via dedicated Prometheus endpoints in real-time.</p>
           </div>
           <div>
             <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-3">03 / Contributions</h3>
             <p className="text-[13px] font-sans leading-relaxed text-[#444]">Anyone can submit a new RPC provider, cross-chain bridge or indexer via PR. Verified entities are tested and logged publicly.</p>
           </div>
        </div>

        {/* Benchmarks Section Header */}
        <div id="benchmarks" className="flex items-end justify-between border-b-[2px] border-[#111] pb-3 mb-4 font-mono text-[10px] uppercase tracking-widest text-[#888] px-4 md:px-8">
           <div className="flex-[1.5] md:mr-8 flex items-center gap-3 flex-wrap">
              <span>Latest deployed benchmarks</span>
              <Link 
                href="/benchmarks" 
                className="ml-2 font-sans text-[11px] bg-white border border-[#E5E5E5] text-[#111] hover:bg-[#F9F9F9] hover:border-[#CCC] px-2 py-0.5 rounded-[2px] tracking-normal capitalize flex items-center gap-1 transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
              >
                 See all
              </Link>
           </div>
           <div className="flex-1 hidden md:block">24 Hours</div>
           <div className="w-32 text-right">Value</div>
        </div>

        {/* Benchmarks List */}
        <div className="flex flex-col mb-16 relative">
          
          <div className="relative z-10 bg-white/80 backdrop-blur-sm border border-[#E5E5E5] rounded-sm shadow-[0_4px_24px_rgba(0,0,0,0.02)] pt-2 pb-2 max-h-[620px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#E5E5E5] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#CCC]">
            {BENCHMARKS_LIST.map((item) => (
              <Link 
                key={item.id} 
                href={`/benchmarks/${item.id}`} 
                className="py-6 border-b border-[#F0F0F0] last:border-0 group hover:bg-[#F9F9F9] flex flex-col md:flex-row md:items-center px-4 md:px-8 transition-colors relative"
              >
                {/* Col 1: Info */}
                <div className="flex-[1.5] md:mr-8 mb-4 md:mb-0">
                   <div className="flex items-center gap-4 mb-2">
                     <span className="font-mono text-[10px] uppercase tracking-widest text-[#888]">
                      {item.category}
                     </span>
                     <div className="flex -space-x-1.5">
                       {item.lines?.slice(0, 4).map((line) => (
                         <div key={line.name} className="w-5 h-5 rounded-full bg-white border border-[#E5E5E5] flex items-center justify-center text-[8px] font-bold overflow-hidden text-[#111]">
                           {line.name.charAt(0)}
                         </div>
                       ))}
                     </div>
                  </div>
                 <h3 className="text-[17px] font-semibold text-[#111] font-sans group-hover:text-[#FF5C00] tracking-tight mb-1 leading-tight transition-colors">
                    {item.title}
                 </h3>
                 <p className="text-[14px] text-[#777] leading-snug line-clamp-1 max-w-xl">
                    {item.description}
                 </p>
              </div>

              {/* Col 3: Chart */}
              <div className="flex-1 hidden md:flex flex-col pr-8 h-full pointer-events-none self-stretch justify-center -mt-2">
                 {item.lines ? (
                   <>
                     <MiniMultiLineChart lines={item.lines} height={35} className="mb-3" />
                     <div className="flex items-center gap-4 flex-wrap mt-auto">
                        {item.lines.map((line) => (
                          <div key={line.id} className="flex items-center gap-2">
                            <div className="w-3 h-0.5 rounded-full" style={{ backgroundColor: line.color }}></div>
                            <span className="font-sans text-[11px] font-medium" style={{ color: line.color }}>{line.name}</span>
                          </div>
                        ))}
                     </div>
                   </>
                 ) : (
                   <div className="w-full flex gap-1 h-8 opacity-60">
                     <div className="h-full flex-1 bg-black/5 rounded-sm"></div>
                     <div className="h-full flex-1 bg-black/5 rounded-sm w-3/4"></div>
                   </div>
                 )}
              </div>

              {/* Col 4: Value */}
              <div className="w-32 text-right shrink-0 pt-1">
                 <span className="text-[20px] font-mono tracking-tight text-[#111]">{item.value} </span>
                 <span className="text-[#888] font-mono text-[12px]">{item.unit}</span>
              </div>
            </Link>
          ))}
          </div>
        </div>

        <div className="flex justify-end mb-24">
           <Link href="/benchmarks" className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#666] hover:text-black transition-colors">
              See all benchmarks <ArrowRight className="w-3.5 h-3.5" />
           </Link>
        </div>

      </div>
    </div>
  );
}
