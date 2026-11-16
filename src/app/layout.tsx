import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { ThemeProvider } from "@/components/theme-provider";
import { profile } from "@/data/profile";

import "./globals.css";

const geistSans = localFont({
	src: "../fonts/Geist-Variable.woff2",
	variable: "--font-geist-sans",
	weight: "100 900",
	display: "swap",
	fallback: ["Arial", "sans-serif"],
});

const geistMono = localFont({
	src: "../fonts/GeistMono-Variable.woff2",
	variable: "--font-geist-mono",
	weight: "100 900",
	display: "swap",
	fallback: ["ui-monospace", "monospace"],
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
	title: "Ali Bonagdaran",
	description: profile.description,
	authors: [{ name: profile.name, url: profile.siteUrl }],
	creator: profile.name,
	publisher: profile.name,
	keywords: [
		"Ali Bonagdaran",
		"DevOps Engineer",
		"Australian Bureau of Statistics",
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
	},
	openGraph: {
		title: "Ali Bonagdaran",
		description: profile.description,
		url: profile.siteUrl,
		siteName: "Ali Bonagdaran",
		locale: "en_AU",
		type: "website",
		images: [
			{
				url: "/og.png",
				width: 1200,
				height: 630,
				alt: "Ali Bonagdaran",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Ali Bonagdaran",
		description: profile.description,
		images: ["/og.png"],
	},
	icons: {
		icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
	},
};

// Built from profile data so the structured data cannot drift from the page. Only absolute links
// are listed; the resume path is not a profile on another site.
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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} ${geistPixel.variable}`}
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
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	);
}
