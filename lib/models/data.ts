import { SupabaseClient, User } from "@supabase/supabase-js";
import { AuthorData, PostsListData, QuestionsData } from "../type";

export const ifSignInUser = async (
	supabase: SupabaseClient<any, "public", any>,
): Promise<{ user: User | null }> => {
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return { user };
};

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
		.select(
			`*,Author(id,username,first_name,last_name , avatar_url), VisitorLogs(count)`,
		)
		.order("created_at", { ascending: false });

	const processedData = data
		? data.map((post) => ({
				...post,
				VisitorLogCount: post.VisitorLogs?.[0]?.count || 0,
		  }))
		: null;

	return { data: processedData, error };
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

export const getQuestionList = async (
	supabase: SupabaseClient<any, "public", any>,
	category: string,
	question_num: number,
): Promise<{ data: QuestionsData[] | null; error: Error | null }> => {
	const { data, error } = await supabase.rpc("get_random_questions", {
		category_param: category,
		limit_param: question_num,
	});

	if (error) {
		console.error("Error fetching questions:", error);
		return { data: null, error };
	}

	return { data, error: null };
};

export const getCorrectAnswerQuestion = async (
	supabase: SupabaseClient<any, "public", any>,
	id: string | undefined,
): Promise<{ data: QuestionsData }> => {
	const { data } = await supabase.from("Quiz").select().eq("id", id).single();

	return { data };
};
