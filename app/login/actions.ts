"use server";

import { LoginData } from "@/lib/type";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handleLogin = async (loginData: LoginData) => {
	try {
		const cookieStore = cookies();
		const supabase = createClient(cookieStore);

		const { data, error } = await supabase.auth.signInWithPassword({
			email: loginData.email,
			password: loginData.password,
		});

		if (data)
			return { error: false, message: "You have logged in successfully!" };

		if (error) return { error: true, message: error.message };

		redirect("/");
	} catch (error) {
		return { error: true, message: "An unexpected error occurred." };
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
