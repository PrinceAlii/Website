import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";

import { mutedLink } from "@/components/link-style";
import { ThemeToggle } from "@/components/theme-toggle";

// Source Serif 4 Semibold, subset to "0" and "4" (1.4 KB). A free stand-in for Larish Neue. Renamed
// because subsetting counts as a modification under the font's Reserved Font Name.
const serif404 = localFont({
	src: "../fonts/Serif404-Semibold.woff2",
	weight: "600",
	// Not preloaded, or every page would fetch it. "block" hides the fallback serif while it loads.
	preload: false,
	display: "block",
	fallback: ["Georgia", "serif"],
});

// Next adds its own noindex tag here. Setting robots explicitly replaces the layout's
// "index, follow" so the 404 page does not carry two conflicting robots tags.
export const metadata: Metadata = {
	robots: { index: false, follow: false },
};

export default function NotFound() {
	return (
		<>
			<header className="mb-16 flex h-12 items-center justify-end">
				<ThemeToggle />
			</header>
			<h1
				className={`${serif404.className} text-[clamp(8rem,42vw,12rem)] leading-none tracking-tight text-gray-900 dark:text-gray-100`}
			>
				404
			</h1>
			<p className="mt-6 mb-4 text-gray-600 dark:text-gray-400">
				I’m sorry, that page is in another castle!
			</p>
			<Link href="/" className={`text-sm font-semibold ${mutedLink}`}>
				Back home
			</Link>
		</>
	);
}
