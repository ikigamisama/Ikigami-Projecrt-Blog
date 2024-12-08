import type { StaticImageData } from "next/image";
import type { IconType } from "react-icons";

export type LoginData = { email: string; password: string };

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

export type RegisterData = {
	username: string;
	email: string;
	first_name: string;
	last_name: string;
	password: string;
	confirm_password: string;
};

export type PostBlogData = {
	title: string;
	description: string;
	category: string;
	imgLink: string;
	content: string;
};

export interface EditPostButtonProps {
	blog_id: string;
}
