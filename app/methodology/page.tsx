import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "OpenChainBench - Methodology",
};

export default function Methodology() {
  return (
    <div className="w-full flex justify-center py-24 bg-transparent min-h-screen relative z-10">
      <div className="w-full max-w-[1000px] px-6">
        <h1 className="text-4xl md:text-[42px] font-semibold tracking-tight text-[#111] dark:text-white mb-4 font-sans">
          Methodology
        </h1>
        <p className="text-[20px] text-[#777] font-sans leading-relaxed mb-20 tracking-tight">
          How every benchmark is measured, reported and reproduced.
        </p>

        {/* DESIGN PRINCIPLES */}
        <section className="mb-20">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-8 border-b border-[#E5E5E5] dark:border-[#333] pb-3 dark:text-[#888888] dark:border-[#333333]">
            Design Principles
          </h2>
          <div className="flex flex-col gap-8">
            <div className="flex gap-6">
              <span className="font-semibold text-[#FF5C00] w-6 shrink-0">
                I.
              </span>
              <p className="text-[15px] font-sans text-[#444] dark:text-[#CCC] leading-relaxed dark:text-[#CCCCCC]">
                <strong className="text-[#111] dark:text-white font-semibold">
                  Identical inputs.
                </strong>{" "}
                Every provider sees the same request. same pair, same notional,
                same destination. submitted at the same moment from the same
                region. If inputs differ, we say so.
              </p>
            </div>
            <div className="flex gap-6">
              <span className="font-semibold text-[#FF5C00] w-6 shrink-0">
                II.
              </span>
              <p className="text-[15px] font-sans text-[#444] dark:text-[#CCC] leading-relaxed dark:text-[#CCCCCC]">
                <strong className="text-[#111] dark:text-white font-semibold">
                  Honest aggregates.
                </strong>{" "}
                We report p50, p90 and p99 latency along with success rate.
                Means are reported but never used as a headline. tail behaviour
                is what users feel.
              </p>
            </div>
            <div className="flex gap-6">
              <span className="font-semibold text-[#FF5C00] w-6 shrink-0">
                III.
              </span>
              <p className="text-[15px] font-sans text-[#444] dark:text-[#CCC] leading-relaxed dark:text-[#CCCCCC]">
                <strong className="text-[#111] dark:text-white font-semibold">
                  Auditable runs.
                </strong>{" "}
                Raw metrics are stored in Prometheus and exposed publicly.
                Anyone can re-run the harness against the same endpoints and
                verify the numbers match.
              </p>
            </div>
            <div className="flex gap-6">
              <span className="font-semibold text-[#FF5C00] w-6 shrink-0">
                IV.
              </span>
              <p className="text-[15px] font-sans text-[#444] dark:text-[#CCC] leading-relaxed dark:text-[#CCCCCC]">
                <strong className="text-[#111] dark:text-white font-semibold">
                  No cherry-picking.
                </strong>{" "}
                The benchmark plan is committed before each run: providers,
                routes, cadence, timeout. Adding or removing providers after
                seeing results requires a published correction.
              </p>
            </div>
            <div className="flex gap-6">
              <span className="font-semibold text-[#FF5C00] w-6 shrink-0">
                V.
              </span>
              <p className="text-[15px] font-sans text-[#444] dark:text-[#CCC] leading-relaxed dark:text-[#CCCCCC]">
                <strong className="text-[#111] dark:text-white font-semibold">
                  Neutral presentation.
                </strong>{" "}
                No spec marks a winner ahead of time. Tables sort mechanically
                by p50; readers compare the columns themselves.
              </p>
            </div>
          </div>
        </section>

        {/* STATISTICAL CONVENTIONS */}
        <section className="mb-20">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-8 border-b border-[#E5E5E5] dark:border-[#333] pb-3 dark:text-[#888888] dark:border-[#333333]">
            Statistical Conventions
          </h2>
          <div className="flex flex-col border-b border-[#E5E5E5] dark:border-[#333] dark:border-[#333333]">
            <div className="flex flex-col md:flex-row gap-4 md:gap-12 py-5 border-t border-[#E5E5E5] dark:border-[#333] dark:border-[#333333]">
              <div className="w-full md:w-32 lg:w-48 shrink-0 font-mono text-[10px] uppercase tracking-widest text-[#888] pt-1 dark:text-[#888888]">
                Latency Aggregates
              </div>
              <div className="text-[15px] font-sans text-[#444] dark:text-[#CCC] leading-relaxed dark:text-[#CCCCCC]">
                Reported as p50, p90, p99 and arithmetic mean over the run
                window. Failed requests (timeout, 5xx, malformed response) are
                excluded from latency aggregates and counted toward success
                rate.
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-12 py-5 border-t border-[#E5E5E5] dark:border-[#333] dark:border-[#333333]">
              <div className="w-full md:w-32 lg:w-48 shrink-0 font-mono text-[10px] uppercase tracking-widest text-[#888] pt-1 dark:text-[#888888]">
                24H Range
              </div>
              <div className="text-[15px] font-sans text-[#444] dark:text-[#CCC] leading-relaxed dark:text-[#CCCCCC]">
                Min and max of p50 observed across the rolling 24-hour window.
                captures the volatility of each provider, not just its central
                tendency.
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-12 py-5 border-t border-[#E5E5E5] dark:border-[#333] dark:border-[#333333]">
              <div className="w-full md:w-32 lg:w-48 shrink-0 font-mono text-[10px] uppercase tracking-widest text-[#888] pt-1 dark:text-[#888888]">
                Δ Field
              </div>
              <div className="text-[15px] font-sans text-[#444] dark:text-[#CCC] leading-relaxed dark:text-[#CCCCCC]">
                Each provider&apos;s p50 expressed as a percentage delta from
                the field mean. Negative is below the field, positive is above.
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-12 py-5 border-t border-[#E5E5E5] dark:border-[#333] dark:border-[#333333]">
              <div className="w-full md:w-32 lg:w-48 shrink-0 font-mono text-[10px] uppercase tracking-widest text-[#888] pt-1 dark:text-[#888888]">
                Success Rate
              </div>
              <div className="text-[15px] font-sans text-[#444] dark:text-[#CCC] leading-relaxed dark:text-[#CCCCCC]">
                Share of requests returning a usable result within the published
                timeout. The only metric that includes failures.
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-12 py-5 border-t border-[#E5E5E5] dark:border-[#333] dark:border-[#333333]">
              <div className="w-full md:w-32 lg:w-48 shrink-0 font-mono text-[10px] uppercase tracking-widest text-[#888] pt-1 dark:text-[#888888]">
                Region Normalisation
              </div>
              <div className="text-[15px] font-sans text-[#444] dark:text-[#CCC] leading-relaxed dark:text-[#CCCCCC]">
                Wherever a benchmark is multi-region, the headline figure is the
                cross-region median. Per-region figures appear in Fig. 3 of each
                report.
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-12 py-5 border-t border-[#E5E5E5] dark:border-[#333] dark:border-[#333333]">
              <div className="w-full md:w-32 lg:w-48 shrink-0 font-mono text-[10px] uppercase tracking-widest text-[#888] pt-1 dark:text-[#888888]">
                Significance
              </div>
              <div className="text-[15px] font-sans text-[#444] dark:text-[#CCC] leading-relaxed dark:text-[#CCCCCC]">
                Differences smaller than the within-provider standard deviation
                are noted but not framed as a ranking.
              </div>
            </div>
          </div>
        </section>

        {/* REPRODUCING A RESULT */}
        <section className="mb-20">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-8 border-b border-[#E5E5E5] dark:border-[#333] pb-3 dark:text-[#888888] dark:border-[#333333]">
            Reproducing A Result
          </h2>
          <ol className="flex flex-col gap-6 list-decimal pl-5 text-[15px] font-sans text-[#444] dark:text-[#CCC] leading-relaxed marker:text-[#111] marker:font-semibold dark:text-[#CCCCCC]">
            <li className="pl-2">
              Clone the harness from the link at the bottom of any benchmark
              report.
            </li>
            <li className="pl-2">
              Set API keys for the providers you want to include. Public
              endpoints work for most aggregators; some bridges require
              allow-listing.
            </li>
            <li className="pl-2">
              Run the harness. it exposes{" "}
              <code className="font-mono text-[11px] bg-white dark:bg-[#0a0a0a] border border-[#E5E5E5] dark:border-[#333] px-1.5 py-0.5 rounded-sm shadow-sm text-[#222] dark:text-[#E0E0E0] dark:bg-[#000000] dark:border-[#333333] dark:text-[#EAEAEA]">
                /metrics
              </code>{" "}
              over HTTP. Point a local Prometheus at it, or query the public
              OpenChainBench Prometheus directly.
            </li>
            <li className="pl-2">
              Run for at least 24 hours to get a comparable sample size (n
              typically ≥ 1,000 per provider per region).
            </li>
            <li className="pl-2">
              Compare your aggregates to the published numbers. If they diverge,
              file a{" "}
              <a
                href="#"
                className="border-b border-[#888] hover:text-[#FF5C00] hover:border-[#FF5C00] text-[#111] dark:text-white transition-colors dark:border-[#666666]"
              >
                provider correction
              </a>{" "}
              with a reproducer.
            </li>
          </ol>
        </section>

        {/* CORRECTIONS */}
        <section>
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-8 border-b border-[#E5E5E5] dark:border-[#333] pb-3 dark:text-[#888888] dark:border-[#333333]">
            Corrections
          </h2>
          <p className="text-[15px] font-sans text-[#444] dark:text-[#CCC] leading-relaxed dark:text-[#CCCCCC]">
            Found a number you can&apos;t reproduce? File a{" "}
            <a
              href="#"
              className="border-b border-[#888] hover:text-[#FF5C00] hover:border-[#FF5C00] text-[#111] dark:text-white transition-colors dark:border-[#666666]"
            >
              data-quality issue
            </a>{" "}
            (the published figure looks wrong) or a{" "}
            <a
              href="#"
              className="border-b border-[#888] hover:text-[#FF5C00] hover:border-[#FF5C00] text-[#111] dark:text-white transition-colors dark:border-[#666666]"
            >
              provider correction
            </a>{" "}
            (your service measures a different value). Material errors are
            corrected in place with a dated note.
          </p>
        </section>
      </div>
    </div>
  );
}
