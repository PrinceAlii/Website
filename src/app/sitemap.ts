import type { MetadataRoute } from "next";

import { profile } from "@/data/profile";

// Required for `output: "export"`, which cannot render this route on request.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
	return [{ url: `${profile.siteUrl}/` }];
}
