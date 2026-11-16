import { ExperienceItem } from "@/components/experience-item";
import { mutedLink } from "@/components/link-style";
import { ThemeToggle } from "@/components/theme-toggle";
import { experiences } from "@/data/experiences";
import { profile } from "@/data/profile";

export default function Home() {
	return (
		<>
			<header className="mb-16 flex h-12 items-center justify-between">
				<h1 className="font-pixel text-[clamp(1.75rem,9.2vw,3rem)] font-medium leading-none tracking-tight">
					{profile.name}
				</h1>
				<ThemeToggle />
			</header>

			<section aria-label="Links" className="mb-20 flex flex-wrap gap-4 text-sm font-semibold">
				{profile.links.map((link) => (
					<a
						key={link.label}
						href={link.href}
						{...(link.newTab && { target: "_blank", rel: "noopener noreferrer" })}
						className={mutedLink}
					>
						{link.label}
					</a>
				))}
			</section>

			<section aria-labelledby="experiences-heading">
				<h2
					id="experiences-heading"
					className="mb-6 text-sm font-medium uppercase tracking-wider text-gray-500"
				>
					Experiences
				</h2>
				<ul className="space-y-6">
					{experiences.map((experience) => (
						<ExperienceItem
							key={`${experience.company}-${experience.startDate}`}
							experience={experience}
						/>
					))}
				</ul>
			</section>
		</>
	);
}
