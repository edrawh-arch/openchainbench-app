'use client';

import { useState } from 'react';
import { Download, AlertTriangle, X, Image as ImageIcon } from 'lucide-react';

export function BenchmarkActions({ data }: { data: any }) {
  const [showExport, setShowExport] = useState(false);
  const [showReport, setShowReport] = useState(false);

  return (
    <>
      <div className="flex gap-2">
        <button 
          onClick={() => setShowExport(true)}
          className="flex items-center gap-1.5 border border-[#E5E5E5] bg-white text-[#111] px-3 md:px-4 py-1.5 rounded-sm text-[10px] md:text-[11px] font-mono tracking-widest uppercase hover:border-[#FF5C00] hover:text-[#FF5C00] hover:bg-[#FF5C00]/5 transition-colors"
        >
          <ImageIcon className="w-3.5 h-3.5" /> EXPORT
        </button>
        <button 
          onClick={() => setShowReport(true)}
          className="flex items-center gap-1.5 border border-[#E5E5E5] bg-white text-[#111] px-3 md:px-4 py-1.5 rounded-sm text-[10px] md:text-[11px] font-mono tracking-widest uppercase hover:border-[#FF5C00] hover:text-[#FF5C00] hover:bg-[#FF5C00]/5 transition-colors"
        >
          <AlertTriangle className="w-3.5 h-3.5" /> REPORT
        </button>
      </div>

      {showExport && (
        <div className="fixed inset-0 z-50 flex justify-center bg-black/20 backdrop-blur-sm p-4 overflow-y-auto" onClick={() => setShowExport(false)}>
          <div className="bg-white w-full max-w-[800px] border border-[#E5E5E5] rounded-sm shadow-2xl relative my-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-[#E5E5E5] p-5">
               <h3 className="font-mono text-[11px] tracking-widest uppercase text-[#111]">Export as Image &middot; 5 Layouts</h3>
               <button onClick={() => setShowExport(false)} className="text-[#888] hover:text-[#111] transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 md:p-8">
               <p className="text-[14px] text-[#444] mb-6 font-sans">
                 Pick a layout and download a 1200&times;630 PNG ready for Twitter, Reddit, LinkedIn or any OG-card embed. Same data, same colors as this dashboard.
               </p>
               
               <div className="flex flex-wrap gap-0 font-mono text-[10px] tracking-widest uppercase mb-6 rounded-sm border border-[#E5E5E5] w-fit overflow-hidden bg-[#FAFAFA]">
                 <button className="px-4 py-2.5 bg-white text-[#111] border-r border-[#E5E5E5]">Ranking</button>
                 <button className="px-4 py-2.5 text-[#888] hover:text-[#111] border-r border-[#E5E5E5] transition-colors">Leaderboard</button>
                 <button className="px-4 py-2.5 text-[#888] hover:text-[#111] border-r border-[#E5E5E5] transition-colors">Snapshot</button>
                 <button className="px-4 py-2.5 text-[#888] hover:text-[#111] border-r border-[#E5E5E5] transition-colors">Headline</button>
                 <button className="px-4 py-2.5 text-[#888] hover:text-[#111] transition-colors">Compare</button>
               </div>

               <p className="text-[12px] text-[#666] mb-4 font-sans">Vertical bars sorted ascending by p50, with provider names and p99 tails.</p>

               {/* Fake image mock */}
               <div className="w-full aspect-[1200/630] border border-[#E5E5E5] rounded-sm bg-[#FAFAFA] p-8 flex flex-col justify-between mb-6 shadow-sm overflow-hidden relative">
                  <div className="flex justify-between items-start">
                     <div className="flex items-center gap-2">
                       <div className="font-serif font-bold text-lg">C</div>
                       <span className="font-sans text-[13px] text-[#444]">OpenChainBench</span>
                     </div>
                     <div className="flex items-center gap-2 text-[8px] font-mono tracking-widest uppercase text-[#888]">
                        <span className="flex items-center gap-1 bg-[#DCE7E1] text-[#335A48] px-2 py-1 rounded-full"><span className="w-1 h-1 bg-[#335A48] rounded-full"></span> Live &middot; 24H</span>
                        <span className="border border-[#E5E5E5] px-2 py-1 rounded-full">{data.tags[0]?.label || 'DATA'}</span>
                        <span>May 14, 2026 &middot; 09:43 UTC</span>
                     </div>
                  </div>
                  <div>
                     <h2 className="text-4xl text-[#111] font-sans font-semibold tracking-tight mb-2">{data.title}</h2>
                     <p className="font-sans text-[#666] text-[13px]">Provider ranking by p50 &middot; Quote latency.</p>
                  </div>
                  <div className="flex-1 flex items-end justify-center gap-4 mt-8 px-12 relative">
                     {/* Mock bars */}
                     <div className="flex flex-col items-center flex-1 h-[20%]">
                       <span className="mb-2 font-sans text-sm text-[#111]">31<span className="text-[9px] text-[#888] ml-0.5">ms</span></span>
                       <div className="w-full h-full bg-[#4A4746] rounded-t-[2px]"></div>
                       <span className="mt-3 font-sans text-[12px] text-[#111] font-semibold flex items-center gap-1"><span className="w-3 h-3 border border-[#E5E5E5] rounded-full inline-block bg-white text-[7px] text-center flex-shrink-0">M</span> Mobula</span>
                       <span className="mt-1 font-mono text-[8px] text-[#888]">p99 680 ms</span>
                     </div>
                     <div className="flex flex-col items-center flex-1 h-[40%]">
                       <span className="mb-2 font-sans text-sm text-[#111]">508<span className="text-[9px] text-[#888] ml-0.5">ms</span></span>
                       <div className="w-full h-full bg-[#A26D5A] rounded-t-[2px]"></div>
                       <span className="mt-3 font-sans text-[12px] text-[#111] font-semibold flex items-center gap-1"><span className="w-3 h-3 border border-[#E5E5E5] rounded-full inline-block bg-white text-[7px] text-center flex-shrink-0">D</span> Debridge</span>
                       <span className="mt-1 font-mono text-[8px] text-[#888]">p99 4.34 s</span>
                     </div>
                     <div className="flex flex-col items-center flex-1 h-[55%]">
                       <span className="mb-2 font-sans text-sm text-[#111]">975<span className="text-[9px] text-[#888] ml-0.5">ms</span></span>
                       <div className="w-full h-full bg-[#628886] rounded-t-[2px]"></div>
                       <span className="mt-3 font-sans text-[12px] text-[#111] font-semibold flex items-center gap-1"><span className="w-3 h-3 border border-[#E5E5E5] rounded-full inline-block bg-white text-[7px] text-center flex-shrink-0">R</span> Relay</span>
                       <span className="mt-1 font-mono text-[8px] text-[#888]">p99 4.71 s</span>
                     </div>
                     <div className="flex flex-col items-center flex-1 h-[80%]">
                       <span className="mb-2 font-sans text-sm text-[#111]">1.55<span className="text-[9px] text-[#888] ml-0.5">s</span></span>
                       <div className="w-full h-full bg-[#AC9649] rounded-t-[2px]"></div>
                       <span className="mt-3 font-sans text-[12px] text-[#111] font-semibold flex items-center gap-1"><span className="w-3 h-3 border border-[#E5E5E5] rounded-full inline-block bg-[#F0E4FF] text-[#8B3DFF] text-[7px] text-center flex-shrink-0">L</span> LiFi</span>
                       <span className="mt-1 font-mono text-[8px] text-[#888]">p99 4.91 s</span>
                     </div>
                  </div>
                  <div className="flex justify-between items-center text-[7px] font-mono tracking-widest text-[#888] uppercase mt-8 border-t border-[#111] pt-3">
                     <span>OPENCHAINBENCH.COM &middot; N&ordm; {data.number} &middot; {data.tags[0]?.label || 'DATA'}</span>
                     <span>{data.stats.providers} &middot; {data.stats.samples} SAMPLES</span>
                  </div>
               </div>

               <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 bg-[#FF5C00] text-white px-5 py-3 rounded-sm text-[11px] font-mono tracking-widest uppercase hover:bg-[#E05200] transition-colors">
                    <Download className="w-4 h-4" /> Download PNG
                  </button>
                  <button className="text-[#888] hover:text-[#111] font-mono text-[11px] tracking-widest uppercase transition-colors">
                    OPEN RAW &nearr;
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}

      {showReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4" onClick={() => setShowReport(false)}>
          <div className="bg-white w-full max-w-[500px] border border-[#E5E5E5] rounded-sm shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-[#E5E5E5] p-5">
               <h3 className="font-mono text-[11px] tracking-widest uppercase text-[#111]">Report a problem</h3>
               <button onClick={() => setShowReport(false)} className="text-[#888] hover:text-[#111] transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6">
               <p className="text-[14px] text-[#444] mb-6 font-sans leading-relaxed">
                 Spotted a wrong number, a missing provider, an outage, or anything off about this benchmark? Tell us, it goes straight to a maintainer.
               </p>
               
               <div className="mb-6">
                 <label className="block text-[10px] font-mono uppercase tracking-widest text-[#888] mb-2">What&apos;s wrong?</label>
                 <textarea 
                   className="w-full bg-white border border-[#E5E5E5] focus:border-[#111] rounded-sm p-3 font-sans text-[14px] text-[#111] placeholder:text-[#AAA] focus:outline-none focus:ring-1 focus:ring-[#111] resize-none h-32"
                   placeholder="Describe what you saw, when, and where (chain / provider / time range)."
                 ></textarea>
                 <div className="mt-1 text-[10px] text-[#888] font-sans">0 / 2000</div>
               </div>

               <div className="mb-8">
                 <label className="flex items-start gap-3 cursor-pointer group">
                   <div className="relative flex items-center justify-center pt-1">
                     <input type="checkbox" className="peer w-4 h-4 appearance-none border border-[#111] rounded-sm checked:bg-[#111] checked:border-[#111] cursor-pointer transition-colors" />
                     <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                   </div>
                   <div>
                     <div className="text-[14px] text-[#111] font-sans">I&apos;d like a reply</div>
                     <div className="text-[12px] text-[#666] font-sans">Leave an email, Telegram or GitHub handle so a maintainer can follow up.</div>
                   </div>
                 </label>
               </div>

               <div className="flex items-center gap-4">
                  <button className="bg-[#FF5C00] text-white px-5 py-2.5 rounded-sm text-[11px] font-mono tracking-widest uppercase hover:bg-[#E05200] transition-colors">
                    SEND REPORT
                  </button>
                  <button onClick={() => setShowReport(false)} className="text-[#888] hover:text-[#111] font-mono text-[11px] tracking-widest uppercase transition-colors">
                    CANCEL
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
