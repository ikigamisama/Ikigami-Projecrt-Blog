import { convertToTitle } from "@/lib/string";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

const getPostData = async (
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

const logVisitor = async (visitorId: string, postId: string, supabase: any) => {
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

export default async function PostLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: { title: string };
}>) {
	const { title } = await params;
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	let visitorId: string;
	if (!user) {
		visitorId = (await cookieStore).get("visitor_id")?.value || uuidv4();
		if (!(await cookieStore).get("visitor_id")) {
			(await cookieStore).set("visitor_id", visitorId, { expires: 365 });
		}
	} else {
		visitorId = "";
	}

	if (title) {
		const postData = await getPostData(convertToTitle(title), supabase);

		if (visitorId && postData) {
			await logVisitor(visitorId, postData.id, supabase);
		}
	}

	return <main>{children}</main>;
}
