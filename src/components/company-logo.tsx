import Image from "next/image";

import type { LogoKind } from "@/data/experiences";

// Grayscale image logos. Brightness is tuned per mark so each reads at a similar weight. On hover
// the logo shows its full color. Only filters change, so the box and its background stay the same.
const imageLogos = {
	commbank: { height: 32, className: "h-7 w-7 brightness-90 dark:brightness-100" },
	"service-nsw": { height: 32, className: "h-7 w-7" },
	mcdonalds: { height: 28, className: "h-7 w-auto brightness-75 dark:brightness-100" },
} as const;

export function CompanyLogo({ kind }: { kind: LogoKind }) {
	if (kind === "abs") {
		// The artwork has a transparent background. Used as a mask, it takes the text color of the
		// current theme, so it stays readable on both the white and the black page. The mark has one
		// color only, so it has no full-color hover state.
		const mask = "url(/logos/abs.svg) center / contain no-repeat";
		return (
			<span
				aria-hidden="true"
				className="block h-8 w-9 bg-gray-900 transition-colors duration-300 dark:bg-gray-100"
				style={{ mask, WebkitMask: mask }}
			/>
		);
	}

	const { height, className } = imageLogos[kind];
	return (
		<Image
			src={`/logos/${kind}.svg`}
			alt=""
			width={32}
			height={height}
			className={`${className} object-contain grayscale transition duration-300 hover:grayscale-0 hover:brightness-100`}
		/>
	);
}
