export type SkillCategory = {
	category: string;
	entries: readonly string[];
};

// Technical skills from public/resume.pdf, in resume order. The resume's
// "Teraform" typo is rendered as "Terraform". Skills are retained in the data
// layer but intentionally not rendered: the reference design has no skills
// section.
export const skillCategories: readonly SkillCategory[] = [
	{
		category: "Operating Systems",
		entries: [
			"Red Hat Enterprise Linux (RHEL)",
			"Amazon Linux",
			"Windows Server",
			"Linux administration",
		],
	},
	{
		category: "Languages",
		entries: ["Python", "Bash", "JavaScript / Node.js", "HTML/CSS", "Java"],
	},
	{
		category: "Cloud & DevOps",
		entries: [
			"AWS ECS",
			"EKS",
			"EC2",
			"RDS",
			"ALB",
			"Lambda",
			"IAM",
			"Terraform",
			"AWS CDK (TypeScript)",
		],
	},
	{
		category: "Containers & Orchestration",
		entries: [
			"Kubernetes",
			"Helm",
			"Docker",
			"production experience on EKS",
			"self-study on OpenShift",
		],
	},
	{
		category: "Tooling",
		entries: ["GitLab administration", "Artifactory", "Jira"],
	},
	{
		category: "Home lab",
		entries: ["Linux VMs", "RAID storage", "Cisco Meraki networking"],
	},
];
