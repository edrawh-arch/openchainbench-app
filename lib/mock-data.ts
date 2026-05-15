import type { ChartLine } from '@/components/mini-chart';

function genNoise(base: number, volatility: number, count: number) {
  let val = base;
  const res = [];
  for (let i = 0; i < count; i++) {
    res.push(val);
    const pseudoRandom = Math.abs(Math.sin(base * 1000 + i * 123.456));
    val += (pseudoRandom - 0.5) * volatility;
  }
  return res;
}

const pts = 40;

export const BENCHMARKS_LIST = [
  {
    id: 'fastest-onchain-data-provider',
    number: '001',
    numberColor: '#FF5C00',
    category: 'DATA',
    title: 'Fastest on-chain data provider',
    description: 'On-chain event to WebSocket emission, in seconds. Measured against canonical-tip archive nodes.',
    value: '0.7',
    unit: 's',
    live: true,
    providers: 3,
    samples: '155,146',
    updatedAt: 'May 6, 2026, 9:17 AM UTC',
    lines: [
      { id: 'GeckoTerminal', name: 'GeckoTerminal', color: '#CCCCCC', data: genNoise(10, 1.2, pts) },
      { id: 'Codex', name: 'Codex', color: '#111111', data: genNoise(3, 0.4, pts) },
      { id: 'Mobula', name: 'Mobula', color: '#FF5C00', data: genNoise(0.7, 0.1, pts) },
    ]
  },
  {
    id: 'fastest-cross-chain-bridge',
    number: '002',
    numberColor: '#FF5C00',
    category: 'BRIDGES',
    title: 'Fastest cross-chain bridge',
    description: 'Time to receive a usable cross-chain quote, in milliseconds. Identical route, identical notional, every bridge.',
    value: '137',
    unit: 'ms',
    live: true,
    providers: 4,
    samples: '16,409',
    updatedAt: 'May 6, 2026, 9:17 AM UTC',
    lines: [
      { id: 'LiFi', name: 'LiFi', color: '#CCCCCC', data: genNoise(800, 20, pts) },
      { id: 'Relay', name: 'Relay', color: '#888888', data: genNoise(600, 15, pts) },
      { id: 'Debridge', name: 'Debridge', color: '#111111', data: genNoise(300, 15, pts) },
      { id: 'Mobula', name: 'Mobula', color: '#FF5C00', data: genNoise(137, 5, pts) },
    ]
  },
  {
    id: 'cheapest-cross-chain-bridge',
    number: '003',
    numberColor: '#FF5C00',
    category: 'BRIDGES',
    title: 'Cheapest cross-chain bridge',
    description: 'Total cost as a percent of notional. Fees, slippage and destination gas combined, sampled at $300.',
    value: '0.033',
    unit: '%',
    live: true,
    providers: 4,
    samples: '109,440',
    updatedAt: 'May 6, 2026, 9:17 AM UTC',
    lines: [
       { id: 'Debridge', name: 'Debridge', color: '#CCCCCC', data: genNoise(0.2, 0.005, pts) },
       { id: 'LiFi', name: 'LiFi', color: '#888888', data: genNoise(0.15, 0.005, pts) },
       { id: 'Relay', name: 'Relay', color: '#111111', data: genNoise(0.1, 0.005, pts) },
       { id: 'Mobula', name: 'Mobula', color: '#FF5C00', data: genNoise(0.033, 0.002, pts) },
    ]
  },
  {
    id: 'best-token-onchain-metadata',
    number: '004',
    numberColor: '#FF5C00',
    category: 'AGGREGATORS',
    title: 'Best provider for token on-chain metadata',
    description: 'Share of metadata fields populated for fresh-launch tokens (logo, description, twitter, website). Higher is better.',
    value: '57.0',
    unit: '%',
    live: true,
    providers: 3,
    samples: '277,593',
    updatedAt: 'May 6, 2026, 9:17 AM UTC',
    lines: [
       { id: 'Jupiter', name: 'Jupiter', color: '#111111', data: [...genNoise(40, 2, pts/2), ...genNoise(60, 3, pts/2)] },
       { id: 'Codex', name: 'Codex', color: '#cccccc', data: [...genNoise(10, 1, pts/4), ...genNoise(50, 2, pts*3/4)] },
       { id: 'Mobula', name: 'Mobula', color: '#FF5C00', data: genNoise(57, 1.5, pts) },
    ]
  },
  {
    id: 'onchain-data-providers',
    number: '005',
    numberColor: '#FF5C00',
    category: 'DATA',
    title: 'On-chain data providers',
    description: 'Number of blockchains each major on-chain data provider officially supports. Higher is better.',
    value: '263',
    unit: '',
    live: true,
    providers: 3,
    samples: '474',
    updatedAt: 'May 6, 2026, 9:17 AM UTC',
    lines: [
       { id: 'GeckoTerminal', name: 'GeckoTerminal', color: '#CCCCCC', data: Array(pts).fill(120) },
       { id: 'Codex', name: 'Codex', color: '#111111', data: Array(pts).fill(80) },
       { id: 'Mobula', name: 'Mobula', color: '#FF5C00', data: Array(pts).fill(263) },
    ]
  },
  {
    id: 'lowest-rpc-latency',
    number: '006',
    numberColor: '#FF5C00',
    category: 'RPC',
    title: 'Lowest RPC node latency',
    description: 'Average time to resolve standard eth_call methods globally, measured in milliseconds.',
    value: '84',
    unit: 'ms',
    live: true,
    providers: 4,
    samples: '450,210',
    updatedAt: 'May 6, 2026, 9:17 AM UTC',
    lines: [
       { id: 'Alchemy', name: 'Alchemy', color: '#CCCCCC', data: genNoise(150, 10, pts) },
       { id: 'Infura', name: 'Infura', color: '#888888', data: genNoise(180, 15, pts) },
       { id: 'QuickNode', name: 'QuickNode', color: '#111111', data: genNoise(100, 8, pts) },
       { id: 'Mobula', name: 'Mobula', color: '#FF5C00', data: genNoise(84, 5, pts) },
    ]
  },
  {
    id: 'highest-rpc-uptime',
    number: '007',
    numberColor: '#FF5C00',
    category: 'RPC',
    title: 'Highest RPC Node Uptime',
    description: 'Percentage of time endpoints remain responsive within SLA thresholds across a 30-day window.',
    value: '99.99',
    unit: '%',
    live: true,
    providers: 3,
    samples: 'Ongoing',
    updatedAt: 'May 6, 2026, 9:17 AM UTC',
    lines: [
       { id: 'ProviderA', name: 'Provider A', color: '#CCCCCC', data: genNoise(98.5, 0.5, pts) },
       { id: 'ProviderB', name: 'Provider B', color: '#111111', data: genNoise(99.5, 0.2, pts) },
       { id: 'Mobula', name: 'Mobula', color: '#FF5C00', data: genNoise(99.99, 0.01, pts) },
    ]
  },
  {
    id: 'fastest-dex-aggregator',
    number: '008',
    numberColor: '#FF5C00',
    category: 'AGGREGATORS',
    title: 'Fastest DEX Aggregator',
    description: 'Time taken to compute the most optimal route across multiple liquidity pools on EVM chains.',
    value: '42',
    unit: 'ms',
    live: true,
    providers: 4,
    samples: '30,050',
    updatedAt: 'May 6, 2026, 9:17 AM UTC',
    lines: [
       { id: '1inch', name: '1inch', color: '#CCCCCC', data: genNoise(120, 10, pts) },
       { id: 'Matcha', name: 'Matcha', color: '#888888', data: genNoise(100, 10, pts) },
       { id: 'Paraswap', name: 'Paraswap', color: '#111111', data: genNoise(85, 8, pts) },
       { id: 'Mobula', name: 'Mobula', color: '#FF5C00', data: genNoise(42, 3, pts) },
    ]
  },
  {
    id: 'deepest-historical-data',
    number: '009',
    numberColor: '#FF5C00',
    category: 'DATA',
    title: 'Deepest Historical Data Access',
    description: 'Average number of blocks indexed since genesis across all supported networks. Higher is better.',
    value: '99',
    unit: '%',
    live: true,
    providers: 3,
    samples: '10,230',
    updatedAt: 'May 6, 2026, 9:17 AM UTC',
    lines: [
       { id: 'GeckoTerminal', name: 'GeckoTerminal', color: '#CCCCCC', data: genNoise(60, 5, pts) },
       { id: 'Codex', name: 'Codex', color: '#111111', data: genNoise(80, 2, pts) },
       { id: 'Mobula', name: 'Mobula', color: '#FF5C00', data: genNoise(99, 1, pts) },
    ]
  },
  {
    id: 'most-accurate-price-feed',
    number: '010',
    numberColor: '#FF5C00',
    category: 'ORACLES',
    title: 'Most Accurate Price Feed',
    description: 'Minimal deviation from VWAP (Volume Weighted Average Price) across top 100 assets.',
    value: '0.01',
    unit: '%',
    live: true,
    providers: 4,
    samples: '5,000,000+',
    updatedAt: 'May 6, 2026, 9:17 AM UTC',
    lines: [
       { id: 'Chainlink', name: 'Chainlink', color: '#CCCCCC', data: genNoise(0.08, 0.01, pts) },
       { id: 'Pyth', name: 'Pyth', color: '#888888', data: genNoise(0.05, 0.01, pts) },
       { id: 'RedStone', name: 'RedStone', color: '#111111', data: genNoise(0.03, 0.01, pts) },
       { id: 'Mobula', name: 'Mobula', color: '#FF5C00', data: genNoise(0.01, 0.002, pts) },
    ]
  },
  {
    id: 'wallet-labels-coverage',
    number: '011',
    numberColor: '#FF5C00',
    category: 'DATA',
    title: 'Wallet Labels Coverage',
    description: 'Percentage of known operational addresses correctly mapped to an entity name.',
    value: '32.9',
    unit: '%',
    live: true,
    providers: 9,
    samples: '10,093',
    updatedAt: 'May 6, 2026, 9:17 AM UTC',
  }
];

