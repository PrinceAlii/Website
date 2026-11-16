import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";

import { profile } from "@/data/profile";

import "./globals.css";

const geistSans = localFont({
	src: "../fonts/Geist-Variable.woff2",
	variable: "--font-geist-sans",
	weight: "100 900",
	display: "swap",
	fallback: ["Arial", "sans-serif"],
});

const geistPixel = localFont({
	src: "../fonts/GeistPixel-Square.woff2",
	variable: "--font-geist-pixel-square",
	weight: "500",
	display: "swap",
	fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = {
	metadataBase: new URL(profile.siteUrl),
	title: profile.name,
	description: profile.description,
	authors: [{ name: profile.name, url: profile.siteUrl }],
	creator: profile.name,
	publisher: profile.name,
	keywords: [
		profile.name,
		"DevOps Engineer",
		profile.company,
		"Cloud Engineer",
		"Platform Engineer",
		"Sydney",
	],
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	alternates: {
		canonical: "/",
		types: { "text/markdown": "/index.md" },
	},
	openGraph: {
		title: profile.name,
		description: profile.description,
		url: profile.siteUrl,
		siteName: profile.name,
		locale: "en_AU",
		type: "website",
		images: [{ url: "/og.png", width: 1200, height: 630, alt: profile.name }],
	},
	twitter: {
		card: "summary_large_image",
		title: profile.name,
		description: profile.description,
		images: ["/og.png"],
	},
	icons: {
		icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
	},
};

// Built from profile data so the structured data cannot drift from the page. Only https links are
// listed, which leaves out the mailto Contact link.
const personJsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: profile.name,
	url: profile.siteUrl,
	jobTitle: profile.role,
	worksFor: { "@type": "Organization", name: profile.company },
	sameAs: profile.links.filter((link) => link.href.startsWith("https://")).map((link) => link.href),
};

export const viewport: Viewport = {
	colorScheme: "light dark",
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#000000" },
	],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistPixel.variable}`}
			suppressHydrationWarning
		>
			<body className="antialiased">
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be raw JSON; `<` is escaped so it cannot close the script tag
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
					}}
				/>
				<ThemeProvider attribute="class" storageKey="theme">
					<main className="mx-auto min-h-screen max-w-2xl px-6 py-24 sm:px-8">{children}</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
