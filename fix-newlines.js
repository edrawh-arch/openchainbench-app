const fs = require('fs');

function restoreNewlines() {
    let files = {
        'app/providers/[id]/page.tsx': [
            { from: '// Generate fake records based on the provider to match the screenshot const records', to: '// Generate fake records based on the provider to match the screenshot\nconst records' },
            { from: '// Fake placement stuff const place', to: '// Fake placement stuff\nconst place' },
            { from: '// Short description value:', to: '// Short description\nvalue:' },
            { from: '// Header Section <div', to: '// Header Section\n<div' },
            { from: '// Info row <div', to: '// Info row\n<div' },
            { from: '// Benchmark Record Section <div', to: '// Benchmark Record Section\n<div' },
            { from: '// Embeddable Badges <div', to: '// Embeddable Badges\n<div' },
            { from: '// Fake Badge <div', to: '// Fake Badge\n<div' },
            { from: `<img src="https://onchainbench.com/api/badge/\${provider.id}/\${(records[0]?.title || "best-provider").toLowerCase().replace(/\\s+/g, "-")}.svg" alt="OnchainBench Badge" /> [error] > 5 | </a>\`} </pre>`, to: `<img src="https://onchainbench.com/api/badge/\${provider.id}/\${(records[0]?.title || "best-provider").toLowerCase().replace(/\\s+/g, "-")}.svg" alt="OnchainBench Badge" />\n</a>\`} </pre>` } // fixing the error log artifact if any
        ],
        'components/header.tsx': [
            { from: '// eslint-disable-next-line react-hooks/set-state-in-effect setIsMobileMenuOpen', to: '// eslint-disable-next-line react-hooks/set-state-in-effect\nsetIsMobileMenuOpen' },
            { from: '// Mobile menu dropdown {isMobileMenuOpen', to: '// Mobile menu dropdown\n{isMobileMenuOpen'}
        ],
        'components/live-ecosystem.tsx': [
             { from: '// eslint-disable-next-line react-hooks/set-state-in-effect setMounted', to: '// eslint-disable-next-line react-hooks/set-state-in-effect\nsetMounted'},
             { from: '// Update tags occasionally if', to: '// Update tags occasionally\nif' },
             { from: '// Also push to sidebar feed setFeedItems', to: '// Also push to sidebar feed\nsetFeedItems' },
             { from: '// the UI handles color, but let\'s just make it look right const newItem', to: '// the UI handles color, but let\'s just make it look right\nconst newItem' },
             { from: '// Chart sequence update - smooth constant noise evolution setNoiseData', to: '// Chart sequence update - smooth constant noise evolution\nsetNoiseData' },
             { from: '// Header <div', to: '// Header\n<div' },
             { from: '// Top Stats <div', to: '// Top Stats\n<div' },
             { from: '// Main Chart Panel <div', to: '// Main Chart Panel\n<div' },
             { from: '// Panel Header <div', to: '// Panel Header\n<div' },
             { from: '// Tooltip Content <div', to: '// Tooltip Content\n<div' },
             { from: '// Panel Body <div', to: '// Panel Body\n<div' },
             { from: '// Chart Area <div', to: '// Chart Area\n<div' },
             { from: '// Chart Legend <div', to: '// Chart Legend\n<div' },
             { from: '// Fake Chart Lines Area <div', to: '// Fake Chart Lines Area\n<div' },
             { from: '// Grid <div', to: '// Grid\n<div' },
             { from: '// X Axis <div', to: '// X Axis\n<div' },
             { from: '// Chart Mock - Lines SVG <svg', to: '// Chart Mock - Lines SVG\n<svg' },
             { from: '// Area Fills <path', to: '// Area Fills\n<path' },
             { from: '// Ethereum {isChainActive', to: '// Ethereum\n{isChainActive' },
             { from: '// Solana {isChainActive', to: '// Solana\n{isChainActive' },
             { from: '// Base {isChainActive', to: '// Base\n{isChainActive' },
             { from: '// BNB {isChainActive', to: '// BNB\n{isChainActive' },
             { from: '// Arbitrum {isChainActive', to: '// Arbitrum\n{isChainActive' },
             { from: '// Dynamic Live Floating Tags pinned to lines <div', to: '// Dynamic Live Floating Tags pinned to lines\n<div' },
             { from: '// Live Feed Sidebar {showFeed', to: '// Live Feed Sidebar\n{showFeed' },
        ],
        'components/network-metrics.tsx': [
            { from: '// eslint-disable-next-line react-hooks/set-state-in-effect setTps', to: '// eslint-disable-next-line react-hooks/set-state-in-effect\nsetTps' },
            { from: '// Fluctuate TPS by ±5% setTps', to: '// Fluctuate TPS by ±5%\nsetTps' },
            { from: '// Fluctuate Gas by ±10% if', to: '// Fluctuate Gas by ±10%\nif' },
            { from: '// Network Health <div', to: '// Network Health\n<div' },
            { from: '// Fake mini bars for TPS {', to: '// Fake mini bars for TPS\n{' },
            { from: '// Protocol Dominance <div', to: '// Protocol Dominance\n<div' },
        ]
    };

    for (const [file, replacements] of Object.entries(files)) {
        if (!fs.existsSync(file)) continue;
        let content = fs.readFileSync(file, 'utf8');
        for (const { from, to } of replacements) {
            content = content.replace(from, to);
        }
        // Additional generic fix for [error] text that I accidentally copied above? No I didn't actually paste that into the file, the error log just showed it formatting with the source code.
        fs.writeFileSync(file, content);
    }
}
restoreNewlines();
