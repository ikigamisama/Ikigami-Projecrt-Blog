"use client";
import { jetbrainsMono, roboto_mono, space_mono } from "@/lib/font";
import { loanApprovalPredictionSchema } from "@/lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Send } from "lucide-react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

const LoanApplication = () => {
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const form = useForm<z.infer<typeof loanApprovalPredictionSchema>>({
		resolver: zodResolver(loanApprovalPredictionSchema),
		defaultValues: {
			person_age: 18,
			person_gender: "male",
			person_education: "Bachelor",
			person_income: 0,
			person_emp_exp: 0,
			person_home_ownership: "OWN",
			loan_amnt: 1000,
			loan_intent: "DEBTCONSOLIDATION",
			loan_int_rate: 0,
			loan_percent_income: 0,
			cb_person_cred_hist_length: 0,
			credit_score: 350,
			previous_loan_defaults_on_file: "Yes",
		},
	});

	async function onSubmit(
		values: z.infer<typeof loanApprovalPredictionSchema>,
	) {
		setIsLoading(true);

		try {
			const response = await fetch("/api/proxy", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					url: "/predict/loan-application/",
					person_age: values.person_age,
					person_gender: values.person_gender,
					person_education: values.person_education,
					person_income: values.person_income,
					person_emp_exp: values.person_emp_exp,
					person_home_ownership: values.person_home_ownership,
					loan_amnt: values.loan_amnt,
					loan_intent: values.loan_intent,
					loan_int_rate: values.loan_int_rate,
					loan_percent_income: values.loan_percent_income / 100,
					cb_person_cred_hist_length: values.cb_person_cred_hist_length,
					credit_score: values.credit_score,
					previous_loan_defaults_on_file: values.previous_loan_defaults_on_file,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Failed to get prediction");
			}

			toast({
				className:
					data.loan_approved == "True"
						? "border-l-4 border-green-500 bg-white text-black"
						: "border-l-4 border-red-500 bg-white text-black",
				title: data.loan_approved == "True" ? "Success!!" : "Reject!!",
				description:
					data.loan_approved == "True" ? "Loan Approved!!" : "Loan Rejected!!",
				variant: data.loan_approved == "True" ? null : "destructive",
			});
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
					className={`text-2xl sm:text-4xl font-bold ${space_mono.className}`}>
					Loan Approval Prediction
				</h1>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='project-form !mt-16'>
						<FormField
							control={form.control}
							name='person_age'
							render={({ field }) => (
								<FormItem className='space-y-6'>
									<FormLabel
										htmlFor='person_age'
										className={`startup-form_label ${jetbrainsMono.className}`}>
										Age
									</FormLabel>
									<FormControl>
										<Slider
											min={18}
											max={70}
											step={1}
											value={[field.value]}
											onValueChange={(value) => {
												field.onChange(value[0]);
											}}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='person_gender'
							render={({ field }) => (
								<FormItem className='space-y-6'>
									<FormLabel
										htmlFor='person_gender'
										className={`startup-form_label ${jetbrainsMono.className}`}>
										Gender
									</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange} {...field}>
											<SelectTrigger
												className={`startup-form_select ${roboto_mono.className}`}>
												<SelectValue placeholder='Select Gender' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='male'>Male</SelectItem>
												<SelectItem value='female'>Female</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='person_education'
							render={({ field }) => (
								<FormItem className='space-y-6'>
									<FormLabel
										htmlFor='person_education'
										className={`startup-form_label ${jetbrainsMono.className}`}>
										Education
									</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange} {...field}>
											<SelectTrigger
												className={`startup-form_select ${roboto_mono.className}`}>
												<SelectValue placeholder='Select Education' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='Bachelor'>Bachelor</SelectItem>
												<SelectItem value='Master'>Master</SelectItem>
												<SelectItem value='PhD'>PhD</SelectItem>
												<SelectItem value='High School'>High School</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='person_income'
							render={({ field }) => (
								<FormItem className='space-y-6'>
									<FormLabel
										htmlFor='person_income'
										className={`startup-form_label ${jetbrainsMono.className}`}>
										Income
									</FormLabel>
									<FormControl>
										<Input
											type='number'
											id='person_income'
											placeholder='Income'
											className={`startup-form_input ${roboto_mono.className}`}
											{...field}
											onChange={(e) => field.onChange(Number(e.target.value))}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='person_emp_exp'
							render={({ field }) => (
								<FormItem className='space-y-6'>
									<FormLabel
										htmlFor='person_emp_exp'
										className={`startup-form_label ${jetbrainsMono.className}`}>
										Employee Experience
									</FormLabel>
									<FormControl>
										<Slider
											min={0}
											max={50}
											step={1}
											value={[field.value]}
											onValueChange={(value) => {
												field.onChange(value[0]);
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='person_home_ownership'
							render={({ field }) => (
								<FormItem className='space-y-6'>
									<FormLabel
										htmlFor='person_home_ownership'
										className={`startup-form_label ${jetbrainsMono.className}`}>
										Home Ownership
									</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange} {...field}>
											<SelectTrigger
												className={`startup-form_select ${roboto_mono.className}`}>
												<SelectValue placeholder='Select Education' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='OWN'>Own</SelectItem>
												<SelectItem value='RENT'>Rent</SelectItem>
												<SelectItem value='MORTGAGE'>Mortgage</SelectItem>
												<SelectItem value='OTHER'>Other</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='loan_amnt'
							render={({ field }) => (
								<FormItem className='space-y-6'>
									<FormLabel
										htmlFor='loan_amnt'
										className={`startup-form_label ${jetbrainsMono.className}`}>
										Loan Amount
									</FormLabel>
									<FormControl>
										<Input
											type='number'
											id='loan_amnt'
											placeholder='Loan Amount'
											className={`startup-form_input ${roboto_mono.className}`}
											{...field}
											onChange={(e) => field.onChange(Number(e.target.value))}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='loan_intent'
							render={({ field }) => (
								<FormItem className='space-y-6'>
									<FormLabel
										htmlFor='loan_intent'
										className={`startup-form_label ${jetbrainsMono.className}`}>
										Loan Intent
									</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange} {...field}>
											<SelectTrigger
												className={`startup-form_select ${roboto_mono.className}`}>
												<SelectValue placeholder='Select Education' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='DEBTCONSOLIDATION'>
													Debt Consolidation
												</SelectItem>
												<SelectItem value='HOMEIMPROVEMENT'>
													Home Improvement
												</SelectItem>
												<SelectItem value='EDUCATION'>Education</SelectItem>
												<SelectItem value='MEDICAL'>Medical</SelectItem>
												<SelectItem value='VENTURE'>Venture</SelectItem>
												<SelectItem value='PERSONAL'>Personal</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='loan_int_rate'
							render={({ field }) => (
								<FormItem className='space-y-6'>
									<FormLabel
										htmlFor='loan_int_rate'
										className={`startup-form_label ${jetbrainsMono.className}`}>
										Loan Interest Rate (%)
									</FormLabel>
									<FormControl>
										<Slider
											min={0}
											max={100}
											step={1}
											value={[field.value]}
											onValueChange={(value) => {
												field.onChange(value[0]);
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='loan_percent_income'
							render={({ field }) => (
								<FormItem className='space-y-6'>
									<FormLabel
										htmlFor='loan_percent_income'
										className={`startup-form_label ${jetbrainsMono.className}`}>
										Loan Percent Income (%):
									</FormLabel>
									<FormControl>
										<Slider
											min={0}
											max={100}
											step={1}
											value={[field.value]}
											onValueChange={(value) => {
												field.onChange(value[0]);
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='cb_person_cred_hist_length'
							render={({ field }) => (
								<FormItem className='space-y-6'>
									<FormLabel
										htmlFor='cb_person_cred_hist_length'
										className={`startup-form_label ${jetbrainsMono.className}`}>
										Credit History Length (Years):
									</FormLabel>
									<FormControl>
										<Slider
											min={0}
											max={50}
											step={1}
											value={[field.value]}
											onValueChange={(value) => {
												field.onChange(value[0]);
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='credit_score'
							render={({ field }) => (
								<FormItem className='space-y-6'>
									<FormLabel
										htmlFor='credit_score'
										className={`startup-form_label ${jetbrainsMono.className}`}>
										Credit Score:
									</FormLabel>
									<FormControl>
										<Slider
											min={350}
											max={850}
											step={1}
											value={[field.value]}
											onValueChange={(value) => {
												field.onChange(value[0]);
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='previous_loan_defaults_on_file'
							render={({ field }) => (
								<FormItem className='space-y-6'>
									<FormLabel
										htmlFor='previous_loan_defaults_on_file'
										className={`startup-form_label ${jetbrainsMono.className}`}>
										Previous Loan Defaults:
									</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange} {...field}>
											<SelectTrigger
												className={`startup-form_select ${roboto_mono.className}`}>
												<SelectValue placeholder='' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='Yes'>Yes</SelectItem>
												<SelectItem value='No'>No</SelectItem>
											</SelectContent>
										</Select>
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
			</div>
		</section>
	);
};

export default LoanApplication;
