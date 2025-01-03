"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

import { formSchema } from "@/lib/formSchema";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Send } from "lucide-react";
import MultipleSelector from "./ui/multiple-selector";
import { categoryOption } from "@/lib/data";
import { jetbrainsMono, roboto_mono } from "@/lib/font";
import { useTheme } from "next-themes";
import { useState } from "react";
import { handleCreatePostBlog } from "@/app/posts/actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { convertToSlug } from "@/lib/string";

const PostForm = () => {
	const router = useRouter();
	const { theme } = useTheme();
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: "",
			category: "",
			imgLink: "",
			content: "",
		},
	});
	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true);
		const result = await handleCreatePostBlog(values);

		if (result?.error) {
			toast({
				title: "Error on Post Submit",
				description: result.message,
				variant: "destructive",
			});
		} else {
			toast({
				title: "Success",
				description: result?.message,
			});

			router.push(`/posts/${convertToSlug(result?.data.title)}`);
		}

		setIsLoading(false);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='startup-form'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel
								htmlFor='title'
								className={`startup-form_label ${jetbrainsMono.className}`}>
								Title
							</FormLabel>
							<FormControl>
								<Input
									id='title'
									placeholder='Project Blog'
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
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel
								htmlFor='description'
								className={`startup-form_label ${jetbrainsMono.className}`}>
								Description
							</FormLabel>
							<FormControl>
								<Textarea
									rows={5}
									id='description'
									placeholder='Project Blog Description'
									className={`startup-form_textarea ${roboto_mono.className}`}
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='category'
					render={({ field }) => (
						<FormItem>
							<FormLabel
								htmlFor='category'
								className={`startup-form_label ${jetbrainsMono.className}`}>
								Category
							</FormLabel>
							<FormControl>
								<MultipleSelector
									id='category'
									value={
										field.value
											? field.value
													.split(", ")
													.map((val) => ({ label: val, value: val }))
											: []
									}
									onChange={(selectedOptions) =>
										field.onChange(
											selectedOptions.map((opt) => opt.value).join(", "),
										)
									}
									className={`startup-form_select ${roboto_mono.className}`}
									badgeClassName='py-2 text-white gap-1'
									defaultOptions={categoryOption}
									placeholder='Select Category you like...'
									emptyIndicator={
										<p className='text-center text-lg leading-10 text-gray-600 dark:text-gray-400'>
											no results found.
										</p>
									}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='imgLink'
					render={({ field }) => (
						<FormItem>
							<FormLabel
								htmlFor='imgLink'
								className={`startup-form_label ${jetbrainsMono.className}`}>
								Image URL
							</FormLabel>
							<FormControl>
								<Input
									id='imgLink'
									placeholder='Paste a link to your Blog'
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
					name='content'
					render={({ field }) => (
						<FormItem>
							<FormLabel
								htmlFor='content'
								className={`startup-form_label ${jetbrainsMono.className}`}>
								Content
							</FormLabel>
							<FormControl data-color-mode='light'>
								<MDEditor
									{...field}
									id='content'
									preview='live'
									height={300}
									className='overflow-hidden border-r-full border-[3px] border-black max-w-none prose prose-headings:mt-8 prose-headings:font-bold prose-headings:text-black prose-h1:text-[35px] prose-h2:text-[32px] prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-p:text-[1.25rem] prose-code:text-[#111827] prose-li:text-[1.25rem] prose-pre:bg-white-100 dark:prose-headings:text-white'
									textareaProps={{
										placeholder: "Share youe idea here . . . ",
									}}
									previewOptions={{
										rehypePlugins: [[rehypeSanitize]],
									}}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type='submit'
					className='startup-form_btn text-white'
					disabled={isLoading == true ? true : false}>
					<Send className='!size-6` mr-2' /> Submit
				</Button>
			</form>
		</Form>
	);
};

export default PostForm;
