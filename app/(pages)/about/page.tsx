import type { Metadata } from "next"; import StaticPage from "@/components/StaticPage";
export const metadata: Metadata = { title: "About", alternates: { canonical: "/about" } };
export default function Page() { return <StaticPage title="About" paras={["We build free, fast calculators for creators and people managing their money in the US and UK.","Every tool runs in your browser, so your numbers stay private. Our tools give estimates and are reviewed when tax rules or platform payouts change."]} />; }
