import { CategoryData, SocialType } from "./type";

import { FaXTwitter } from "react-icons/fa6";
import { FaGithub, FaKaggle, FaLinkedin } from "react-icons/fa";
import { Option } from "@/components/ui/multiple-selector";

export const category: CategoryData[] = [
	{
		value: "all",
		name: "All",
	},
	{
		value: "data-analysis",
		name: "Data Analysis",
	},
	{
		value: "machine-learning",
		name: "Machine Learning",
	},
	{
		value: "visualizaiton",
		name: "Visualization",
	},
	{
		value: "techniques",
		name: "Techniques",
	},
	{
		value: "resource",
		name: "Resource",
	},
	{
		value: "stratascratch",
		name: "Stratascratch",
	},
];

export const socials: SocialType[] = [
	{ icon: FaGithub, path: "https://github.com/ikigamisama" },
	{
		icon: FaLinkedin,
		path: "https://www.linkedin.com/in/franz-monzales-671775135",
	},

	{ icon: FaXTwitter, path: "https://x.com/ikigamidevs" },
	{ icon: FaKaggle, path: "https://www.kaggle.com/franzmonzales" },
];

export const categoryOption: Option[] = [
	{
		value: "Data Analysis",
		label: "Data Analysis",
	},
	{
		value: "Machine Learning",
		label: "Machine Learning",
	},
	{
		value: "Visualization",
		label: "Visualization",
	},
	{
		value: "Techniques",
		label: "Techniques",
	},
	{
		value: "Resource",
		label: "Resource",
	},
	{
		value: "Project",
		label: "Project",
	},
	{
		value: "Highlight",
		label: "Highlight",
	},
	{
		value: "Stratascratch",
		label: "Stratascratch",
	},
];

export const secondaryCategoryOptions: Option[] = [
	{ value: "business-analysis", label: "Business Analysis" },
	{ value: "data-exploration", label: "Data Exploration" },
	{ value: "data-engineering", label: "Data Engineering" },
	{ value: "regression", label: "Regression" },
	{ value: "classification", label: "Classification" },
	{ value: "nlp", label: "NLP" },
	{ value: "clustering", label: "Clustering" },
];

export const pageWithAuth: string[] = ["/login", "/register"];
export const pageWithoutAuth: string[] = [
	"/create/posts",
	"/edit/account",
	"/edit/posts",
];
