export type Achievement =
	| { kind: "award"; rank: string; subject: string; exam: string }
	| { kind: "certification"; name: string; status: "in progress" };

// Achievements from public/resume.pdf. Retained in the data layer but
// intentionally not rendered: the reference design has no achievements
// section.
export const achievements: readonly Achievement[] = [
	{
		kind: "award",
		rank: "2nd in NSW",
		subject: "Information Processes & Technology",
		exam: "2022 HSC",
	},
	{
		kind: "certification",
		name: "AWS Certified Solutions Architect - Associate",
		status: "in progress",
	},
];
