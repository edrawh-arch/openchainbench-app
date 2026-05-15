import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="w-full bg-white text-[#111] font-sans border-t mt-32"
      style={{ borderColor: "rgba(0, 0, 0, 0.05)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 pt-16 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          <div className="max-w-[320px]">
            <div className="flex items-center gap-2 mb-6">
              <svg
                width="22"
                height="22"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask id="c-mask-footer">
                  <rect width="100" height="100" fill="white" />
                  <ellipse cx="45" cy="50" rx="22" ry="40" fill="black" />
                  <rect x="45" y="38" width="55" height="24" fill="black" />
                </mask>
                <circle
                  cx="45"
                  cy="50"
                  r="45"
                  fill="black"
                  mask="url(#c-mask-footer)"
                />
                <path d="M 65 0 L 100 0 L 100 35 Z" fill="#A0A0A0" />
                <path d="M 65 100 L 100 100 L 100 65 Z" fill="#A0A0A0" />
              </svg>
              <span className="font-bold tracking-tight text-[17px]">
                OpenChainBench
              </span>
            </div>
            <p className="text-[14px] text-[#444] leading-relaxed mb-6">
              Open, reproducible benchmarks for crypto infrastructure.
              Methodology, specs and raw metrics are public.
            </p>
            <div className="text-[11px] text-[#888] font-mono tracking-widest uppercase">
              MIT-LICENSED <span className="mx-1.5">·</span> COMMUNITY-RUN
            </div>
          </div>

          <div className="flex flex-wrap gap-x-24 gap-y-12 shrink-0">
            <div className="flex flex-col gap-4">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-1">
                Read
              </h4>
              <Link
                href="/"
                className="text-[14px] text-[#111] hover:text-[#555] underline decoration-1 underline-offset-4 decoration-[#E5E5E5] hover:decoration-[#111] transition-colors"
              >
                Overview
              </Link>
              <Link
                href="/benchmarks"
                className="text-[14px] text-[#111] hover:text-[#555] underline decoration-1 underline-offset-4 decoration-[#E5E5E5] hover:decoration-[#111] transition-colors"
              >
                Benchmarks
              </Link>
              <Link
                href="/methodology"
                className="text-[14px] text-[#111] hover:text-[#555] underline decoration-1 underline-offset-4 decoration-[#E5E5E5] hover:decoration-[#111] transition-colors"
              >
                Methodology
              </Link>
              <a
                href="#"
                className="text-[14px] text-[#111] hover:text-[#555] underline decoration-1 underline-offset-4 decoration-[#E5E5E5] hover:decoration-[#111] transition-colors"
              >
                Press kit
              </a>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-1">
                Contribute
              </h4>
              <a
                href="#"
                className="text-[14px] text-[#111] hover:text-[#555] underline decoration-1 underline-offset-4 decoration-[#E5E5E5] hover:decoration-[#111] transition-colors"
              >
                Tutorial
              </a>
              <a
                href="#"
                className="text-[14px] text-[#111] hover:text-[#555] underline decoration-1 underline-offset-4 decoration-[#E5E5E5] hover:decoration-[#111] transition-colors"
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-[14px] text-[#111] hover:text-[#555] underline decoration-1 underline-offset-4 decoration-[#E5E5E5] hover:decoration-[#111] transition-colors"
              >
                Open an issue
              </a>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-1">
                Follow
              </h4>
              <a
                href="#"
                className="text-[14px] text-[#111] hover:text-[#555] underline decoration-1 underline-offset-4 decoration-[#E5E5E5] hover:decoration-[#111] transition-colors"
              >
                @openchainbench
              </a>
              <a
                href="#"
                className="text-[14px] text-[#111] hover:text-[#555] underline decoration-1 underline-offset-4 decoration-[#E5E5E5] hover:decoration-[#111] transition-colors"
              >
                r/openchainbench
              </a>
              <a
                href="#"
                className="text-[14px] text-[#111] hover:text-[#555] underline decoration-1 underline-offset-4 decoration-[#E5E5E5] hover:decoration-[#111] transition-colors"
              >
                About
              </a>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-black/5 mb-8"></div>

        <div className="mb-8 flex items-start">
          <p className="text-[12px] text-[#666] leading-relaxed max-w-[600px]">
            Every benchmark is a YAML spec plus a public harness exposing{" "}
            <code className="bg-[#F5F5F5] px-1.5 py-0.5 rounded text-[11px] font-mono text-[#111]">
              /metrics
            </code>
            . The site queries one shared Prometheus and re-renders every
            minute. Anyone can submit a benchmark — the{" "}
            <span className="font-semibold text-black">contribution guide</span>{" "}
            walks through it.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-black/5 text-[10px] text-[#999] font-mono tracking-widest uppercase">
          <div>
            © 2026 OPENCHAINBENCH <span className="mx-2">·</span> MIT LICENSE
          </div>
        </div>
      </div>
    </footer>
  );
}
