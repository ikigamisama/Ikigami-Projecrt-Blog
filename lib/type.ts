import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
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

export type AuthorData = {
	id: string;
	username: string;
	last_name: string;
	first_name: string;
	auth_id?: string;
	avatar_url?: string;
	bio: string;
	email: string;
};

export type AuthorEditData = {
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	bio: string;
};

export type PostsListData = {
	id: string;
	created_at: string;
	title: string;
	slug_title: string;
	description: string;
	category: string;
	image_link: string;
	content: string;
	author_id: string;
	updated_at?: string;
	Author?: AuthorData;
	VisitorLogCount?: number;
};

export type HeadingsData = {
	text: string;
	id: string;
	tag: string;
};

export interface PostListDataInterface {
	list: PostsListData[] | null;
	con?: SupabaseClient<any, "public", any>;
}
export interface EditPostButtonProps {
	blog_id: string;
}

export interface PostResponse {
	postAllData: PostsListData | null;
	postError: PostgrestError | null;
}

export interface BlogListProps {
	list: PostsListData[] | null;
}

export interface BlogItemProps {
	list: PostsListData;
}
