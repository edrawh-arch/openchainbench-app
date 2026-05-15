export function ChartPlaceholder({
  trend,
  color,
}: {
  trend: number[];
  color: string;
}) {
  // A tiny SVG sparkline for the trend column const max = Math.max(...trend); const min = Math.min(...trend); const range = max - min; const points = trend .map((val, i) => { const x = (i / (trend.length - 1)) * 40; const y = 14 - ((val - min) / (range || 1)) * 14; return `${x},${y}`; }) .join(" "); return ( <div className="inline-block w-10 h-3.5"> <svg viewBox="0 0 40 14" className="w-full h-full overflow-visible"> <polyline fill="none" stroke={color} strokeWidth="1" points={points} vectorEffect="non-scaling-stroke" /> </svg> </div> );
}
