export type LogoKind = "abs" | "commbank" | "service-nsw" | "mcdonalds";

export type Experience = {
	company: string;
	shortCompany?: string;
	legalName?: string;
	role: string;
	location: string;
	startDate: string;
	endDate: string | "Present";
	period: string;
	logo: LogoKind;
	highlights: readonly string[];
	skills: readonly string[];
};

const formatPeriod = (startDate: string, endDate: string): string => {
	const startYear = startDate.slice(0, 4);
	const endYear = endDate === "Present" ? "Present" : endDate.slice(0, 4);
	return `${startYear} to ${endYear}`;
};

// Newest first. Full dates are retained even though the page mirrors the
// reference design's year-only display. Roles and highlights come from the
// resume and the existing experience collection in this repository.
export const experiences: readonly Experience[] = [
	{
		company: "Australian Bureau of Statistics",
		shortCompany: "ABS",
		role: "Graduate DevOps Engineer",
		location: "Sydney, NSW",
		startDate: "2026-02",
		endDate: "Present",
		period: formatPeriod("2026-02", "Present"),
		logo: "abs",
		highlights: [
			"Own the day-to-day operation and ongoing development of the Coder Cloud Development Environment on AWS, supporting around 250 daily active users across ECS, EC2 workspace instances, RDS PostgreSQL, and an Application Load Balancer.",
			"Administer and upgrade a self-managed Artifactory deployment on EKS, including Helm chart upgrades, Kubernetes cluster maintenance, and container troubleshooting.",
			"Liaised with internal and external stakeholders to design and run a Proof-of-Concept trial of GitHub Copilot within Coder, translating technical constraints into a workable pilot.",
			"Contribute to the Jira Data Centre to Jira Cloud migration, covering environment planning, data validation, and stakeholder coordination.",
			"Support developers across the organisation with GitLab CI/CD queries, pipeline debugging, and general DevOps troubleshooting.",
		],
		skills: [
			"Coder",
			"AWS",
			"Artifactory",
			"EKS",
			"Kubernetes",
			"Helm",
			"GitHub Copilot",
			"Jira",
			"GitLab CI/CD",
		],
	},
	{
		company: "Australian Bureau of Statistics",
		shortCompany: "ABS",
		role: "Cadet, DevOps",
		location: "Sydney, NSW",
		startDate: "2025-03",
		endDate: "2026-02",
		period: formatPeriod("2025-03", "2026-02"),
		logo: "abs",
		highlights: [
			"Administered Red Hat Enterprise Linux (RHEL) systems in a production on-premises environment, performing patching, configuration management, and routine maintenance.",
			"Contributed to the migration of on-premises workloads to AWS and Azure, including environment setup and post-migration validation.",
			"Performed version upgrades and ongoing maintenance on self-managed GitLab and Artifactory instances.",
			"Assisted in the design and maintenance of GitLab CI/CD pipelines used for application deployment across the organisation.",
			"Collaborated with the DevOps team on improvements to business-critical tools, including Jira and Sparx EA.",
		],
		skills: ["RHEL", "AWS", "Azure", "GitLab", "Artifactory", "GitLab CI/CD", "Jira", "Sparx EA"],
	},
	{
		company: "Commonwealth Bank of Australia",
		shortCompany: "CommBank",
		legalName: "Commonwealth Bank of Australia",
		role: "Business Banking Associate",
		location: "Redfern, NSW",
		startDate: "2024-11",
		endDate: "2025-06",
		period: formatPeriod("2024-11", "2025-06"),
		logo: "commbank",
		highlights: [
			"Explained complex banking products clearly to customers with varying levels of financial literacy.",
			"Consistently exceeded customer experience targets, including a Net Promoter Score (NPS) above +70 and a high post-call survey completion rate.",
			"Resolved escalated complaints and complex queries, routing issues to the right specialist teams and reducing incorrect call transfers.",
		],
		skills: [
			"Banking Products",
			"Customer Experience",
			"Complaint Resolution",
			"Specialist Routing",
		],
	},
	{
		company: "Service NSW",
		role: "Customer & Digital Service Representative",
		location: "Ryde, NSW",
		startDate: "2023-03",
		endDate: "2024-11",
		period: formatPeriod("2023-03", "2024-11"),
		logo: "service-nsw",
		highlights: [
			"Delivered accurate advice across complex multi-agency transactions, maintaining strict compliance with privacy legislation.",
			"Handled escalated complaints involving licensing and registration, ensuring issues were documented and resolved through appropriate channels.",
		],
		skills: ["Multi-Agency Transactions", "Privacy Compliance", "Complaint Resolution"],
	},
	{
		company: "McDonald's",
		role: "Crew Member",
		location: "Mount Colah, NSW",
		startDate: "2019-08",
		endDate: "2023-03",
		period: formatPeriod("2019-08", "2023-03"),
		logo: "mcdonalds",
		highlights: [
			"Provided exceptional customer service, resolving customer complaints and concerns.",
			"Managed the flow of the drive-thru, ensuring cars had a total experience time of less than 140 seconds.",
			"Collaborated with fellow crew members to ensure the smooth operation of the restaurant.",
		],
		skills: ["Customer Service", "Complaint Resolution", "Drive-Thru Flow", "Collaboration"],
	},
];
