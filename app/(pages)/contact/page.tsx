import type { Metadata } from "next"; import StaticPage from "@/components/StaticPage";
export const metadata: Metadata = { title: "Contact", alternates: { canonical: "/contact" } };
export default function Page() { return <StaticPage title="Contact" paras={["Questions, corrections or tool requests? Email praveenkumarpentamalla@.com and we will reply within a few working days."]} />; }
