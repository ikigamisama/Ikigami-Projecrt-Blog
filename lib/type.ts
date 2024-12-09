import type { StaticImageData } from "next/image";
import type { IconType } from "react-icons";
import { string } from "zod";

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

export type AuthorData = {
	id: string;
	username: string;
	last_name: string;
	first_name: string;
};

export type PostsListData = {
	id: string;
	created_at: string;
	title: string;
	description: string;
	category: string;
	image_link: string;
	content: string;
	author_id: string;
	Author?: AuthorData;
};

export interface PostListDataInterface {
	list: PostsListData[] | null;
}
export interface EditPostButtonProps {
	blog_id: string;
}
