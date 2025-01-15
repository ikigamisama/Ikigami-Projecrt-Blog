import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const body = await request.json();

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_PROJECT_BACKEND_API}/predict/loan-application/`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			},
		);

		const data = await response.json();

		return NextResponse.json(data, { status: response.status });
	} catch (error) {
		console.error("API Error:", error);
		return NextResponse.json(
			{ error: "Error connecting to external API" },
			{ status: 500 },
		);
	}
}
