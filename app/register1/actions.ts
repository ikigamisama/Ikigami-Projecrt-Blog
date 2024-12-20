"use server";

import { RegisterData } from "@/lib/type";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const handleRegister = async (registerData: RegisterData) => {
	try {
		const cookieStore = await cookies();
		const supabase = createClient(cookieStore);

		const { data, error } = await supabase.auth.signUp({
			email: registerData.email,
			password: registerData.password,
		});

		if (data) {
			const { error } = await supabase.from("Author").insert({
				first_name: registerData.first_name,
				last_name: registerData.last_name,
				username: registerData.username,
				email: registerData.email,
				auth_id: data.user?.id,
			});
			if (error) return { error: true, message: error.message };
			else return { error: false, data };
		}

		if (error) return { error: true, message: error.message };
	} catch (error) {
		return { error: true, message: "An unexpected error occurred." };
	}
};
