import type { Metadata } from "next";
import Link from "next/link";

import { mutedLink } from "@/components/link-style";

// Next adds its own noindex tag here. Setting robots explicitly replaces the layout's
// "index, follow" so the 404 page does not carry two conflicting robots tags.
export const metadata: Metadata = {
	robots: { index: false, follow: false },
};

export default function NotFound() {
	return (
		<>
			<h1 className="font-serif text-8xl leading-none tracking-tight text-gray-900 sm:text-9xl dark:text-gray-100">
				404
			</h1>
			<p className="mt-6 mb-4 text-gray-600 dark:text-gray-400">
				Sorry, the page you’re looking for is in another castle.
			</p>
			<Link href="/" className={`text-sm font-semibold ${mutedLink}`}>
				Back to home
			</Link>
		</>
	);
}
