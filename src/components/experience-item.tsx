import { CompanyLogo } from "@/components/company-logo";
import { type Experience, formatPeriod } from "@/data/experiences";

// One grid places the date in both layouts, so it is rendered once. On phones it sits on the
// company line and the role spans the full width. From sm up it is centered against both lines.
export function ExperienceItem({ experience }: { experience: Experience }) {
	return (
		<li className="flex items-center gap-4 py-0.5">
			<div className="flex h-11 w-12 shrink-0 items-center justify-center">
				<CompanyLogo kind={experience.logo} />
			</div>
			<div className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2">
				<h3 className="col-start-1 row-start-1 font-medium text-gray-900 dark:text-gray-100">
					<span className="sm:hidden">{experience.shortCompany ?? experience.company}</span>
					<span className="hidden sm:inline">{experience.company}</span>
				</h3>
				<p className="col-span-2 row-start-2 text-sm text-gray-600 sm:col-span-1 dark:text-gray-400">
					{experience.role}
				</p>
				<p className="col-start-2 row-start-1 text-sm text-gray-500 sm:row-span-2">
					{formatPeriod(experience)}
				</p>
			</div>
		</li>
	);
}
