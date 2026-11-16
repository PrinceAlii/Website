import { experiences, formatPeriod } from "@/data/experiences";
import { profile } from "@/data/profile";

// Required for `output: "export"`. Built to out/index.md, which the Worker serves to requests that
// send `Accept: text/markdown`.
export const dynamic = "force-static";

export function GET() {
	const links = profile.links.map(
		(link) => `- [${link.label}](${new URL(link.href, profile.siteUrl).href})`,
	);
	const rows = experiences.map(
		(experience) => `- **${experience.company}**: ${experience.role} (${formatPeriod(experience)})`,
	);
	const markdown = [
		"---",
		`title: ${profile.name}`,
		`description: ${profile.description}`,
		`image: ${profile.siteUrl}/og.png`,
		"---",
		"",
		`# ${profile.name}`,
		"",
		profile.description,
		"",
		...links,
		"",
		"## Experiences",
		"",
		...rows,
		"",
	].join("\n");

	return new Response(markdown, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
