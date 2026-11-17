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
		// The 48px timeline gutter and 16px gap keep role text on the company-name edge. The dot
		// centers on the role line box, while its connector meets the next dot through the 16px gap.
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
				<ol className="mt-3 flex flex-col gap-4">
					{experience.positions.map((position, index) => (
						<li
							key={position.startDate}
							className="relative grid grid-cols-[48px_minmax(0,1fr)] items-center gap-x-4"
						>
							{index < last && (
								<span
									aria-hidden="true"
									className="absolute top-1/2 bottom-[-8px] left-[23px] w-0.5 bg-gray-300 dark:bg-gray-700"
								/>
							)}
							{index > 0 && (
								<span
									aria-hidden="true"
									className="absolute top-[-8px] bottom-1/2 left-[23px] w-0.5 bg-gray-300 dark:bg-gray-700"
								/>
							)}
							<span
								aria-hidden="true"
								className="absolute top-1/2 left-5 size-2 -translate-y-1/2 rounded-full bg-gray-400 dark:bg-gray-500"
							/>
							<div className="col-start-2 flex min-w-0 items-center justify-between gap-2">
								<p className="min-w-0 flex-1 text-sm leading-5 font-medium text-gray-900 dark:text-gray-100">
									{position.role}
								</p>
								<p className="shrink-0 whitespace-nowrap text-sm leading-5 text-gray-500">
									{formatPeriod(position)}
								</p>
							</div>
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
