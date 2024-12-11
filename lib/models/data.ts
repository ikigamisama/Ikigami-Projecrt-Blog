import { SupabaseClient } from "@supabase/supabase-js";
import { AuthorData, PostsListData } from "../type";

export const getPostData = async (
	title: string,
	supabase: SupabaseClient<any, "public", any>,
): Promise<{ data: PostsListData | null; error: Error | null }> => {
	const { data: postData, error: postError } = await supabase
		.from("Posts")
		.select()
		.eq("slug_title", title)
		.single();

	if (postData) {
		const { data: postAllData, error: postAllError } = await supabase
			.from("Posts")
			.select("*, Author(id, username, first_name, last_name, avatar_url)")
			.eq("id", postData.id)
			.single();

		return { data: postAllData, error: postAllError };
	}

	return { data: null, error: postError };
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

export const getPostList = async (
	supabase: SupabaseClient<any, "public", any>,
): Promise<{ data: PostsListData[] | null; error: Error | null }> => {
	const { data, error } = await supabase
		.from("Posts")
		.select(`*,Author(id,username,first_name,last_name , avatar_url)`);

	return { data, error };
};

export const getAuthorList = async (
	supabase: SupabaseClient<any, "public", any>,
): Promise<{ data: PostsListData[] | null; error: Error | null }> => {
	const { data, error } = await supabase.from("Author").select();

	return { data, error };
};

export const getAuthorPostList = async (
	username: string,
	supabase: SupabaseClient<any, "public", any>,
): Promise<{ data: AuthorData | null; error: Error | null }> => {
	const { data, error } = await supabase
		.from("Author")
		.select()
		.eq("username", username)
		.single();

	return { data, error };
};
