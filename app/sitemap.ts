import { getAuthorList, getPostList } from "@/lib/models/data";
import { PostsListData } from "@/lib/type";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function FaSitemap() {
	const cookieStore = await cookies();
	const supabase = createClient(cookieStore);

	const { data: postData } = await getPostList(supabase);
	const { data: authorData } = await getAuthorList(supabase);

	const authorList =
		authorData?.map((author: any) => ({
			url: `https://ikigami-project-blog.vercel.app/author/@${author.username}`,
			lastModified: author?.created_at || new Date().toISOString(),
			changeFrequency: "monthly",
			priority: 1,
		})) ?? [];

	const postList =
		postData?.map((post: PostsListData) => ({
			url: `https://ikigami-project-blog.vercel.app/posts/${post.slug_title}`,
			lastModified: post?.created_at || new Date().toISOString(),
			changeFrequency: "monthly",
			priority: 1,
		})) ?? [];

	return [
		{
			url: "https://ikigami-project-blog.vercel.app",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		...postList,
		...authorList,
	];
}
