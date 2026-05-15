"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-black/10 shadow-lg rounded-sm p-3 text-xs min-w-[120px] font-mono tracking-tight z-50">
        {" "}
        <p className="text-[#888] mb-2 pb-2 border-b border-black/5 uppercase tracking-widest text-[9px]">
          {" "}
          {label}{" "}
        </p>{" "}
        {payload.map((entry: any, index: number) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 mb-1.5 last:mb-0"
          >
            {" "}
            <span className="font-sans font-medium text-black">
              {" "}
              {entry.dataKey}{" "}
            </span>{" "}
            <span className="text-[#555]">
              {" "}
              {entry.value.toFixed(1)}s{" "}
            </span>{" "}
          </div>
        ))}{" "}
      </div>
    );
  }
  return null;
};
export function BenchmarkChart({ data }: { type?: string; data: any[] }) {
  const isDark = false;
  if (!data || data.length === 0) return null;
  const renderCustomDot = (props: any) => {
    const { cx, cy, stroke, index, dataKey, payload } = props;
    if (index === data.length - 1) {
      const isCodex = dataKey === "Codex";
      const defaultTextColor = isDark ? "#fff" : "#000";
      const textColor =
        dataKey === "GeckoTerminal"
          ? defaultTextColor
          : isCodex
            ? defaultTextColor
            : stroke;
      let yOffset = 0;
      if (dataKey === "Codex") yOffset = -12;
      if (dataKey === "Mobula") yOffset = 12;
      return (
        <g key={`dot-${dataKey}`}>
          {" "}
          <circle cx={cx} cy={cy} r={3} fill={stroke} />{" "}
          <text
            x={cx + 8}
            y={cy + 3 + yOffset}
            fill={textColor}
            fontSize={11}
            fontFamily="sans-serif"
            fontWeight="600"
          >
            {" "}
            {dataKey}{" "}
          </text>{" "}
          <text
            x={cx + 8}
            y={cy + 15 + yOffset}
            fill={isDark ? "#666" : "#888"}
            fontSize={10}
            fontFamily="monospace"
          >
            {" "}
            {(payload[dataKey] * 1000).toFixed(0)} ms{" "}
          </text>{" "}
        </g>
      );
    }
    return <g key={`dot-${dataKey}-${index}`}></g>;
  };
  return (
    <div className="w-full">
      {" "}
      <div className="h-[280px] w-full relative mb-6 pl-4">
        {" "}
        {/* Background Logo */}{" "}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
          style={{ paddingRight: 90 }}
        >
          {" "}
          <svg
            width="150"
            height="150"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity: 0.03 }}
          >
            {" "}
            <mask id="c-mask-watermark">
              {" "}
              <rect width="100" height="100" fill="white" />{" "}
              <ellipse cx="45" cy="50" rx="22" ry="40" fill="black" />{" "}
              <rect x="45" y="38" width="55" height="24" fill="black" />{" "}
            </mask>{" "}
            <circle
              cx="45"
              cy="50"
              r="45"
              fill="black"
              mask="url(#c-mask-watermark)"
            />{" "}
            <path d="M 65 0 L 100 0 L 100 35 Z" fill="black" />{" "}
            <path d="M 65 100 L 100 100 L 100 65 Z" fill="black" />{" "}
          </svg>{" "}
        </div>{" "}
        {/* Chart */}{" "}
        <div className="absolute inset-0 z-10 w-full h-full">
          {" "}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 90, left: 0, bottom: 0 }}
            >
              {" "}
              <defs>
                {" "}
                <linearGradient id="colorGecko" x1="0" y1="0" x2="0" y2="1">
                  {" "}
                  <stop
                    offset="5%"
                    stopColor="#CCCCCC"
                    stopOpacity={0.15}
                  />{" "}
                  <stop offset="95%" stopColor="#CCCCCC" stopOpacity={0} />{" "}
                </linearGradient>{" "}
              </defs>{" "}
              <XAxis
                dataKey="time"
                axisLine={{
                  stroke: isDark ? "#fff" : "#000",
                  strokeWidth: 1,
                  opacity: 0.1,
                }}
                tickLine={false}
                tick={{
                  fontSize: 9,
                  fill: isDark ? "#666" : "#888",
                  fontFamily: "monospace",
                }}
                dy={10}
              />{" "}
              <YAxis
                domain={[0, 15]}
                ticks={[0, 3.2, 6.4, 9.6, 15]}
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 9,
                  fill: isDark ? "#666" : "#888",
                  fontFamily: "monospace",
                }}
                tickFormatter={(val) => (val === 0 ? "0" : `${val}s`)}
                width={28}
              />{" "}
              <CartesianGrid
                vertical={false}
                stroke={isDark ? "#333" : "#E5E5E5"}
              />{" "}
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: isDark ? "#fff" : "#000",
                  strokeWidth: 1,
                  strokeDasharray: "2 2",
                  strokeOpacity: 0.3,
                }}
              />{" "}
              <Line
                type="stepAfter"
                dataKey="GeckoTerminal"
                stroke="#CCCCCC"
                strokeWidth={1.5}
                isAnimationActive={false}
                dot={renderCustomDot}
                activeDot={{ r: 4 }}
              />{" "}
              <Line
                type="stepAfter"
                dataKey="Codex"
                stroke={isDark ? "#FFFFFF" : "#111111"}
                strokeWidth={1.5}
                isAnimationActive={false}
                dot={renderCustomDot}
                activeDot={{ r: 4 }}
              />{" "}
              <Line
                type="stepAfter"
                dataKey="Mobula"
                stroke="#FF5C00"
                strokeWidth={1.5}
                isAnimationActive={false}
                dot={renderCustomDot}
                activeDot={{ r: 4 }}
              />{" "}
            </LineChart>
          </ResponsiveContainer>{" "}
        </div>{" "}
      </div>{" "}
      <div className="flex gap-6 text-[10px] font-sans font-semibold text-black items-center justify-start pt-4 border-t border-black/10">
        {" "}
        <div className="flex gap-2 items-center">
          {" "}
          <div className="w-4 h-[2px] bg-[#CCCCCC]"></div> GeckoTerminal{" "}
          <span className="font-mono text-[9px] text-[#888] font-normal">
            {" "}
            11.0 s{" "}
          </span>{" "}
        </div>{" "}
        <div className="flex gap-2 items-center">
          {" "}
          <div className="w-4 h-[2px] bg-[#111111]"></div> Codex{" "}
          <span className="font-mono text-[9px] text-[#888] font-normal">
            {" "}
            1.6 s{" "}
          </span>{" "}
        </div>{" "}
        <div className="flex gap-2 items-center">
          {" "}
          <div className="w-4 h-[2px] bg-[#FF5C00]"></div> Mobula{" "}
          <span className="font-mono text-[9px] text-[#888] font-normal">
            {" "}
            0.9 s{" "}
          </span>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
