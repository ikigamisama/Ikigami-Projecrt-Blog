"use client";

import { loginFormSchema } from "@/lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";

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
import { handleLogin } from "@/app/login/actions";

const LoginForm = () => {
	const { toast } = useToast();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof loginFormSchema>) {
		setIsLoading(true);
		const result = await handleLogin(values);

		if (result.error) {
			toast({
				title: "Login Failed",
				description: result.message,
				variant: "destructive",
			});
		} else {
			toast({
				title: "Login Successful",
				description: result.message,
			});
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
								htmlFor='username'
								className={`startup-form_label ${jetbrainsMono.className}`}>
								Email
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

				<Button
					type='submit'
					className='startup-form_btn text-white'
					disabled={isLoading == true ? true : false}>
					{isLoading == false ? "Login" : "Loading . . . "}
				</Button>
			</form>
		</Form>
	);
};

export default LoginForm;
