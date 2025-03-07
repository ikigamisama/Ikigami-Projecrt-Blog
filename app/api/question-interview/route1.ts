import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const cookieStore = cookies();
		const supabase = createClient(await cookieStore);

		const { data, error } = await supabase.from("Quiz").select();

		if (error) {
			return NextResponse.json(
				{ error: true, message: error.message },
				{ status: 500 },
			);
		}

		const formattedData = data.map((item) => ({
			...item,
			choices: item.choices.split("., ").filter((choice: any) => choice),
		}));

		return NextResponse.json({ data: formattedData }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: true, message: "An unexpected error occurred." },
			{ status: 500 },
		);
	}
}
