"use server";

import { PostBlogData } from "@/lib/type";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const handleCreatePostBlog = async (registerData: PostBlogData) => {
	try {
		const cookieStore = cookies();
		const supabase = createClient(cookieStore);

		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (user) {
			const { data, error } = await supabase
				.from("Posts")
				.insert({
					title: registerData.title,
					description: registerData.description,
					category: registerData.category,
					image_link: registerData.imgLink,
					content: registerData.content,
					author_id: user.id,
				})
				.select()
				.single();

			if (error) {
				return { error: true, message: error.message };
			} else {
				return {
					error: false,
					message: "Succesful Create your Post",
					data: data,
				};
			}
		}
	} catch (error) {
		return { error: "An unexpected error occurred." };
	}
};
