import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OpenChainBench - Benchmarks',
};

export default function BenchmarksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
