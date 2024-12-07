"use server";

import { LoginData } from "@/lib/type";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handleLogin = async (data: LoginData) => {
	try {
		const cookieStore = cookies();
		const supabase = createClient(cookieStore);

		const { error } = await supabase.auth.signInWithPassword({
			email: data.email,
			password: data.password,
		});

		if (error) {
			return { error: error.message };
		}

		redirect("/");
	} catch (error) {
		return { error: "An unexpected error occurred." };
	}
};

export const handleLogout = async () => {
	try {
		const cookieStore = cookies();
		const supabase = createClient(cookieStore);

		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (user) {
			await supabase.auth.signOut();
		}

		redirect("/");
	} catch (error) {
		return { error: "An unexpected error occurred." };
	}
};
