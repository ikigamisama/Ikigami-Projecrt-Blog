"use server";

import { convertToSlug } from "@/lib/string";
import { PostBlogData } from "@/lib/type";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const handleCreatePostBlog = async (postBlogData: PostBlogData) => {
	try {
		const cookieStore = await cookies();
		const supabase = createClient(cookieStore);

		const { data: userData, error: userError } = await supabase.auth.getUser();

		if (userData?.user) {
			const { data: authorData } = await supabase
				.from("Author")
				.select()
				.eq("auth_id", userData.user.id)
				.single();

			if (authorData) {
				const { data: postData, error: postError } = await supabase
					.from("Posts")
					.insert({
						title: postBlogData.title,
						description: postBlogData.description,
						category: postBlogData.category,
						secondary_category: postBlogData.secondary_category,
						image_link: postBlogData.imgLink,
						content: postBlogData.content,
						author_id: authorData.id,
						slug_title: convertToSlug(postBlogData.title),
					})
					.select()
					.single();

				if (postError) {
					return { error: true, message: postError.message };
				} else {
					return {
						error: false,
						message: "Succesful Create your Post",
						data: postData,
					};
				}
			}
		}
	} catch (error) {
		return { error: "An unexpected error occurred." };
	}
};

export const handleEditPost = async (id: string, postData: PostBlogData) => {
	try {
		const cookieStore = await cookies();
		const supabase = createClient(cookieStore);

		const { data: postEditData, error: postError } = await supabase
			.from("Posts")
			.update({
				title: postData.title,
				description: postData.description,
				category: postData.category,
				secondary_category: postData.secondary_category,
				image_link: postData.imgLink,
				content: postData.content,
				slug_title: convertToSlug(postData.title),
			})
			.eq("id", id)
			.select()
			.single();

		if (!postError)
			return { error: false, message: "Success Edit Post", data: postEditData };
		else return { error: true, message: postError.message };
	} catch (error) {
		return { error: true, message: "An unexpected error occurred." };
	}
};
