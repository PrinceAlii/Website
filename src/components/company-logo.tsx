import Image from "next/image";

import type { LogoKind } from "@/data/experiences";

type CompanyLogoProps = {
	kind: LogoKind;
};

export function CompanyLogo({ kind }: CompanyLogoProps) {
	if (kind === "abs") {
		return (
			// The artwork has a transparent background. Used as a mask, it takes the text color of the
			// current theme, so it stays readable on both the white and the black page.
			<span
				aria-hidden="true"
				className="block h-8 w-9 bg-gray-900 transition-colors duration-300 dark:bg-gray-100"
				style={{
					maskImage: "url(/logos/abs.svg)",
					WebkitMaskImage: "url(/logos/abs.svg)",
					maskRepeat: "no-repeat",
					WebkitMaskRepeat: "no-repeat",
					maskPosition: "center",
					WebkitMaskPosition: "center",
					maskSize: "contain",
					WebkitMaskSize: "contain",
				}}
			/>
		);
	}

	if (kind === "commbank") {
		return (
			<Image
				src="/logos/commbank.svg"
				alt=""
				width={32}
				height={32}
				className="h-7 w-7 object-contain brightness-90 grayscale dark:brightness-100"
			/>
		);
	}

	if (kind === "service-nsw") {
		return (
			<Image
				src="/logos/service-nsw.svg"
				alt=""
				width={32}
				height={32}
				className="h-7 w-7 object-contain grayscale"
			/>
		);
	}

	return (
		<Image
			src="/logos/mcdonalds.svg"
			alt=""
			width={32}
			height={28}
			className="h-7 w-auto object-contain brightness-75 grayscale dark:brightness-100"
		/>
	);
}
