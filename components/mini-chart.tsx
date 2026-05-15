"use client";

import React from "react"; 
import { useTheme } from "next-themes"; 

export interface ChartLine { 
  id: string; 
  name: string; 
  color: string; 
  data: number[]; 
} 

export function MiniMultiLineChart({ 
  lines, 
  height = 50, 
  className = "", 
}: { 
  lines: ChartLine[]; 
  height?: number | string; 
  className?: string; 
}) { 
  const { resolvedTheme } = useTheme(); 
  const isDark = resolvedTheme === "dark"; 

  let min = Infinity; 
  let max = -Infinity; 
  lines.forEach((line) => { 
    line.data.forEach((val) => { 
      if (val < min) min = val; 
      if (val > max) max = val; 
    }); 
  }); 

  if (min === Infinity) return null; 

  const range = max - min || 1; 

  return ( 
    <div className={`relative w-full ${className}`} style={{ height }}> 
      <svg 
        viewBox="0 0 1000 100" 
        preserveAspectRatio="none" 
        className="w-full h-full overflow-visible" 
      > 
        {lines.map((line, idx) => { 
          const points = line.data 
            .map((val, i) => { 
              const x = (i / (line.data.length - 1)) * 1000; 
              const y = 100 - ((val - min) / range) * 90 - 5; 
              return `${x.toFixed(2)},${y.toFixed(2)}`; 
            }) 
            .join(" "); 
          
          const actualColor = isDark && line.color === "#111111" ? "#FFFFFF" : line.color; 
          return ( 
            <polyline 
              key={line.id} 
              fill="none" 
              stroke={actualColor} 
              strokeWidth="2" 
              strokeLinejoin="round" 
              strokeLinecap="round" 
              points={points} 
              vectorEffect="non-scaling-stroke" 
              className="opacity-90" 
            /> 
          ); 
        })} 
      </svg> 
      {lines.map((line) => { 
        const lastVal = line.data[line.data.length - 1]; 
        const lastYPercent = 100 - ((lastVal - min) / range) * 90 - 5; 
        const actualColor = isDark && line.color === "#111111" ? "#FFFFFF" : line.color; 
        
        return ( 
          <div 
            key={`dot-${line.id}`} 
            className="absolute w-[5px] h-[5px] rounded-full z-10" 
            style={{ 
              right: -2.5, 
              top: `${lastYPercent}%`, 
              backgroundColor: actualColor, 
              transform: "translateY(-50%)", 
            }} 
          /> 
        ); 
      })} 
    </div> 
  ); 
}