export const PROVIDERS_LIST = [
  { id: 'mobula', name: 'Mobula', category: 'INTENT', tags: ['Aggregators', 'Bridges'], benches: 6, firstPlaces: 3, logoBg: '#ffffff', logoFg: '#111' },
  { id: 'codex', name: 'Codex', category: '', tags: ['Aggregators'], benches: 3, firstPlaces: 1, logoBg: '#CCFF00', logoFg: '#111' },
  { id: 'geckoterminal', name: 'GeckoTerminal', category: '', tags: ['Aggregators'], benches: 2, firstPlaces: 1, logoBg: '#4736f8', logoFg: '#fff' },
  { id: 'lighter', name: 'Lighter', category: '', tags: ['Trading'], benches: 1, firstPlaces: 1, logoBg: '#111', logoFg: '#fff' },
  { id: 'ton', name: 'TON', category: '', tags: ['Blockchains'], benches: 1, firstPlaces: 1, logoBg: '#0098EA', logoFg: '#fff' },
  { id: 'tonapi', name: 'TonAPI', category: '', tags: ['Aggregators'], benches: 1, firstPlaces: 1, logoBg: '#333333', logoFg: '#fff' },
  { id: 'debridge', name: 'Debridge', category: 'PROTOCOL', tags: ['Bridges'], benches: 2, firstPlaces: 0, logoBg: '#ffffff', logoFg: '#FFCC00' },
  { id: 'lifi', name: 'LiFi', category: 'AGGREGATOR', tags: ['Bridges'], benches: 2, firstPlaces: 0, logoBg: '#ffdaf1', logoFg: '#FF3399' },
  { id: 'relay', name: 'Relay', category: 'RELAY', tags: ['Bridges'], benches: 2, firstPlaces: 0, logoBg: '#111', logoFg: '#fff' },
];
