import { CompanyLogo } from "@/components/company-logo";
import { type Experience, formatPeriod } from "@/data/experiences";

// An employer with one position keeps the date centered against both lines. From sm up the date is
// its own column, and below sm it sits on the company line. An employer with several positions shows
// the company once, then a timeline with one dot per position.
export function ExperienceItem({ experience }: { experience: Experience }) {
	const companyName = (
		<>
			<span className="sm:hidden">{experience.shortCompany ?? experience.company}</span>
			<span className="hidden sm:inline">{experience.company}</span>
		</>
	);

	if (experience.positions.length > 1) {
		// Geometry in px. The header is 44px, and the logo (36px artwork) and the company line (24px)
		// share its center at y = 22. Dots sit on the logo's center at x = 24. Each position is 40px
		// (role 20 + date 20) with 16px between positions, so a dot's center sits 20px below its top, the middle of the block.
		const last = experience.positions.length - 1;
		return (
			<li>
				<div className="flex h-11 items-center gap-4">
					<div className="flex h-11 w-12 shrink-0 items-center justify-center">
						<CompanyLogo kind={experience.logo} />
					</div>
					<h3 className="font-medium leading-6 text-gray-900 dark:text-gray-100">
						{/* The full name needs about 228px at 16px, which fits from 360px up. Below that it wraps. */}
						<span className="min-[360px]:hidden">
							{experience.shortCompany ?? experience.company}
						</span>
						<span className="hidden whitespace-nowrap min-[360px]:inline">
							{experience.company}
						</span>
					</h3>
				</div>
				<ol className="mt-3">
					{experience.positions.map((position, index) => (
						<li key={position.startDate} className="relative pb-4 pl-16 last:pb-0">
							{index < last && (
								<span
									aria-hidden="true"
									className="absolute top-[20px] left-[23px] h-[56px] w-0.5 bg-gray-300 dark:bg-gray-700"
								/>
							)}
							<span
								aria-hidden="true"
								className="absolute top-[16px] left-5 size-2 rounded-full bg-gray-400 dark:bg-gray-500"
							/>
							<p className="h-5 text-sm leading-5 font-medium text-gray-900 dark:text-gray-100">
								{position.role}
							</p>
							<p className="h-5 text-sm leading-5 text-gray-500">{formatPeriod(position)}</p>
						</li>
					))}
				</ol>
			</li>
		);
	}

	const [position] = experience.positions;
	if (!position) {
		return null;
	}

	return (
		<li className="flex items-center gap-4 py-0.5">
			<div className="flex h-11 w-12 shrink-0 items-center justify-center">
				<CompanyLogo kind={experience.logo} />
			</div>
			<div className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2">
				<h3 className="col-start-1 row-start-1 font-medium text-gray-900 dark:text-gray-100">
					{companyName}
				</h3>
				<p className="col-span-2 row-start-2 text-sm text-gray-600 sm:col-span-1 dark:text-gray-400">
					{position.role}
				</p>
				<p className="col-start-2 row-start-1 text-sm text-gray-500 sm:row-span-2">
					{formatPeriod(position)}
				</p>
			</div>
		</li>
	);
}
