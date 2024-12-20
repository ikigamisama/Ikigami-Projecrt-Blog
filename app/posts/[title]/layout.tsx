import { getPostData, ifSignInUser, logVisitor } from "@/lib/models/data";
import { createClient } from "@/utils/supabase/server";

import { cookies } from "next/headers";

export default async function PostLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ title: string }>;
}) {
	const { title } = await params;
	const cookieStore = await cookies();
	const supabase = createClient(cookieStore);

	const { user } = await ifSignInUser(supabase);

	let visitorId: string;
	if (!user) {
		const existingVisitorId = cookieStore.get("visitor_id")?.value;

		if (!existingVisitorId) {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_SITE_URL}/api/set-visitor-cookie`,
			);
			const { visitorId: newVisitorId } = await response.json();
			visitorId = newVisitorId;
		} else {
			visitorId = existingVisitorId;
		}
	} else {
		visitorId = "";
	}

	if (title) {
		const { data: postData, error } = await getPostData(title, supabase);

		if (visitorId && postData) {
			await logVisitor(visitorId, postData.id, supabase);
		}
	}

	return <main>{children}</main>;
}
