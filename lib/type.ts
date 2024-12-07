import type { StaticImageData } from "next/image";
import type { IconType } from "react-icons";

export type CategoryData = { value: string; name: string };
export type SocialType = { icon: IconType; path: string };

export type BlogData = {
	id: number;
	title: string;
	description: string;
	image: StaticImageData;
	date: number;
	category: string;
	author: string;
	author_img: StaticImageData;
};

export interface EditPostButtonProps {
	blog_id: string;
}
