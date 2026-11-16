import Image from "next/image";

import type { LogoKind } from "@/data/experiences";

type CompanyLogoProps = {
	kind: LogoKind;
};

export function CompanyLogo({ kind }: CompanyLogoProps) {
	if (kind === "abs") {
		return (
			<span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900">
				<Image src="/logos/abs.svg" alt="" width={26} height={23} className="h-[23px] w-[26px]" />
			</span>
		);
	}

	if (kind === "commbank") {
		return (
			<Image
				src="/logos/commbank.svg"
				alt=""
				width={32}
				height={32}
				className="h-7 w-7 object-contain grayscale"
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
			className="h-7 w-auto object-contain grayscale"
		/>
	);
}
