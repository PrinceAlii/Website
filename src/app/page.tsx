import { AnimatedName } from "@/components/animated-name";
import { ExperienceItem } from "@/components/experience-item";
import { ProfileLinks } from "@/components/profile-links";
import { ThemeToggle } from "@/components/theme-toggle";
import { experiences } from "@/data/experiences";
import { profile } from "@/data/profile";

export default function Home() {
	return (
		<main className="mx-auto min-h-screen max-w-2xl px-6 py-24 sm:px-8">
			<header className="mb-16 flex h-12 items-center justify-between">
				<AnimatedName name={profile.name} />
				<ThemeToggle />
			</header>

			<section aria-label="Links" className="mb-20">
				<ProfileLinks links={profile.links} />
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
		</main>
	);
}
