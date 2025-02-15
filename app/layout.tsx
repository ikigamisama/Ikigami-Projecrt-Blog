import type { Metadata } from "next";
import { workSans } from "@/lib/font";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SessionProvider from "@/components/SessionProvider";

import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { ifSignInUser } from "@/lib/models/data";

export const metadata: Metadata = {
	metadataBase: new URL("https://ikigami-project-blog.vercel.app"),
	keywords: ["iki blog", "ikigami blog", "ikigami project blog"],
	title: {
		default: "Iki's Project Blog",
		template: "%s | Iki's Project Blog",
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cookieStore = await cookies();
	const supabase = createClient(cookieStore);

	const { user } = await ifSignInUser(supabase);

	let authorData = null;
	if (user) {
		const { data, error: authorError } = await supabase
			.from("Author")
			.select()
			.eq("auth_id", user.id)
			.single();

		if (authorError) {
			console.error("Error fetching Author data:", authorError.message);
		} else {
			authorData = data;
		}
	}

	return (
		<html lang='en' suppressHydrationWarning>
			<body className={`${workSans.variable} antialiased`}>
				<ThemeProvider
					attribute='class'
					defaultTheme='light'
					enableSystem
					disableTransitionOnChange>
					<SessionProvider data={user}>
						<Header user={user} author={authorData} />
						{children}
						<Footer />

						<Toaster />
					</SessionProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
