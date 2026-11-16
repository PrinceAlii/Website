// All personal details come from Ali's resume, the previous alibo.dev site, and the existing
// portfolio content in this repository. Do not replace these with placeholder
// or reference-site content.
const email = "alibonagdaran@gmail.com";

export const profile = {
	name: "Ali Bonagdaran",
	role: "Graduate DevOps Engineer",
	company: "Australian Bureau of Statistics",
	location: "Sydney, NSW",
	email,
	siteUrl: "https://www.alib.au",
	description:
		"Graduate DevOps Engineer at the Australian Bureau of Statistics. Sydney-based, focused on cloud platforms and developer tooling.",
	links: [
		{
			label: "LinkedIn",
			href: "https://www.linkedin.com/in/alibonagdaran/",
			newTab: true,
		},
		{
			label: "GitHub",
			href: "https://github.com/PrinceAlii",
			newTab: true,
		},
		{
			label: "Resume",
			href: "/resume.pdf",
			newTab: true,
		},
		{
			label: "Contact",
			href: `mailto:${email}`,
			newTab: false,
		},
	],
};
