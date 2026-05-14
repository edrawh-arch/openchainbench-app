"use client";

import { useState, useRef, useEffect } from "react";
import { Download, ExternalLink } from "lucide-react";

export function ShareableCards({ data }: { data: any }) {
  const [activeTab, setActiveTab] = useState<"RANKING" | "LEADERBOARD" | "SNAPSHOT" | "HEADLINE" | "COMPARE">("RANKING");
  
  // States for sub-menus
  const [snapshotSelectedProviders, setSnapshotSelectedProviders] = useState<string[]>(
    data.results.map((r: any) => r.name)
  );
  const [headlineProvider, setHeadlineProvider] = useState<string>(data.results[0].name);
  const [compareA, setCompareA] = useState<string>(data.results[0].name);
  const [compareB, setCompareB] = useState<string>(data.results[1]?.name || data.results[0].name);

  const getProviderColor = (name: string) => {
    return data.regions?.find((r: any) => r.provider === name)?.color || "#111";
  };

  const getProviderResult = (name: string) => {
    return data.results.find((r: any) => r.name === name);
  };

  // Pre-calculate max for scales
  const maxP50 = Math.max(...data.results.map((r: any) => parseFloat(r.p50)));

  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setScale(entry.contentRect.width / 1200);
      }
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pb-8">
      {/* Description */}
      <p className="text-[#444] text-sm mb-6 max-w-2xl font-sans">
        Pick a layout and download a 1200×630 PNG ready for Twitter, Reddit, LinkedIn or any OG-card embed. Same data, same colors as this dashboard.
      </p>

      {/* Main Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 border-b border-transparent">
        {(["RANKING", "LEADERBOARD", "SNAPSHOT", "HEADLINE", "COMPARE"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-[10px] font-sans font-semibold tracking-widest uppercase px-4 py-2 rounded-[4px] transition-colors w-auto text-center flex items-center justify-center whitespace-nowrap border ${
              activeTab === tab
                ? "bg-transparent border-[#111] text-[#111]"
                : "bg-transparent border-[#E5E5E5] text-[#888] hover:text-[#111] hover:bg-[#F9F9F9]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Sub-menus based on Active Tab */}
      {activeTab === "RANKING" && (
        <p className="text-[12px] text-[#666] mb-8 font-sans">Vertical bars sorted ascending by p50, with provider names and p99 tails.</p>
      )}

      {activeTab === "LEADERBOARD" && (
        <p className="text-[12px] text-[#666] mb-8 font-sans">Ranked rows with horizontal mini-bars in each provider&apos;s signature color.</p>
      )}

      {activeTab === "SNAPSHOT" && (
        <div className="mb-8">
          <p className="text-[12px] text-[#666] mb-4 font-sans">Full 24-hour multi-line chart. Toggle providers in or out of the plot.</p>
          <div className="flex items-center gap-4 text-[10px] font-sans uppercase tracking-widest text-[#888]">
            <span className="shrink-0">LINES ON CHART</span>
            <div className="flex flex-wrap gap-2">
              {data.results.map((r: any) => {
                const isSelected = snapshotSelectedProviders.includes(r.name);
                return (
                  <button
                    key={r.name}
                    onClick={() => {
                      if (isSelected) {
                        setSnapshotSelectedProviders(snapshotSelectedProviders.filter((p) => p !== r.name));
                      } else {
                        setSnapshotSelectedProviders([...snapshotSelectedProviders, r.name]);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-full transition-colors border ${
                      isSelected
                        ? "bg-[#111] text-white border-[#111]"
                        : "bg-transparent text-[#888] border-[#E5E5E5] hover:border-[#111] hover:text-[#111]"
                    }`}
                  >
                    {r.name}
                  </button>
                );
              })}
              <button
                onClick={() => setSnapshotSelectedProviders(data.results.map((r: any) => r.name))}
                className="px-3 py-1.5 rounded-full border border-transparent text-[#aaa] hover:text-[#111]"
              >
                ALL
              </button>
            </div>
            <span className="ml-auto text-[#aaa]">
              {snapshotSelectedProviders.length} OF {data.results.length} ON CHART
            </span>
          </div>
        </div>
      )}

      {activeTab === "HEADLINE" && (
        <div className="mb-8">
          <p className="text-[12px] text-[#666] mb-4 font-sans">Big-number poster of one provider&apos;s p50. Pick which provider to feature.</p>
          <div className="flex items-center gap-4 text-[10px] font-sans uppercase tracking-widest text-[#888]">
            <span className="shrink-0">FEATURED PROVIDER</span>
            <div className="flex flex-wrap gap-2">
              {data.results.map((r: any) => (
                <button
                  key={r.name}
                  onClick={() => setHeadlineProvider(r.name)}
                  className={`px-3 py-1.5 rounded-full transition-colors border ${
                    headlineProvider === r.name
                      ? "bg-[#111] text-white border-[#111]"
                      : "bg-transparent text-[#888] border-[#E5E5E5] hover:border-[#111] hover:text-[#111]"
                  }`}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "COMPARE" && (
        <div className="mb-8 bg-[#FAF9F5] p-5 rounded-sm border border-[#E5E5E5]">
          <div className="flex items-center justify-between font-sans text-[10px] uppercase tracking-widest text-[#888] mb-4">
             <span>PICK 2 PROVIDERS TO COMPARE</span>
             <button
               onClick={() => {
                 setCompareA(compareB);
                 setCompareB(compareA);
               }}
               className="hover:text-[#111] border-b border-[#ccc] hover:border-[#111] transition-colors"
             >
               SWAP A AND B
             </button>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-4 font-sans text-[10px] uppercase tracking-widest text-[#888]">
             <div className="flex items-center gap-3">
               <span className="shrink-0">PROVIDER A · LEFT</span>
               <div className="flex flex-wrap gap-2">
                 {data.results.map((r: any) => (
                   <button
                     key={r.name}
                     onClick={() => setCompareA(r.name)}
                     className={`px-2.5 py-1.5 rounded-sm transition-colors border ${
                       compareA === r.name
                         ? "bg-[#111] text-white border-[#111]"
                         : "bg-transparent text-[#888] border-[#E5E5E5] hover:border-[#111] hover:text-[#111]"
                     }`}
                   >
                     {r.name}
                   </button>
                 ))}
               </div>
             </div>
             
             <div className="text-[12px] font-semibold italic opacity-50 shrink-0">VS</div>

             <div className="flex flex-row-reverse md:flex-row items-center gap-3">
               <div className="flex flex-wrap gap-2">
                 {data.results.map((r: any) => (
                   <button
                     key={r.name}
                     onClick={() => setCompareB(r.name)}
                     className={`px-2.5 py-1.5 rounded-sm transition-colors border ${
                       compareB === r.name
                         ? "bg-[#111] text-white border-[#111]"
                         : "bg-transparent text-[#888] border-[#E5E5E5] hover:border-[#111] hover:text-[#111]"
                     }`}
                   >
                     {r.name}
                   </button>
                 ))}
               </div>
               <span className="shrink-0 text-right md:text-left">PROVIDER B · RIGHT</span>
             </div>
          </div>
        </div>
      )}

      {/* OG Image Generator Output Mock */}
      <div 
        ref={containerRef}
        className="border border-[#E5E5E5] rounded-[4px] mb-6 w-full max-w-4xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden"
        style={{ height: `${630 * scale}px` }}
      >
        <div 
          className="w-[1200px] h-[630px] bg-[#FAF9F5] flex flex-col relative select-none origin-top-left"
          style={{ transform: `scale(${scale})` }}
        >
          
          {/* Common Header for MOST tabs */}
        {activeTab !== "COMPARE" && (
           <div className="pt-8 px-10 pb-0 flex-shrink-0">
             <div className="flex items-center justify-between mb-8 shrink-0">
               <div className="flex items-center gap-3 text-[#111]">
                 <svg width="22" height="22" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <mask id="c-mask-card-1">
                     <rect width="100" height="100" fill="white" />
                     <ellipse cx="45" cy="50" rx="22" ry="40" fill="black" />
                     <rect x="45" y="38" width="55" height="24" fill="black" />
                   </mask>
                   <circle cx="45" cy="50" r="45" fill="black" mask="url(#c-mask-card-1)" />
                   <path d="M 65 0 L 100 0 L 100 35 Z" fill="#A0A0A0" />
                   <path d="M 65 100 L 100 100 L 100 65 Z" fill="#A0A0A0" />
                 </svg>
                 <span className="font-bold tracking-tight text-lg leading-none">OpenChainBench</span>
               </div>
               <div className="flex gap-2 font-mono text-[9px] uppercase tracking-widest items-center">
                  <span className="text-[#3A7E50] border border-[#3A7E50]/30 bg-[#3A7E50]/10 px-2.5 py-1 rounded-full flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#3A7E50]"></div> LIVE · 24H</span>
                  <span className="bg-transparent border border-[#ccc] px-2.5 py-1 rounded-full text-[#444]">{data.tags[0]?.label || "DATA"}</span>
                  <span className="text-[#888] ml-2">MAY 6, 2026 · 12:17 UTC</span>
               </div>
             </div>
             
             {activeTab === "RANKING" && (
                <>
                   <h2 className="text-[44px] font-semibold tracking-tight font-sans mb-3 text-[#111] leading-none">{data.title}</h2>
                   <p className="text-[16px] text-[#555] mb-auto font-sans">Provider ranking by p50 · ascending. Lower is faster.</p>
                </>
             )}

             {activeTab === "LEADERBOARD" && (
                <>
                   <h2 className="text-[44px] font-semibold tracking-tight font-sans mb-3 text-[#111] leading-none">{data.title}</h2>
                   <p className="text-[16px] text-[#555] mb-auto font-sans">Ranked by p50 · ascending. Lower is faster.</p>
                </>
             )}

             {activeTab === "SNAPSHOT" && (
                <>
                   <h2 className="text-[44px] font-semibold tracking-tight font-sans mb-3 text-[#111] leading-none">{data.title}</h2>
                   <p className="text-[16px] text-[#555] mb-auto font-sans">{data.description}</p>
                </>
             )}

             {activeTab === "HEADLINE" && (
                <div className="flex flex-col items-center pt-16">
                   <p className="text-[14px] font-mono uppercase tracking-widest text-[#888] mb-10">FASTEST CROSS-CHAIN BRIDGE · FIELD MIN P50</p>
                   <div className="flex items-baseline gap-2 mb-8">
                     <span className="text-[160px] font-sans font-medium text-[#111] leading-none tracking-tighter">
                       {getProviderResult(headlineProvider)?.p50.split(" ")[0] || "166"}
                     </span>
                     <span className="text-[40px] font-sans text-[#444]">{getProviderResult(headlineProvider)?.p50.split(" ")[1] || "ms"}</span>
                   </div>
                   <p className="text-3xl font-sans text-[#111] mb-6">by <span className="font-medium">{headlineProvider}</span></p>
                   <p className="text-[13px] font-sans font-medium text-[#888]">
                     ahead of {data.results.length - 1} other providers · p99 {getProviderResult(headlineProvider)?.p99 || "1.10 s"}
                   </p>
                </div>
             )}
           </div>
        )}

        {/* Content Area Based on Tab */}
        <div className={`flex-1 w-full ${activeTab === 'COMPARE' ? '' : 'px-10'} ${activeTab !== "HEADLINE" && activeTab !== "COMPARE" ? "mt-4" : ""} relative flex`}>
          
          {activeTab === "RANKING" && (
            <div className="absolute bottom-[65px] left-10 right-10 flex items-end justify-center gap-24 h-[400px]">
              {data.results.map((r: any) => {
                const val = parseFloat(r.p50);
                // Height mapped relative to max:
                const h = Math.max(8, (val / maxP50) * 280);
                
                return (
                  <div key={r.name} className="flex flex-col items-center w-[140px] relative">
                    <span className="font-sans font-medium text-[#111] text-[36px] mb-3 flex items-baseline gap-1 relative z-10">
                      {val} <span className="text-[14px] text-[#444] font-sans italic">{r.p50.split(" ")[1]}</span>
                    </span>
                    <div 
                      className="w-full relative z-10" 
                      style={{ height: `${h}px`, backgroundColor: getProviderColor(r.name) }}
                    ></div>
                    {/* Position labels directly below the bar (below the line) */}
                    <div className="absolute top-full left-0 w-full flex flex-col items-center" style={{ paddingTop: '16px' }}>
                      <span className="font-sans font-semibold text-[#111] text-[16px] leading-none mb-1">{r.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "LEADERBOARD" && (
            <div className="w-full flex flex-col justify-center gap-8 pb-[80px] pt-8">
              {data.results.map((r: any, idx: number) => {
                const val = parseFloat(r.p50);
                const pct = (val / maxP50) * 100;
                
                return (
                  <div key={r.name} className="flex items-center w-full">
                    <span className="font-mono text-2xl text-[#ccc] w-12 shrink-0">{(idx + 1).toString().padStart(2, '0')}</span>
                    <div className="flex-1 flex flex-col pl-4 gap-2">
                       <span className="font-sans text-[22px] text-[#111]">{r.name}</span>
                       <div className="w-full h-2 bg-[#EBEBEB] rounded-full overflow-hidden flex relative">
                         <div className="h-full rounded-full absolute left-0 top-0" style={{ width: `${Math.max(5, pct)}%`, backgroundColor: getProviderColor(r.name) }}></div>
                       </div>
                    </div>
                    <div className="w-32 shrink-0 flex items-baseline justify-end gap-1">
                       <span className="font-sans font-medium text-[28px] text-[#111] leading-none">{val}</span>
                       <span className="text-[13px] text-[#444]">{r.p50.split(" ")[1]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "SNAPSHOT" && (
            <div className="w-full flex flex-col pb-[80px] pt-8 bg-transparent">
              {/* Note: I'll use a placeholder area similar to the UI since we don't have Recharts locally rigged for image export here exactly */}
              <div className="w-full h-full bg-[#F4F3ED] rounded-sm relative border border-[#EBEBEB] p-4 flex flex-col">
                  {/* Fake top lines */}
                  <span className="text-[10px] font-mono text-[#aaa]">max {data.stats.worst}</span>
                  <div className="flex-1 w-full relative overflow-hidden">
                     {/* Just placeholder SVGs imitating multi-lines for the specific providers */}
                     <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        {snapshotSelectedProviders.map((p, idx) => {
                           const color = getProviderColor(p);
                           const yOffset = (idx + 1) * 20;
                           return (
                             <polyline key={p} fill="none" stroke={color} strokeWidth="1.5" points={`0,${yOffset + (idx%3)*2} 20,${yOffset - 5 + (idx%2)*4} 40,${yOffset + (idx%4)*2} 60,${yOffset + 5 + (idx%2)*3} 80,${yOffset - (idx%5)*2} 100,${yOffset}`} />
                           )
                        })}
                     </svg>
                  </div>
                  <span className="text-[10px] font-mono text-[#aaa]">min {data.stats.best}</span>
              </div>
              <div className="flex items-center gap-6 mt-4">
                 {snapshotSelectedProviders.map(p => {
                    const r = getProviderResult(p);
                    return (
                      <div key={p} className="flex items-center gap-2">
                        <div className="w-4 h-0.5" style={{ backgroundColor: getProviderColor(p) }}></div>
                        <span className="font-sans text-[13px] text-[#111] font-medium">{p}</span>
                        <span className="font-sans text-[13px] text-[#aaa]">{r?.p50}</span>
                      </div>
                    )
                 })}
              </div>
            </div>
          )}

          {activeTab === "COMPARE" && (
            <div className="w-full h-[630px] flex absolute inset-0 -mx-10 mt-0">
               <div className="w-[50%] h-full bg-[#E5E5E5] px-10 pt-10 pb-[90px] flex flex-col relative shrink-0">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3 text-[#111]">
                      <svg width="22" height="22" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="c-mask-card-2">
                          <rect width="100" height="100" fill="white" />
                          <ellipse cx="45" cy="50" rx="22" ry="40" fill="black" />
                          <rect x="45" y="38" width="55" height="24" fill="black" />
                        </mask>
                        <circle cx="45" cy="50" r="45" fill="black" mask="url(#c-mask-card-2)" />
                        <path d="M 65 0 L 100 0 L 100 35 Z" fill="#A0A0A0" />
                        <path d="M 65 100 L 100 100 L 100 65 Z" fill="#A0A0A0" />
                      </svg>
                      <span className="font-bold tracking-tight text-lg leading-none">OpenChainBench</span>
                    </div>
                  </div>
                  
                  <h2 className="text-[36px] font-semibold tracking-tight font-sans mb-12 text-[#111] leading-none">{data.title} · top 2</h2>
                  
                  <div className="mt-auto pl-4">
                    <p className="font-mono text-[10px] text-[#888] tracking-widest uppercase mb-4">RANK 01</p>
                    <p className="text-[54px] font-medium font-sans text-[#111] leading-none mb-4">{compareA}</p>
                    
                    <div className="flex items-baseline gap-2 mb-4 relative ml-[-4px]">
                       <span className="text-[120px] font-sans font-medium text-[#111] leading-none tracking-tighter">
                         {getProviderResult(compareA)?.p50.split(" ")[0]}
                       </span>
                       <span className="text-[32px] font-sans text-[#444]">{getProviderResult(compareA)?.p50.split(" ")[1]}</span>
                    </div>
                    <p className="font-mono text-[10px] text-[#888] tracking-widest uppercase mb-8">P50</p>
                    
                    <div className="flex gap-10 font-mono text-[10px] uppercase tracking-widest text-[#888]">
                      <div className="flex flex-col gap-1">
                        <span>P99</span>
                        <span className="font-sans font-semibold text-[13px] text-[#111] tracking-normal">{getProviderResult(compareA)?.p99}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span>N · 24H</span>
                        <span className="font-sans font-semibold text-[13px] text-[#111] tracking-normal">{getProviderResult(compareA)?.n?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
               </div>
               
               <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                 <span className="font-mono text-[22px] text-[#bbb] font-medium mb-5">VS</span>
                 <p className="text-[10px] font-mono text-[#888] tracking-widest uppercase">SLOWER BY</p>
                 <p className="text-[26px] font-sans font-medium text-[#111] mt-1 mb-1 tracking-tight">
                   {Math.abs(parseFloat(getProviderResult(compareB)?.p50 || "0") - parseFloat(getProviderResult(compareA)?.p50 || "0")).toFixed(getProviderResult(compareA)?.p50.includes("s") ? 1 : 0)} 
                   <span className="text-[16px] text-[#444] ml-1">{getProviderResult(compareA)?.p50.split(" ")[1]}</span>
                 </p>
                 <p className="text-[11px] font-mono text-[#888] tracking-wider">+{(Math.abs(parseFloat(getProviderResult(compareB)?.p50 || "0") - parseFloat(getProviderResult(compareA)?.p50 || "0")) / parseFloat(getProviderResult(compareA)?.p50 || "1") * 100).toFixed(0)}%</p>
               </div>
               
               <div className="w-[50%] h-full bg-[#EBEAE5] px-10 pt-10 pb-[90px] flex flex-col relative shrink-0">
                  <div className="flex items-center justify-end mb-8 gap-2 font-mono text-[9px] uppercase tracking-widest text-[#888]">
                    <span className="bg-[#3A7E50]/10 border border-[#3A7E50]/30 text-[#3A7E50] px-2.5 py-1 rounded-full flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#3A7E50]"></div> LIVE · 24H</span>
                    <span className="bg-transparent border border-[#ccc] px-2.5 py-1 rounded-full text-[#444]">{data.tags[0]?.label || "DATA"}</span>
                    <span className="ml-2">MAY 6, 2026 · 12:17 UTC</span>
                  </div>
                  
                  <div className="mt-auto pl-8">
                    <p className="font-mono text-[10px] text-[#888] tracking-widest uppercase mb-4">RANK 02</p>
                    <p className="text-[54px] font-medium font-sans text-[#824B31] leading-none mb-4">{compareB}</p>
                    
                    <div className="flex items-baseline gap-2 mb-4 relative ml-[-4px]">
                       <span className="text-[120px] font-sans font-medium text-[#111] leading-none tracking-tighter">
                         {getProviderResult(compareB)?.p50.split(" ")[0]}
                       </span>
                       <span className="text-[32px] font-sans text-[#444]">{getProviderResult(compareB)?.p50.split(" ")[1]}</span>
                    </div>
                    <p className="font-mono text-[10px] text-[#888] tracking-widest uppercase mb-8">P50</p>
                    
                    <div className="flex gap-10 font-mono text-[10px] uppercase tracking-widest text-[#888]">
                      <div className="flex flex-col gap-1">
                        <span>P99</span>
                        <span className="font-sans font-semibold text-[13px] text-[#111] tracking-normal">{getProviderResult(compareB)?.p99}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span>N · 24H</span>
                        <span className="font-sans font-semibold text-[13px] text-[#111] tracking-normal">{getProviderResult(compareB)?.n?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          )}

        </div>

          {/* Common Footer for ALL tabs */}
          <div className="absolute bottom-10 left-10 right-10 flex flex-col z-20">
             <div className="w-full h-[1px] bg-[#111] mb-3"></div>
             <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-widest text-[#888] w-full shrink-0">
               <span>OPENCHAINBENCH.COM · № {data.number} · {data.tags[0]?.label}</span>
               <span>{data.results.length} PROVIDERS · {data.stats.samples.replace(/,/g, '')} SAMPLES</span>
             </div>
          </div>
          
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="bg-[#151515] text-white px-5 py-2.5 font-sans font-medium text-[13px] rounded-sm hover:bg-[#111] flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#111]/20">
           <Download className="w-4 h-4" /> Download PNG
        </button>
        <button className="bg-transparent text-[#666] px-2 py-2.5 font-sans font-semibold text-[12px] uppercase tracking-widest hover:text-[#111] flex items-center gap-1 transition-colors">
           OPEN RAW <span className="text-[14px]">↗</span>
        </button>
      </div>

    </div>
  );
}
