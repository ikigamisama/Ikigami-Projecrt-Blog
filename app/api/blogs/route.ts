import { getPostList } from "@/lib/models/data";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
	const cookieStore = await cookies();
	const supabase = createClient(cookieStore);
	const { data, error } = await getPostList(supabase);

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json({ data });
}
