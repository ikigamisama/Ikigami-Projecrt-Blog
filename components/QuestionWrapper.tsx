"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { quizTypeSchema } from "@/lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { jetbrainsMono, roboto_mono } from "@/lib/font";
import { questionCategoryChoice, questionNumChoice } from "@/lib/data";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

type QuestionWrapperProps = {
	setCategory: (category: string, question_num: string) => void;
};

const QuestionWrapper = ({ setCategory }: QuestionWrapperProps) => {
	const form = useForm<z.infer<typeof quizTypeSchema>>({
		resolver: zodResolver(quizTypeSchema),
		defaultValues: {
			category: "",
			question_num: "",
		},
	});

	async function onSubmit(values: z.infer<typeof quizTypeSchema>) {
		setCategory(values.category, values.question_num);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 my-16'>
				<FormField
					control={form.control}
					name='category'
					render={({ field }) => (
						<FormItem className='space-y-6'>
							<FormLabel
								htmlFor='person_gender'
								className={`startup-form_label ${jetbrainsMono.className}`}>
								Category
							</FormLabel>
							<FormControl>
								<Select onValueChange={field.onChange} {...field}>
									<SelectTrigger
										className={`startup-form_select ${roboto_mono.className}`}>
										<SelectValue placeholder='Select Category' />
									</SelectTrigger>
									<SelectContent>
										{questionCategoryChoice.map((item, i) => (
											<SelectItem value={item.value} key={i}>
												{item.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='question_num'
					render={({ field }) => (
						<FormItem className='space-y-6'>
							<FormLabel
								htmlFor='person_gender'
								className={`startup-form_label ${jetbrainsMono.className}`}>
								Number of Question
							</FormLabel>
							<FormControl>
								<Select onValueChange={field.onChange} {...field}>
									<SelectTrigger
										className={`startup-form_select ${roboto_mono.className}`}>
										<SelectValue placeholder='Select the number of question' />
									</SelectTrigger>
									<SelectContent>
										{questionNumChoice.map((item, i) => (
											<SelectItem value={item.value} key={i}>
												{item.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit' className='startup-form_btn text-white'>
					<Send className='!size-6` mr-2' /> Take the Exam
				</Button>
			</form>
		</Form>
	);
};

export default QuestionWrapper;
