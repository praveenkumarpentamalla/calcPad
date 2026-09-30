import type { Metadata } from "next"; import StaticPage from "@/components/StaticPage";
export const metadata: Metadata = { title: "Disclaimer", alternates: { canonical: "/disclaimer" } };
export default function Page() { return <StaticPage title="Disclaimer" paras={["Results are estimates for information only and are not financial, tax or legal advice. Earnings estimates for YouTube and TikTok are not guarantees of income. Speak to a qualified adviser before making financial decisions."]} />; }
