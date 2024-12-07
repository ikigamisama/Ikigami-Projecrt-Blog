"use server";

import { RegisterData } from "@/lib/type";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const handleRegister = async (registerData: RegisterData) => {
	try {
		const cookieStore = cookies();
		const supabase = createClient(cookieStore);

		const { data, error } = await supabase.auth.signUp({
			email: registerData.email,
			password: registerData.password,
			options: {
				data: {
					username: registerData.username,
					first_name: registerData.first_name,
					last_name: registerData.last_name,
				},
			},
		});

		if (data) {
			return { data };
		}

		if (error) {
			return { error: error.message };
		}
	} catch (error) {
		return { error: "An unexpected error occurred." };
	}
};
