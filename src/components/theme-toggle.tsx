"use client";

import { useTheme } from "next-themes";

import { mutedLink } from "@/components/link-style";

const MOON =
	"M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z";
const SUN =
	"M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z";

function Icon({ path, className }: { path: string; className: string }) {
	return (
		<svg
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className={className}
			aria-hidden="true"
		>
			<path strokeLinecap="round" strokeLinejoin="round" d={path} />
		</svg>
	);
}

export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();

	// resolvedTheme is undefined until hydration; the class set by next-themes' script is already right.
	const toggle = () => {
		const isDark = resolvedTheme
			? resolvedTheme === "dark"
			: document.documentElement.classList.contains("dark");
		setTheme(isDark ? "light" : "dark");
	};

	return (
		<button
			type="button"
			onClick={toggle}
			aria-label="Toggle theme"
			className={`cursor-pointer p-2 ${mutedLink}`}
		>
			<Icon path={MOON} className="h-5 w-5 dark:hidden" />
			<Icon path={SUN} className="hidden h-5 w-5 dark:block" />
		</button>
	);
}
