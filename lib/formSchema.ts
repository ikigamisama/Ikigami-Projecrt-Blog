import { z } from "zod";

export const formSchema = z.object({
	title: z.string().min(3).max(100),
	description: z.string().min(20).max(1000),
	category: z.string(),
	imgLink: z
		.string()
		.url()
		.refine(async (url) => {
			try {
				const res = await fetch(url, { method: "HEAD" });
				const contentType = res.headers.get("content-type");

				return contentType?.startsWith("image/");
			} catch {
				return false;
			}
		}),
	content: z.string().min(10),
});

export const loginFormSchema = z.object({
	email: z
		.string()
		.min(1, { message: "Email is required." })
		.email({ message: "Please enter a valid email address." }),
	password: z
		.string()
		.min(7, { message: "Password must be at least 7 characters long." }),
});

export const registerFormSchema = z
	.object({
		username: z
			.string()
			.min(3, { message: "Username must be at least 3 characters long." })
			.max(20, { message: "Username cannot exceed 20 characters." }),

		email: z
			.string()
			.min(1, { message: "Email is required." })
			.email({ message: "Please enter a valid email address." }),

		first_name: z
			.string()
			.min(1, { message: "First name is required." })
			.max(50, { message: "First name cannot exceed 50 characters." }),

		last_name: z
			.string()
			.min(1, { message: "Last name is required." })
			.max(50, { message: "Last name cannot exceed 50 characters." }),

		password: z
			.string()
			.min(7, { message: "Password must be at least 7 characters long." }),
		confirm_password: z.string().min(7, {
			message: "Confirm password must be at least 7 characters long.",
		}),
	})
	.refine((data) => data.password === data.confirm_password, {
		message: "Passwords don't match",
		path: ["password"],
	});

export const editUserInfoSchema = z.object({
	first_name: z
		.string()
		.min(1, { message: "First name is required." })
		.max(50, { message: "First name cannot exceed 50 characters." }),

	last_name: z
		.string()
		.min(1, { message: "Last name is required." })
		.max(50, { message: "Last name cannot exceed 50 characters." }),

	username: z
		.string()
		.min(3, { message: "Username must be at least 3 characters long." })
		.max(30, { message: "Username cannot exceed 30 characters." }),

	email: z
		.string()
		.min(1, { message: "Email is required." })
		.email({ message: "Please enter a valid email address." }),
	bio: z.string().min(10).max(300),
});

export const editPasswordInfoSchema = z
	.object({
		current_password: z.string().min(7, {
			message: "Current password must be at least 7 characters long.",
		}),
		new_password: z
			.string()
			.min(7, { message: "New password must be at least 7 characters long." }),
		confirm_new_password: z.string().min(7, {
			message: "Confirm new password must be at least 7 characters long.",
		}),
	})
	.refine((data) => data.new_password === data.confirm_new_password, {
		message: "New passwords don't match.",
		path: ["confirm_new_password"],
	});
