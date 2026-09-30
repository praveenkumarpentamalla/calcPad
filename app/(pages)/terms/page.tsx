import type { Metadata } from "next"; import StaticPage from "@/components/StaticPage";
export const metadata: Metadata = { title: "Terms and Conditions", alternates: { canonical: "/terms" } };
export default function Page() { return <StaticPage title="Terms and Conditions" paras={["By using this site you agree to use the tools lawfully and at your own risk.","We provide the tools as-is without warranty and may change or remove them at any time."]} />; }
