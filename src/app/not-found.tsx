import type { Metadata } from "next";
import Link from "next/link";

// Next adds its own noindex tag here. Setting robots explicitly replaces the layout's
// "index, follow" so the 404 page does not carry two conflicting robots tags.
export const metadata: Metadata = {
	robots: { index: false, follow: false },
};

export default function NotFound() {
	return (
		<main className="mx-auto min-h-screen max-w-2xl px-6 py-24 sm:px-8">
			<h1 className="mb-4 text-base/6 font-medium text-gray-900 dark:text-gray-100">
				That page doesn't exist.
			</h1>
			<Link
				href="/"
				className="text-sm font-semibold text-gray-600 transition-colors duration-300 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
			>
				Back to home
			</Link>
		</main>
	);
}
