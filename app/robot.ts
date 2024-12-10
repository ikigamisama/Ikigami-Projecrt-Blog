import { MetadataRoute } from "next";

export default function robot(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: "/login",
		},
		sitemap: "https://ikigami-project-blog.vercel.app/sitemap.xml",
	};
}
