import type { Metadata } from "next";
import Link from "next/link";
import { Copy } from "lucide-react";

export const metadata: Metadata = {
  title: "OpenChainBench - Contribute",
};

export default function Contribute() {
  return (
    <div className="w-full flex justify-center py-24 bg-transparent min-h-screen relative z-10">
      <div className="w-full max-w-[1000px] px-6">
        <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-4 dark:text-[#888888]">
          Tutorial
        </h4>
        <h1 className="text-4xl md:text-[42px] font-semibold tracking-tight text-[#111] dark:text-white mb-6 font-sans">
          Submit a benchmark.
        </h1>
        <p className="text-[20px] text-[#777] font-sans leading-relaxed mb-16 tracking-tight">
          Anyone can publish on OpenChainBench. You write the harness, you host
          it, you keep your secrets. The project shares one Prometheus that
          scrapes your public{" "}
          <code className="font-mono bg-[#F5F5F5] dark:bg-[#111] px-1.5 py-0.5 rounded text-[16px] text-[#111] dark:text-white dark:bg-[#111111]">
            /metrics
          </code>{" "}
          endpoint. that is the only piece of common infrastructure.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mb-20 font-sans border-b border-[#F0F0F0] dark:border-[#222] pb-16 dark:border-[#222222]">
          <Link
            href="#step-1"
            className="flex flex-col group cursor-pointer block"
          >
            <span className="font-mono text-[10px] text-[#FF5C00] border-b border-[#FF5C00] pb-2 mb-3">
              01
            </span>
            <span className="font-bold text-[13px] text-[#111] dark:text-white leading-snug mb-1 group-hover:text-[#FF5C00] transition-colors">
              Open an issue
            </span>
            <span className="text-[12px] text-[#666] dark:text-[#AAA] leading-snug dark:text-[#AAAAAA]">
              Align on the metric.
            </span>
          </Link>
          <Link
            href="#step-2"
            className="flex flex-col group cursor-pointer block"
          >
            <span className="font-mono text-[10px] text-[#888] group-hover:text-[#FF5C00] border-b border-[#ccc] group-hover:border-[#FF5C00] transition-colors pb-2 mb-3 dark:text-[#888888]">
              02
            </span>
            <span className="font-bold text-[13px] text-[#111] dark:text-white leading-snug mb-1 group-hover:text-[#FF5C00] transition-colors">
              Write the spec
            </span>
            <span className="text-[12px] text-[#666] dark:text-[#AAA] leading-snug dark:text-[#AAAAAA]">
              One YAML file.
            </span>
          </Link>
          <Link
            href="#step-3"
            className="flex flex-col group cursor-pointer block"
          >
            <span className="font-mono text-[10px] text-[#888] group-hover:text-[#FF5C00] border-b border-[#ccc] group-hover:border-[#FF5C00] transition-colors pb-2 mb-3 dark:text-[#888888]">
              03
            </span>
            <span className="font-bold text-[13px] text-[#111] dark:text-white leading-snug mb-1 group-hover:text-[#FF5C00] transition-colors">
              Build the harness
            </span>
            <span className="text-[12px] text-[#666] dark:text-[#AAA] leading-snug dark:text-[#AAAAAA]">
              Expose /metrics.
            </span>
          </Link>
          <Link
            href="#step-4"
            className="flex flex-col group cursor-pointer block"
          >
            <span className="font-mono text-[10px] text-[#888] group-hover:text-[#FF5C00] border-b border-[#ccc] group-hover:border-[#FF5C00] transition-colors pb-2 mb-3 dark:text-[#888888]">
              04
            </span>
            <span className="font-bold text-[13px] text-[#111] dark:text-white leading-snug mb-1 group-hover:text-[#FF5C00] transition-colors">
              Host it
            </span>
            <span className="text-[12px] text-[#666] dark:text-[#AAA] leading-snug dark:text-[#AAAAAA]">
              Anywhere with HTTPS.
            </span>
          </Link>
          <Link
            href="#step-5"
            className="flex flex-col group cursor-pointer block"
          >
            <span className="font-mono text-[10px] text-[#888] group-hover:text-[#FF5C00] border-b border-[#ccc] group-hover:border-[#FF5C00] transition-colors pb-2 mb-3 dark:text-[#888888]">
              05
            </span>
            <span className="font-bold text-[13px] text-[#111] dark:text-white leading-snug mb-1 group-hover:text-[#FF5C00] transition-colors">
              Wire the scrape
            </span>
            <span className="text-[12px] text-[#666] dark:text-[#AAA] leading-snug dark:text-[#AAAAAA]">
              One block in prometheus.yml.
            </span>
          </Link>
          <Link
            href="#step-6"
            className="flex flex-col group cursor-pointer block"
          >
            <span className="font-mono text-[10px] text-[#888] group-hover:text-[#FF5C00] border-b border-[#ccc] group-hover:border-[#FF5C00] transition-colors pb-2 mb-3 dark:text-[#888888]">
              06
            </span>
            <span className="font-bold text-[13px] text-[#111] dark:text-white leading-snug mb-1 group-hover:text-[#FF5C00] transition-colors">
              Open a PR
            </span>
            <span className="text-[12px] text-[#666] dark:text-[#AAA] leading-snug dark:text-[#AAAAAA]">
              The page renders itself.
            </span>
          </Link>
        </div>

        <div className="bg-white dark:bg-[#0a0a0a] border border-[#E5E5E5] dark:border-[#333] rounded-[4px] mb-20 flex flex-col md:flex-row overflow-hidden shadow-sm dark:bg-[#000000] dark:border-[#333333]">
          <div className="p-8 md:w-2/3 border-b md:border-b-0 md:border-r border-[#E5E5E5] dark:border-[#333] dark:border-[#333333]">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-4 dark:text-[#888888]">
              How it actually works
            </h4>
            <h3 className="font-semibold text-[#111] dark:text-white text-lg font-sans mb-4">
              A federation,{" "}
              <span className="text-[#FF5C00]">not a platform.</span>
            </h3>
            <p className="text-[14px] text-[#444] dark:text-[#CCC] font-sans leading-relaxed mb-4 dark:text-[#CCCCCC]">
              Every benchmark on this site is run by whoever wrote it. You host
              your harness wherever you like, expose{" "}
              <code className="font-mono bg-[#F5F5F5] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#333] px-1 py-0.5 rounded text-[12px] text-[#111] dark:text-white dark:bg-[#111111] dark:border-[#333333]">
                /metrics
              </code>{" "}
              over HTTPS, and the project&apos;s shared Prometheus scrapes that
              URL on a schedule. You keep your API keys, your wallet keys, your
              budget. Maintainers only see the metric values your harness
              chooses to publish.
            </p>
            <p className="text-[14px] text-[#444] dark:text-[#CCC] font-sans leading-relaxed mb-4 dark:text-[#CCCCCC]">
              The only piece of infrastructure shared by the project is one
              Prometheus instance. That is the URL every YAML spec points at.
              Adding a new harness is one extra{" "}
              <code className="font-mono bg-[#F5F5F5] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#333] px-1 py-0.5 rounded text-[12px] text-[#111] dark:text-white dark:bg-[#111111] dark:border-[#333333]">
                scrape_configs
              </code>{" "}
              block in{" "}
              <code className="font-mono bg-[#F5F5F5] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#333] px-1 py-0.5 rounded text-[12px] text-[#111] dark:text-white dark:bg-[#111111] dark:border-[#333333]">
                infrastructure/prometheus/prometheus.yml
              </code>
              . No new credentials, no new services, no privileged access to
              share.
            </p>
            <p className="text-[14px] text-[#444] dark:text-[#CCC] font-sans leading-relaxed dark:text-[#CCCCCC]">
              For a concrete end-to-end example with a fictional contributor,
              the spec, the Go harness, deploying to Fly.io, opening the PR, see
              the walkthrough doc.
            </p>
          </div>
          <div className="p-8 md:w-1/3 bg-[#FAFAFA] dark:bg-[#111] dark:bg-[#0a0a0a]">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-6 dark:text-[#888888]">
              Realistic timeline
            </h4>
            <div className="space-y-4 text-[13px] font-sans mb-6 text-[#111] dark:text-white">
              <p>
                <strong className="font-semibold">Day 0 · ~30 min.</strong> open
                issue, align on methodology with a maintainer.
              </p>
              <p>
                <strong className="font-semibold">Day 1-2 · ~2 h.</strong> write
                the spec + harness in your fork.
              </p>
              <p>
                <strong className="font-semibold">Day 2 · ~30 min.</strong>{" "}
                deploy your harness on Fly / Railway / your VPS, verify{" "}
                <code className="font-mono bg-[#EFEFEF] px-1 py-0.5 rounded border border-[#E5E5E5] dark:border-[#333] text-[11px] dark:border-[#333333]">
                  /metrics
                </code>{" "}
                publicly reachable.
              </p>
              <p>
                <strong className="font-semibold">Day 2 · ~10 min.</strong> open
                the PR (spec + harness + scrape config).
              </p>
              <p>
                <strong className="font-semibold">Day 3 · &lt; 30 min.</strong>{" "}
                maintainer reviews, merges, reloads Prometheus. Site renders
                within 60 s.
              </p>
            </div>
            <p className="text-[11px] text-[#AAA] font-sans italic dark:text-[#666666]">
              ~3-4 hours of focused work, spread across a few days.
            </p>
          </div>
        </div>

        <section id="step-1" className="mb-16 scroll-mt-24">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-6 border-b border-[#E5E5E5] dark:border-[#333] pb-3 dark:text-[#888888] dark:border-[#333333]">
            <span className="text-[#FF5C00]">Step 1.</span> Open an issue
          </h2>
          <p className="text-[15px] font-sans text-[#444] dark:text-[#CCC] leading-relaxed mb-6 dark:text-[#CCCCCC]">
            Use the Propose a benchmark template to describe what you want to
            measure, which providers, and where the harness will run.
            Maintainers respond with feedback before any code is written. Want
            to brainstorm first? Use Discussions → Ideas.
          </p>
        </section>

        <section id="step-2" className="mb-16 scroll-mt-24">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-6 border-b border-[#E5E5E5] dark:border-[#333] pb-3 dark:text-[#888888] dark:border-[#333333]">
            <span className="text-[#FF5C00]">Step 2.</span> Write the spec
          </h2>
          <p className="text-[15px] font-sans text-[#444] dark:text-[#CCC] leading-relaxed mb-6 dark:text-[#CCCCCC]">
            Drop a file at{" "}
            <code className="font-mono bg-[#F5F5F5] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#333] px-1 py-0.5 rounded text-[13px] text-[#111] dark:text-white dark:bg-[#111111] dark:border-[#333333]">
              benchmarks/&lt;your-slug&gt;.yml
            </code>
            . It is the source of truth for the report, title, abstract,
            methodology, providers and the PromQL that fills in the numbers.
          </p>
          <div className="relative group bg-[#FAF9F5] border border-[#EBE8DF] rounded-[4px] p-6 mb-6 overflow-x-auto text-[13px] font-mono leading-relaxed text-[#222] dark:text-[#E0E0E0] dark:text-[#EAEAEA]">
            <button
              className="absolute top-4 right-4 text-[#888] hover:text-[#FF5C00] transition-colors opacity-0 group-hover:opacity-100 dark:text-[#888888]"
              aria-label="Copy code"
            >
              <Copy className="w-4 h-4 cursor-pointer" />
            </button>
            <pre>
              <code>{`# benchmarks/wallet-portfolio-latency.yml
slug: wallet-portfolio-latency
number: "005"
title: Wallet Portfolio API: Read Latency
subtitle: How fast each wallet API returns a complete portfolio for a busy address.
category: Wallets
status: live
metric: Portfolio read
unit: ms

abstract: |
  We benchmark how long the major wallet APIs take to return a full
  portfolio (tokens, balances, USD values, NFTs) for a known busy address
  across 12 chains. The harness issues identical GETs from three regions
  and records p50, p90 and p99 wall-clock latency along with success rate.

methodology:
  - "Address set: 200 addresses with 50+ tokens across at least 5 chains."
  - "Cadence: 1 request / address / region every 60 s for 24 hours."
  - "Timeout: 5,000 ms. Failures excluded from latency aggregates."
  - "Regions: us-east-1, eu-west-1, ap-southeast-1."

findings: []

source: https://github.com/OpenChainBench/OpenChainBench/tree/main/harnesses/wallet-portfolio

prometheus:
  url: https://prom.openchainbench.com  # shared OpenChainBench Prometheus
  window: 24h

providers:
  - slug: provider-a
    name: Provider A
    tag: v3-endpoints
    secondary: { label: "Chains", value: "44" }
    queries:
      p50: histogram_quantile(0.5,  sum by (le) (rate(ocb_portfolio_ms_bucket{provider="provider-a", success="true"}[24h])))
      p90: histogram_quantile(0.9,  sum by (le) (rate(ocb_portfolio_ms_bucket{provider="provider-a", success="true"}[24h])))
      p99: histogram_quantile(0.99, sum by (le) (rate(ocb_portfolio_ms_bucket{provider="provider-a", success="true"}[24h])))
      success: sum(rate(ocb_portfolio_total{provider="provider-a", success="true"}[24h])) / sum(rate(ocb_portfolio_total{provider="provider-a"}[24h]))
      sample_size: sum(increase(ocb_portfolio_total{provider="provider-a"}[24h]))
      series: histogram_quantile(0.5, sum by (le) (rate(ocb_portfolio_ms_bucket{provider="provider-a", success="true"}[$__rate_interval])))`}</code>
            </pre>
          </div>
          <p className="text-[15px] font-sans text-[#444] dark:text-[#CCC] leading-relaxed dark:text-[#CCCCCC]">
            That is the entire wire format. The Zod schema in{" "}
            <code className="font-mono bg-[#F5F5F5] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#333] px-1 py-0.5 rounded text-[13px] text-[#111] dark:text-white dark:bg-[#111111] dark:border-[#333333]">
              src/lib/spec-schema.ts
            </code>{" "}
            is the single source of truth;{" "}
            <code className="font-mono bg-[#F5F5F5] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#333] px-1 py-0.5 rounded text-[13px] text-[#111] dark:text-white dark:bg-[#111111] dark:border-[#333333]">
              pnpm validate
            </code>{" "}
            lints every spec in CI.
          </p>
        </section>

        <section id="step-3" className="mb-16 scroll-mt-24">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-6 border-b border-[#E5E5E5] dark:border-[#333] pb-3 dark:text-[#888888] dark:border-[#333333]">
            <span className="text-[#FF5C00]">Step 3.</span> Build the harness
          </h2>
          <p className="text-[15px] font-sans text-[#444] dark:text-[#CCC] leading-relaxed mb-4 dark:text-[#CCCCCC]">
            The harness is a long-running data producer. Whatever fits the
            providers: Bun, Node, Python, Go, Rust. The contract is small:
          </p>
          <ul className="list-disc pl-5 space-y-3 text-[14px] text-[#444] dark:text-[#CCC] font-sans mb-6 dark:text-[#CCCCCC]">
            <li className="pl-2">
              Run continuously, expose{" "}
              <code className="font-mono bg-[#F5F5F5] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#333] px-1 py-0.5 rounded text-[12px] text-[#111] dark:text-white dark:bg-[#111111] dark:border-[#333333]">
                /metrics
              </code>{" "}
              over HTTP on a documented port (e.g.{" "}
              <code className="font-mono bg-[#F5F5F5] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#333] px-1 py-0.5 rounded text-[12px] text-[#111] dark:text-white dark:bg-[#111111] dark:border-[#333333]">
                :2112
              </code>{" "}
              or{" "}
              <code className="font-mono bg-[#F5F5F5] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#333] px-1 py-0.5 rounded text-[12px] text-[#111] dark:text-white dark:bg-[#111111] dark:border-[#333333]">
                :9090
              </code>
              ).
            </li>
            <li className="pl-2">
              Use the metric and label names referenced by your YAML. That is
              how the site retrieves your numbers.
            </li>
            <li className="pl-2">
              Document inputs, regions, timeouts and the metrics port in{" "}
              <code className="font-mono bg-[#F5F5F5] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#333] px-1 py-0.5 rounded text-[12px] text-[#111] dark:text-white dark:bg-[#111111] dark:border-[#333333]">
                harnesses/&lt;slug&gt;/README.md
              </code>
              .
            </li>
            <li className="pl-2">
              Don&apos;t commit API keys. Read them from environment variables
              and document them in a{" "}
              <code className="font-mono bg-[#F5F5F5] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#333] px-1 py-0.5 rounded text-[12px] text-[#111] dark:text-white dark:bg-[#111111] dark:border-[#333333]">
                .env.example
              </code>
              .
            </li>
            <li className="pl-2">
              Don&apos;t bundle Prometheus, Grafana or Alertmanager. They live
              in{" "}
              <code className="font-mono bg-[#F5F5F5] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#333] px-1 py-0.5 rounded text-[12px] text-[#111] dark:text-white dark:bg-[#111111] dark:border-[#333333]">
                infrastructure/
              </code>{" "}
              and are shared across every harness.
            </li>
          </ul>
        </section>

        <section id="step-4" className="mb-16 scroll-mt-24">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-6 border-b border-[#E5E5E5] dark:border-[#333] pb-3 dark:text-[#888888] dark:border-[#333333]">
            <span className="text-[#FF5C00]">Step 4.</span> Host it
          </h2>
          <p className="text-[15px] font-sans text-[#444] dark:text-[#CCC] leading-relaxed mb-4 dark:text-[#CCCCCC]">
            OpenChainBench is a federation: each harness is hosted by whoever
            wrote it. Pick whatever fits: Railway, Fly, Cloud Run, a VPS, a home
            server with a static IP. The only requirement is that{" "}
            <code className="font-mono bg-[#F5F5F5] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#333] px-1 py-0.5 rounded text-[13px] text-[#111] dark:text-white dark:bg-[#111111] dark:border-[#333333]">
              /metrics
            </code>{" "}
            is reachable over HTTPS at a stable URL.
          </p>
          <ul className="list-disc pl-5 space-y-3 text-[14px] text-[#444] dark:text-[#CCC] font-sans mb-6 dark:text-[#CCCCCC]">
            <li className="pl-2">
              You own the runtime, the secrets and the budget. Maintainers never
              see your API keys or wallet keys.
            </li>
            <li className="pl-2">
              If your harness needs API keys from the providers it benchmarks,
              you bring them. The data path treats every harness identically.
              Either Mobula-hosted or contributor-hosted.
            </li>
            <li className="pl-2">
              Plan for stability: if your URL changes you (or a maintainer) need
              to update the scrape config.
            </li>
          </ul>
        </section>

        <section id="step-5" className="mb-16 scroll-mt-24">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-6 border-b border-[#E5E5E5] dark:border-[#333] pb-3 dark:text-[#888888] dark:border-[#333333]">
            <span className="text-[#FF5C00]">Step 5.</span> Wire the scrape
          </h2>
          <p className="text-[15px] font-sans text-[#444] dark:text-[#CCC] leading-relaxed mb-6 dark:text-[#CCCCCC]">
            Append a job to{" "}
            <code className="font-mono bg-[#F5F5F5] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#333] px-1 py-0.5 rounded text-[13px] text-[#111] dark:text-white dark:bg-[#111111] dark:border-[#333333]">
              infrastructure/prometheus/prometheus.yml
            </code>{" "}
            pointing at your public URL so the shared Prometheus picks up your
            harness:
          </p>
          <div className="relative group bg-[#FAF9F5] border border-[#EBE8DF] rounded-[4px] p-6 mb-6 overflow-x-auto text-[13px] font-mono leading-relaxed text-[#222] dark:text-[#E0E0E0] dark:text-[#EAEAEA]">
            <button
              className="absolute top-4 right-4 text-[#888] hover:text-[#FF5C00] transition-colors opacity-0 group-hover:opacity-100 dark:text-[#888888]"
              aria-label="Copy code"
            >
              <Copy className="w-4 h-4 cursor-pointer" />
            </button>
            <pre>
              <code>{`  - job_name: <your-slug>
    metrics_path: /metrics
    scheme: https
    static_configs:
      - targets:
          - your-harness.example.com  # or *.up.railway.app, *.fly.dev, …
        labels:
          benchmark: <your-slug>
          host: <you>                 # alice | acme-rpc | mobula …`}</code>
            </pre>
          </div>
        </section>

        <section id="step-6" className="mb-16 scroll-mt-24">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-6 border-b border-[#E5E5E5] dark:border-[#333] pb-3 dark:text-[#888888] dark:border-[#333333]">
            <span className="text-[#FF5C00]">Step 6.</span> Dry-run + open the
            PR
          </h2>
          <p className="text-[15px] font-sans text-[#444] dark:text-[#CCC] leading-relaxed mb-6 dark:text-[#CCCCCC]">
            Test the queries locally before opening the PR:
          </p>
          <div className="relative group bg-[#FAF9F5] border border-[#EBE8DF] rounded-[4px] p-6 mb-6 overflow-x-auto text-[13px] font-mono leading-relaxed text-[#222] dark:text-[#E0E0E0] dark:text-[#EAEAEA]">
            <button
              className="absolute top-4 right-4 text-[#888] hover:text-[#FF5C00] transition-colors opacity-0 group-hover:opacity-100 dark:text-[#888888]"
              aria-label="Copy code"
            >
              <Copy className="w-4 h-4 cursor-pointer" />
            </button>
            <pre>
              <code>{`pnpm validate                        # schema lint
pnpm spec:dry-run wallet-portfolio-latency   # hit Prometheus, print resolved numbers
pnpm dev                             # render the page locally`}</code>
            </pre>
          </div>
          <p className="text-[15px] font-sans text-[#444] dark:text-[#CCC] leading-relaxed mb-6 dark:text-[#CCCCCC]">
            Open the PR. CI runs{" "}
            <code className="font-mono bg-[#F5F5F5] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#333] px-1 py-0.5 rounded text-[13px] text-[#111] dark:text-white dark:bg-[#111111] dark:border-[#333333]">
              pnpm validate
            </code>
            ,{" "}
            <code className="font-mono bg-[#F5F5F5] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#333] px-1 py-0.5 rounded text-[13px] text-[#111] dark:text-white dark:bg-[#111111] dark:border-[#333333]">
              pnpm typecheck
            </code>{" "}
            and the build. Once merged, a maintainer redeploys the central
            Prometheus to apply the new scrape job and the site renders your
            benchmark on the next ISR cycle (within 60 seconds).
          </p>
        </section>

        <section className="mb-16 pb-8 border-b border-[#F0F0F0] dark:border-[#222] dark:border-[#222222]">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-[#FF5C00] mb-6 border-b border-[#E5E5E5] dark:border-[#333] pb-3 dark:border-[#333333]">
            Reference
          </h2>
          <ul className="space-y-4 text-[14px] text-[#222] dark:text-[#E0E0E0] font-sans dark:text-[#EAEAEA]">
            <li>
              <a
                href="#"
                className="border-b border-[#ccc] hover:text-[#FF5C00] hover:border-[#FF5C00] transition-colors"
              >
                docs/walkthrough.md → concrete end-to-end example with a
                fictional contributor
              </a>
            </li>
            <li>
              <a
                href="#"
                className="border-b border-[#ccc] hover:text-[#FF5C00] hover:border-[#FF5C00] transition-colors"
              >
                Methodology → design principles, statistical conventions
              </a>
            </li>
            <li>
              <a
                href="#"
                className="border-b border-[#ccc] hover:text-[#FF5C00] hover:border-[#FF5C00] transition-colors"
              >
                benchmarks/README.md → spec field reference
              </a>
            </li>
            <li>
              <a
                href="#"
                className="border-b border-[#ccc] hover:text-[#FF5C00] hover:border-[#FF5C00] transition-colors"
              >
                harnesses/README.md → harness contract
              </a>
            </li>
            <li>
              <a
                href="#"
                className="border-b border-[#ccc] hover:text-[#FF5C00] hover:border-[#FF5C00] transition-colors"
              >
                infrastructure/README.md → the shared Prometheus, scrape config
                format
              </a>
            </li>
            <li>
              <a
                href="#"
                className="border-b border-[#ccc] hover:text-[#FF5C00] hover:border-[#FF5C00] transition-colors"
              >
                CONTRIBUTING.md → full submission flow
              </a>
            </li>
          </ul>
        </section>

        <div className="flex flex-col sm:flex-row items-baseline gap-6 font-sans text-[14px]">
          <span className="font-medium text-[#FF5C00]">Ready?</span>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-[#444] dark:text-[#CCC] border-b border-[#ccc] hover:border-[#FF5C00] hover:text-[#FF5C00] transition-colors dark:text-[#CCCCCC]"
            >
              Open a benchmark issue →
            </a>
            <a
              href="#"
              className="text-[#444] dark:text-[#CCC] border-b border-[#ccc] hover:border-[#FF5C00] hover:text-[#FF5C00] transition-colors dark:text-[#CCCCCC]"
            >
              Brainstorm in Discussions ↗
            </a>
            <a
              href="#"
              className="text-[#444] dark:text-[#CCC] border-b border-[#ccc] hover:border-[#FF5C00] hover:text-[#FF5C00] transition-colors dark:text-[#CCCCCC]"
            >
              GitHub repository ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
