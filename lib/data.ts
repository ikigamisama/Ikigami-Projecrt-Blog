import { CategoryData, SocialType } from "./type";

import { FaXTwitter } from "react-icons/fa6";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
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
];

export const socials: SocialType[] = [
	{ icon: FaGithub, path: "/" },
	{ icon: FaLinkedin, path: "/" },
	{ icon: FaYoutube, path: "/" },
	{ icon: FaXTwitter, path: "/" },
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
];

export const pageWithAuth: string[] = ["/login", "/register"];
export const pageWithoutAuth: string[] = ["/create/posts", "/edit/account"];
