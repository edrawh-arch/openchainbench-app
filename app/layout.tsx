import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
export const metadata: Metadata = {
  title: "OpenChainBench",
  description: "Open, reproducible benchmarks for crypto infrastructure.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body
        className="bg-white bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] dark:bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:16px_16px] text-black transition-colors duration-200 dark:bg-[#000000]"
        suppressHydrationWarning
      >
        
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          
          <Header /> {children} <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
