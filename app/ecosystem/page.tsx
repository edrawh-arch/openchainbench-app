'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { NetworkMetrics } from '@/components/network-metrics';

const LiveEcosystem = dynamic(() => import('@/components/live-ecosystem').then(mod => mod.LiveEcosystem), { ssr: false });

const FILTER_CHAINS = [
  { id: 'all', name: 'All chains' },
  { id: 'eth', name: 'Ethereum' },
  { id: 'sol', name: 'Solana' },
  { id: 'base', name: 'Base' },
  { id: 'bnb', name: 'BNB' },
  { id: 'arb', name: 'Arbitrum' },
];

export default function EcosystemPage() {
  const [selectedChain, setSelectedChain] = useState('all');

  const selectedName = FILTER_CHAINS.find(c => c.id === selectedChain)?.name || 'Network';

  return (
    <div className="w-full flex justify-center pb-16 bg-transparent pt-16 lg:pt-20">
      <div className="w-full max-w-[1400px] px-6 md:px-8">
        <div className="flex flex-wrap gap-3 mb-10">
          {FILTER_CHAINS.map(chain => (
            <button
              key={chain.id}
              onClick={() => setSelectedChain(chain.id)}
              className={`px-4 py-2 rounded-sm font-mono text-[11px] uppercase tracking-widest transition-colors ${
                selectedChain === chain.id 
                  ? 'bg-[#FF5C00] text-white border border-[#FF5C00] shadow-[0_2px_8px_rgba(255,92,0,0.25)]' 
                  : 'bg-white text-[#666] border border-[#E5E5E5] hover:border-[#111] hover:text-[#111]'
              }`}
            >
              {chain.name.toUpperCase()}
            </button>
          ))}
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-[56px] font-semibold tracking-tight text-[#111] mb-6 font-sans">
          {selectedChain === 'all' ? 'Network Ecosystem' : `${selectedName} Ecosystem`}
        </h1>
        <p className="text-xl sm:text-2xl text-[#777] leading-relaxed font-sans tracking-tight mb-16 max-w-3xl">
          Live stream of ecosystem data, transaction volumes, and network activity {selectedChain === 'all' ? 'across supported chains' : `on ${selectedName}`}.
        </p>
        <LiveEcosystem globalFilter={selectedChain} />
        <NetworkMetrics globalFilter={selectedChain} />
      </div>
    </div>
  );
}
