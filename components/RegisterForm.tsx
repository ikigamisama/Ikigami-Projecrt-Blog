"use client";

import { registerFormSchema } from "@/lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { jetbrainsMono, roboto_mono } from "@/lib/font";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { handleRegister } from "@/app/register/actions";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
	const router = useRouter();
	const { toast } = useToast();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] =
		useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const form = useForm<z.infer<typeof registerFormSchema>>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			username: "",
			email: "",
			first_name: "",
			last_name: "",
			password: "",
			confirm_password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof registerFormSchema>) {
		setIsLoading(true);
		const result = await handleRegister(values);

		if (result?.error) {
			toast({
				title: "Register Failed",
				description: result.message,
				variant: "destructive",
			});
		} else {
			toast({
				title: "Register Successful",
				description: "Welcome!",
			});

			router.push("/login");
		}
		setIsLoading(false);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='startup-form'>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel
								htmlFor='email'
								className={`startup-form_label ${jetbrainsMono.className}`}>
								Email
							</FormLabel>
							<FormControl>
								<Input
									id='email'
									placeholder='Enter Email'
									className={`startup-form_input ${roboto_mono.className}`}
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel
								htmlFor='username'
								className={`startup-form_label ${jetbrainsMono.className}`}>
								Username
							</FormLabel>
							<FormControl>
								<Input
									id='username'
									placeholder='Enter Username'
									className={`startup-form_input ${roboto_mono.className}`}
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='first_name'
					render={({ field }) => (
						<FormItem>
							<FormLabel
								htmlFor='first_name'
								className={`startup-form_label ${jetbrainsMono.className}`}>
								First Name
							</FormLabel>
							<FormControl>
								<Input
									id='first_name'
									placeholder='Enter First Name'
									className={`startup-form_input ${roboto_mono.className}`}
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='last_name'
					render={({ field }) => (
						<FormItem>
							<FormLabel
								htmlFor='last_name'
								className={`startup-form_label ${jetbrainsMono.className}`}>
								Last Name
							</FormLabel>
							<FormControl>
								<Input
									id='last_name'
									placeholder='Enter Last Name'
									className={`startup-form_input ${roboto_mono.className}`}
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel
								htmlFor='password'
								className={`startup-form_label ${jetbrainsMono.className}`}>
								Password
							</FormLabel>
							<FormControl>
								<div className='relative'>
									<Input
										type={showPassword ? "text" : "password"}
										id='password'
										placeholder='Enter Password'
										className={`startup-form_input ${roboto_mono.className}`}
										{...field}
									/>
									<Button
										type='button'
										variant='ghost'
										onClick={() => setShowPassword(!showPassword)}
										className='absolute right-[3px] top-0 h-full px-4 py-2 hover:bg-transparent'
										aria-label={
											showPassword ? "Hide password" : "Show password"
										}>
										{showPassword ? (
											<FaRegEyeSlash size={22} />
										) : (
											<FaRegEye size={22} />
										)}
									</Button>
								</div>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='confirm_password'
					render={({ field }) => (
						<FormItem>
							<FormLabel
								htmlFor='confirm_password'
								className={`startup-form_label ${jetbrainsMono.className}`}>
								Confirm Password
							</FormLabel>
							<FormControl>
								<div className='relative'>
									<Input
										type={showConfirmPassword ? "text" : "password"}
										id='confirm_password'
										placeholder='Enter Confirm Password'
										className={`startup-form_input ${roboto_mono.className}`}
										{...field}
									/>
									<Button
										type='button'
										variant='ghost'
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										className='absolute right-[3px] top-0 h-full px-4 py-2 hover:bg-transparent'
										aria-label={
											showConfirmPassword ? "Hide password" : "Show password"
										}>
										{showConfirmPassword ? (
											<FaRegEyeSlash size={22} />
										) : (
											<FaRegEye size={22} />
										)}
									</Button>
								</div>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					className='startup-form_btn text-white'
					disabled={isLoading == true ? true : false}>
					{isLoading == false ? "Register" : "Loading . . . "}
				</Button>
			</form>
		</Form>
	);
};

export default RegisterForm;
