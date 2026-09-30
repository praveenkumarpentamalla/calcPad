import type { Metadata } from "next"; import { Inter } from "next/font/google"; import "./globals.css";
import Header from "@/components/Header"; import Footer from "@/components/Footer"; import { SITE } from "@/lib/site";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
export const metadata: Metadata = { metadataBase: new URL(SITE.url), title: { default: SITE.name, template: `%s | ${SITE.name}` }, description: "Free calculators and generators for creators and personal finance, for US and UK users.",
  openGraph: { siteName: SITE.name, type: "website", locale: "en_US" }, alternates: { canonical: "/" } };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" className={inter.variable}><body className="font-sans"><Header /><main>{children}</main><Footer /></body></html>);
}
