import { SupabaseClient } from "@supabase/supabase-js";

export const getPostData = async (
	title: string,
	supabase: SupabaseClient<any, "public", any>,
) => {
	const { data, error } = await supabase
		.from("Posts")
		.select()
		.eq("title", title)
		.single();

	if (error) {
		console.error("Error fetching post data:", error);
		return null;
	}

	return data;
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
