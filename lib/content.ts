// Long-form copy per tool. TODO: write the remaining 14 entries (800–1200 words each) before launch.
export type Section = { h: string; p: string[] };
export const content: Record<string, Section[]> = {
"youtube-money-calculator": [
{ h: "What the YouTube Money Calculator does", p: ["This calculator turns a view count and an RPM (revenue per 1,000 views) into a monthly and yearly earnings estimate. It is built for creators in the US, UK and elsewhere who want a realistic planning figure before they rely on ad income.", "RPM is what you actually keep after YouTube takes its share, which makes it more useful than CPM for forecasting."] },
{ h: "Benefits", p: ["You can test low, typical and optimistic scenarios in seconds, compare niches, and set targets such as how many views you need to cover a monthly expense. Nothing is stored or sent anywhere."] },
{ h: "How to use it", p: ["Enter your average monthly views, then an RPM. Find your real RPM in YouTube Studio under Analytics > Revenue. If you have no data yet, try a range such as $1, $3 and $6 to see how results change."] },
{ h: "Example", p: ["A channel with 200,000 monthly views and a $3 RPM earns about $600 per month, or $7,200 per year before tax. At $1.50 RPM the same channel earns about $300 per month."] },
{ h: "Common mistakes", p: ["Using CPM instead of RPM overstates income. Ignoring seasonality matters too: Q4 ad rates are usually higher than January. Finally, remember that ad revenue is not your only income and is taxable, so set money aside for HMRC or the IRS."] },
{ h: "About these estimates", p: ["Results are illustrations, not promises. Actual earnings depend on audience location, video length, advertiser demand and eligibility for the YouTube Partner Programme."] },
]};
