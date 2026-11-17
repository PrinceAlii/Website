import Image from "next/image";

import type { LogoKind } from "@/data/experiences";

// Grayscale image logos. Every logo sets brightness explicitly, so the hover filter has the same
// functions as the resting filter and the color change animates both ways. On hover the logo shows
// its full color. Only filters change, so the box and its background stay the same.
const imageLogos = {
	commbank: { height: 32, className: "h-7 w-7 brightness-90 dark:brightness-100" },
	"service-nsw": { height: 32, className: "h-7 w-7 brightness-100" },
	mcdonalds: { height: 28, className: "h-7 w-auto brightness-75 dark:brightness-100" },
} as const;

export function CompanyLogo({ kind }: { kind: LogoKind }) {
	if (kind === "abs") {
		// The artwork has a transparent background. Used as a mask, its fill is the color of the mark.
		// Resting it is gray, and on hover it turns to a navy (light) or light blue (dark). The fill
		// changes, the box does not.
		const mask = "url(/logos/abs.svg) center / contain no-repeat";
		return (
			<span
				aria-hidden="true"
				className="block h-8 w-9 bg-gray-500 transition-colors duration-300 hover:bg-blue-900 dark:bg-gray-400 dark:hover:bg-blue-300"
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
