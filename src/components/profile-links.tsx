import type { ProfileLink } from "@/data/profile";

type ProfileLinksProps = {
	links: readonly ProfileLink[];
};

export function ProfileLinks({ links }: ProfileLinksProps) {
	return (
		<div className="flex flex-wrap gap-4 text-sm font-semibold">
			{links.map((link) => (
				<a
					key={link.label}
					href={link.href}
					target={link.newTab ? "_blank" : undefined}
					rel={link.newTab ? "noopener noreferrer" : undefined}
					className="text-gray-600 transition-colors duration-300 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
				>
					{link.label}
				</a>
			))}
		</div>
	);
}
