"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Menu } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Benchmarks', href: '/benchmarks' },
    { name: 'Providers', href: '/providers' },
    { name: 'Networks', href: '/networks' },
    { name: 'Methodology', href: '/methodology' },
    { name: 'Contribute', href: '/contribute' },
  ];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="sticky top-0 z-50 flex flex-col font-sans">
      {isBannerVisible && (
        <div className="bg-[#F0F4F8] py-2.5 px-4 relative flex items-center justify-center text-[11px] sm:text-[13px] text-[#334155] text-center pr-10">
          <span>
            The first decentralized benchmark network for crypto infrastructure is live. <br className="sm:hidden" /><Link href="/benchmarks" className="text-[#0284C7] hover:underline underline-offset-2">Read the announcement.</Link>
          </span>
          <button 
            onClick={() => setIsBannerVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A] transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      )}
      <header className="border-b border-[#F0F0F0] py-4 md:py-5 px-6 shrink-0 text-sm bg-white relative">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <svg width="22" height="22" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:opacity-80 transition-opacity">
              <mask id="c-mask-header">
                <rect width="100" height="100" fill="white" />
                <ellipse cx="45" cy="50" rx="22" ry="40" fill="black" />
                <rect x="45" y="38" width="55" height="24" fill="black" />
              </mask>
              <circle cx="45" cy="50" r="45" fill="black" mask="url(#c-mask-header)" />
              <path d="M 65 0 L 100 0 L 100 35 Z" fill="#A0A0A0" />
              <path d="M 65 100 L 100 100 L 100 65 Z" fill="#A0A0A0" />
            </svg>
            <span className="font-bold tracking-tight text-[17px]">OpenChainBench</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-[#888] font-medium">
            {navLinks.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname?.startsWith(link.href);
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`hover:text-black transition-colors ${isActive ? 'text-black' : ''}`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="w-[1px] h-4 bg-[#E5E5E5] mx-[-12px]"></div>
            <Link href="#" className="hover:text-black transition-colors flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.18-.35 6.5-1.59 6.5-7.18 0-1.54-.5-2.8-1.4-3.8.14-.35.6-1.8-.14-3.74 0 0-1.18-.38-3.9 1.46A13.8 13.8 0 0 0 12 3c-1.3 0-2.6.14-3.9.4-2.7-1.85-3.9-1.46-3.9-1.46-.74 1.94-.28 3.39-.14 3.74-.9.1-1.4.26-1.4 1.8 0 5.58 3.32 6.83 6.5 7.18A4.8 4.8 0 0 0 4 18v4"></path></svg>
              GitHub
            </Link>
          </nav>

          <button 
            className="md:hidden text-[#111] hover:text-[#FF5C00] transition-colors p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-[#F0F0F0] shadow-lg md:hidden flex flex-col py-2 px-6">
            {navLinks.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname?.startsWith(link.href);
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`py-3 border-b border-[#F5F5F5] last:border-none font-medium hover:text-[#FF5C00] transition-colors ${isActive ? 'text-[#111]' : 'text-[#888]'}`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link href="#" className="py-3 font-medium text-[#888] hover:text-[#111] transition-colors flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.18-.35 6.5-1.59 6.5-7.18 0-1.54-.5-2.8-1.4-3.8.14-.35.6-1.8-.14-3.74 0 0-1.18-.38-3.9 1.46A13.8 13.8 0 0 0 12 3c-1.3 0-2.6.14-3.9.4-2.7-1.85-3.9-1.46-3.9-1.46-.74 1.94-.28 3.39-.14 3.74-.9.1-1.4.26-1.4 1.8 0 5.58 3.32 6.83 6.5 7.18A4.8 4.8 0 0 0 4 18v4"></path></svg>
              GitHub
            </Link>
          </div>
        )}
      </header>
    </div>
  );
}
