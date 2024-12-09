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
import { AuthorData } from "@/lib/type";
import { handleEditAuthor } from "@/app/edit/actions";
import { useToast } from "@/hooks/use-toast";

const EditProfile = ({ user }: { user: AuthorData }) => {
	const { toast } = useToast();

	const [isLoadingUserEdit, setIsLoadingUserEdit] = useState<boolean>(false);

	const formUserEdit = useForm<z.infer<typeof editUserInfoSchema>>({
		resolver: zodResolver(editUserInfoSchema),
		defaultValues: {
			first_name: user.first_name || "",
			last_name: user.last_name || "",
			username: user.username || "",
			email: user.email || "",
			bio: user.bio || "",
		},
	});

	async function onSubmitUserInfo(values: z.infer<typeof editUserInfoSchema>) {
		setIsLoadingUserEdit(true);
		const result = await handleEditAuthor(values);

		if (result.error) {
			toast({
				title: "Error !!",
				description: result.message,
				variant: "destructive",
			});
		} else {
			toast({
				title: "Success",
				description: result?.message,
			});
		}

		setIsLoadingUserEdit(false);
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

					<Button
						type='submit'
						className='mt-8 startup-form_btn text-white'
						disabled={isLoadingUserEdit}>
						{isLoadingUserEdit == true ? "Loading . . ." : "Edit"}
					</Button>
				</form>
			</Form>
		</section>
	);
};

export default EditProfile;
