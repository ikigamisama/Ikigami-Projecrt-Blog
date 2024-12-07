"use client";

import { editUserInfoSchema, editPasswordInfoSchema } from "@/lib/formSchema";
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
import { Textarea } from "./ui/textarea";

const EditProfile = () => {
	const [showCurrentPassword, setShowCurrentPassword] =
		useState<boolean>(false);
	const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
	const [showNewConfirmPassword, setShowNewConfirmPassword] =
		useState<boolean>(false);

	const formUserEdit = useForm<z.infer<typeof editUserInfoSchema>>({
		resolver: zodResolver(editUserInfoSchema),
		defaultValues: {
			first_name: "",
			last_name: "",
			username: "",
			email: "",
			bio: "",
		},
	});

	const formPasswordEdit = useForm<z.infer<typeof editPasswordInfoSchema>>({
		resolver: zodResolver(editPasswordInfoSchema),
		defaultValues: {
			current_password: "",
			new_password: "",
			confirm_new_password: "",
		},
	});

	function onSubmitUserInfo(values: z.infer<typeof editUserInfoSchema>) {
		console.log(values);
	}

	function onSubmitPassInfo(values: z.infer<typeof editPasswordInfoSchema>) {
		console.log(values);
	}

	return (
		<section className='flex flex-col gap-8'>
			<Form {...formUserEdit}>
				<form
					onSubmit={formUserEdit.handleSubmit(onSubmitUserInfo)}
					className='gap-4 flex flex-col'>
					<div className='flex flex-row gap-4'>
						<div className='flex-1'>
							<FormField
								control={formUserEdit.control}
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
						</div>
						<div className='flex-1'>
							<FormField
								control={formUserEdit.control}
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
						</div>
					</div>

					<FormField
						control={formUserEdit.control}
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
						control={formUserEdit.control}
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
						control={formUserEdit.control}
						name='bio'
						render={({ field }) => (
							<FormItem>
								<FormLabel
									htmlFor='bio'
									className={`startup-form_label ${jetbrainsMono.className}`}>
									Bio
								</FormLabel>
								<FormControl>
									<Textarea
										rows={5}
										id='bio'
										placeholder='Profile Bio'
										className={`startup-form_textarea ${roboto_mono.className}`}
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type='submit' className='mt-8 startup-form_btn text-white'>
						Edit
					</Button>
				</form>
			</Form>
			<Form {...formPasswordEdit}>
				<form
					onSubmit={formPasswordEdit.handleSubmit(onSubmitPassInfo)}
					className='gap-4 flex flex-col'>
					<FormField
						control={formPasswordEdit.control}
						name='current_password'
						render={({ field }) => (
							<FormItem>
								<FormLabel
									htmlFor='password'
									className={`startup-form_label ${jetbrainsMono.className}`}>
									Current Password
								</FormLabel>
								<FormControl>
									<div className='relative'>
										<Input
											type={showCurrentPassword ? "text" : "password"}
											id='current_password'
											placeholder='Enter Current Password'
											className={`startup-form_input ${roboto_mono.className}`}
											{...field}
										/>
										<Button
											type='button'
											variant='ghost'
											onClick={() =>
												setShowCurrentPassword(!showCurrentPassword)
											}
											className='absolute right-[3px] top-0 h-full px-4 py-2 hover:bg-transparent'
											aria-label={
												showCurrentPassword ? "Hide password" : "Show password"
											}>
											{showCurrentPassword ? (
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
						control={formPasswordEdit.control}
						name='new_password'
						render={({ field }) => (
							<FormItem>
								<FormLabel
									htmlFor='new_password'
									className={`startup-form_label ${jetbrainsMono.className}`}>
									New Password
								</FormLabel>
								<FormControl>
									<div className='relative'>
										<Input
											type={showNewPassword ? "text" : "password"}
											id='new_password'
											placeholder='Enter New Current Password'
											className={`startup-form_input ${roboto_mono.className}`}
											{...field}
										/>
										<Button
											type='button'
											variant='ghost'
											onClick={() => setShowNewPassword(!showNewPassword)}
											className='absolute right-[3px] top-0 h-full px-4 py-2 hover:bg-transparent'
											aria-label={
												showNewPassword ? "Hide password" : "Show password"
											}>
											{showNewPassword ? (
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
						control={formPasswordEdit.control}
						name='confirm_new_password'
						render={({ field }) => (
							<FormItem>
								<FormLabel
									htmlFor='confirm_new_password'
									className={`startup-form_label ${jetbrainsMono.className}`}>
									Confirm New Password
								</FormLabel>
								<FormControl>
									<div className='relative'>
										<Input
											type={showNewConfirmPassword ? "text" : "password"}
											id='confirm_new_password'
											placeholder='Enter New Password Confirmation'
											className={`startup-form_input ${roboto_mono.className}`}
											{...field}
										/>
										<Button
											type='button'
											variant='ghost'
											onClick={() =>
												setShowNewConfirmPassword(!showNewConfirmPassword)
											}
											className='absolute right-[3px] top-0 h-full px-4 py-2 hover:bg-transparent'
											aria-label={
												showNewConfirmPassword
													? "Hide password"
													: "Show password"
											}>
											{showNewConfirmPassword ? (
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

					<Button type='submit' className='mt-8 startup-form_btn text-white'>
						Change Password
					</Button>
				</form>
			</Form>
		</section>
	);
};

export default EditProfile;
