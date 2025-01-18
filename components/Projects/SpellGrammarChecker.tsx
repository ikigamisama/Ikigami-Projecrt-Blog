"use client";
import { jetbrainsMono, roboto_mono, space_mono } from "@/lib/font";
import { spellingAndGrammarSchema } from "@/lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

const SpellGrammarChecker = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [result, setResult] = useState<any>(null);

	const form = useForm<z.infer<typeof spellingAndGrammarSchema>>({
		resolver: zodResolver(spellingAndGrammarSchema),
		defaultValues: {
			text: "",
		},
	});

	async function onSubmit(values: z.infer<typeof spellingAndGrammarSchema>) {
		setIsLoading(true);
		try {
			const response = await fetch("/api/proxy", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					url: "/nlp/grammar-spelling-checker",
					text: values.text,
				}),
			});

			const data = await response.json();
			setResult(data);
		} catch (error) {
			console.error("Error:", error);
			alert("Error submitting the loan application. Please try again.");
		} finally {
			setIsLoading(false);
		}
	}
	return (
		<section className='flex flex-col min-h-[calc(90vh-30px)] w-full items-center justify-center px-4'>
			<div className='container mx-auto'>
				<h1
					className={`text-2xl sm:text-4xl font-bold mb-12 ${space_mono.className}`}>
					Spelling and Grammar Checker
				</h1>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name='text'
							render={({ field }) => (
								<FormItem>
									<FormLabel
										htmlFor='description'
										className={`startup-form_label ${jetbrainsMono.className}`}>
										Text
									</FormLabel>
									<FormControl>
										<Textarea
											rows={5}
											id='description'
											placeholder='Enter text . . . .'
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
							className='startup-form_btn text-white my-8'
							disabled={isLoading == true ? true : false}>
							<Send className='!size-6` mr-2' /> Fix Spelling and Grammar
						</Button>
					</form>
				</Form>
				{/* Display the results */}
				{result && (
					<div className='my-8 p-4 border rounded-lg bg-gray-100'>
						<h2 className={`text-xl font-bold mb-4 ${space_mono.className}`}>
							Text Analysis Results
						</h2>
						<p>
							<strong>Corrected Text:</strong>
							<br /> {result.corrected_text}
						</p>

						<p>
							<strong>Grammar Errors:</strong>
						</p>
						<ul>
							{result.grammar_errors.map((error: string, index: number) => (
								<li key={index}>{error}</li>
							))}
						</ul>
						<p>
							<strong>Spelling Errors:</strong>
						</p>
						<ul>
							{result.spelling_errors.map((error: string, index: number) => (
								<li key={index}>{error}</li>
							))}
						</ul>
						<p>
							<strong>Statistics:</strong>
						</p>
						<ul>
							<li>Word Count: {result.statistics.word_count}</li>
							<li>Sentence Count: {result.statistics.sentence_count}</li>
							<li>
								Average Word Length:
								{result.statistics.average_word_length.toFixed(2)}
							</li>
						</ul>
					</div>
				)}
			</div>
		</section>
	);
};

export default SpellGrammarChecker;
