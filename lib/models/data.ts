import { SupabaseClient } from "@supabase/supabase-js";

export const getPostData = async (
	title: string,
	supabase: SupabaseClient<any, "public", any>,
) => {
	const { data: postData } = await supabase
		.from("Posts")
		.select()
		.eq("slug_title", title)
		.single();

	if (postData) {
		const { data: postAllData, error: postAllError } = await supabase
			.from("Posts")
			.select("*,Author(id,username,first_name,last_name)")
			.eq("id", postData.id)
			.single();

		if (postAllError) {
			console.error("Error fetching post data:", postAllError);
			return null;
		}

		return postAllData;
	}
};

export const logVisitor = async (
	visitorId: string,
	postId: string,
	supabase: SupabaseClient<any, "public", any>,
) => {
	const { error } = await supabase.from("VisitorLogs").insert({
		visitor_id: visitorId,
		post_id: postId,
	});

	if (error) {
		console.error("Error logging visitor:", error);
	} else {
		console.log("Visitor logged successfully");
	}
};

export const getUserData = async (
	supabase: SupabaseClient<any, "public", any>,
) => {};
