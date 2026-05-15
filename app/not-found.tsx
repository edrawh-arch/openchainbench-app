import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
      
      <h2 className="text-3xl font-semibold tracking-tight text-[#111] mb-2 font-sans dark:text-white">
        
        404 - Not Found
      </h2>
      <p className="text-[#666] font-sans mb-8 dark:text-[#A1A1AA]">
        
        The benchmark or page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="flex border border-[#E5E5E5] bg-white hover:bg-[#F9F9F9] text-[#111] w-fit rounded-sm shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-colors px-4 py-2 font-mono text-[11px] uppercase tracking-widest items-center gap-2 dark:border-[#222222] dark:bg-[#0A0A0A] dark:hover:bg-[#111111] dark:text-white"
      >
        
        <ArrowLeft className="w-3.5 h-3.5" /> Return Home
      </Link>
    </div>
  );
}
