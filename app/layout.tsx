import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
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
    <html lang="en">
      {" "}
      <body className="bg-white bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] [background-size:16px_16px] text-black transition-colors duration-200">
        {" "}
        <Header /> {children} <Footer />{" "}
      </body>{" "}
    </html>
  );
}
