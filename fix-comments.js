const fs = require('fs');

function fixFile(file, replacements) {
    let content = fs.readFileSync(file, 'utf8');
    for (const [search, replace] of replacements) {
        content = content.replace(search, replace);
    }
    fs.writeFileSync(file, content);
}

// live-ecosystem.tsx
fixFile('components/live-ecosystem.tsx', [
    ['// eslint-disable-next-line react-hooks/set-state-in-effect', '/* eslint-disable-next-line react-hooks/set-state-in-effect */'],
    ['// Update tags occasionally', '/* Update tags occasionally */'],
    ['// Also push to sidebar feed', '/* Also push to sidebar feed */'],
    ["// the UI handles color, but let's just make it look right", "/* the UI handles color, but let's just make it look right */"],
    ['// Chart sequence update - smooth constant noise evolution', '/* Chart sequence update - smooth constant noise evolution */'],
    ['// Ensure monotonically increasing', '/* Ensure monotonically increasing */'],
    ['// Apply slight upward drift if noise dips to keep it looking organic but growing', '/* Apply slight upward drift if noise dips to keep it looking organic but growing */'],
    ['// Header', '/* Header */'],
    ['// Top Stats', '/* Top Stats */'],
    ['// Main Chart Panel', '/* Main Chart Panel */'],
    ['// Panel Header', '/* Panel Header */'],
    ['// Tooltip Content', '/* Tooltip Content */'],
    ['// Panel Body', '/* Panel Body */'],
    ['// Chart Area', '/* Chart Area */'],
    ['// Chart Legend', '/* Chart Legend */'],
    ['// Fake Chart Lines Area', '/* Fake Chart Lines Area */'],
    ['// Grid', '/* Grid */'],
    ['// X Axis', '/* X Axis */'],
    ['// Chart Mock - Lines SVG', '/* Chart Mock - Lines SVG */'],
    ['// Area Fills', '/* Area Fills */'],
    ['// Ethereum', '/* Ethereum */'],
    ['// Solana', '/* Solana */'],
    ['// Base', '/* Base */'],
    ['// BNB', '/* BNB */'],
    ['// Arbitrum', '/* Arbitrum */'],
    ['// Dynamic Live Floating Tags pinned to lines', '/* Dynamic Live Floating Tags pinned to lines */'],
    ['// Live Feed Sidebar', '/* Live Feed Sidebar */'],
]);

// network-metrics.tsx
fixFile('components/network-metrics.tsx', [
    ['// eslint-disable-next-line react-hooks/set-state-in-effect', '/* eslint-disable-next-line react-hooks/set-state-in-effect */'],
    ['// Fluctuate TPS by ±5%', '/* Fluctuate TPS by ±5% */'],
    ['// Fluctuate Gas by ±10%', '/* Fluctuate Gas by ±10% */'],
    ['// Network Health', '/* Network Health */'],
    ['// Fake mini bars for TPS', '/* Fake mini bars for TPS */'],
    ['// Protocol Dominance', '/* Protocol Dominance */'],
]);

// app/providers/[id]/page.tsx
fixFile('app/providers/[id]/page.tsx', [
    ['// Generate fake records based on the provider to match the screenshot', '/* Generate fake records based on the provider to match the screenshot */'],
    ['// Fake placement stuff', '/* Fake placement stuff */'],
    ['// Short description', '/* Short description */'],
    ['// Header Section', '/* Header Section */'],
    ['// Info row', '/* Info row */'],
    ['// Benchmark Record Section', '/* Benchmark Record Section */'],
    ['// Embeddable Badges', '/* Embeddable Badges */'],
    ['// Fake Badge', '/* Fake Badge */'],
]);
