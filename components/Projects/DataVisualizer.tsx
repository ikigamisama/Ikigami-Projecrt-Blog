"use client";

import { jetbrainsMono, roboto_mono, space_mono } from "@/lib/font";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { useState } from "react";
import { dataVisualizerSchema } from "@/lib/formSchema";
import { Button } from "../ui/button";
import { FaUpload } from "react-icons/fa6";
import { TableDataVisualizer } from "@/lib/type";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { RiAiGenerate } from "react-icons/ri";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const DataVisualizer = () => {
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [file, setFile] = useState<string | null>(null);
	const [table, setTable] = useState<TableDataVisualizer | null>(null);
	const [plot, setPlot] = useState<string>("");

	const form = useForm<z.infer<typeof dataVisualizerSchema>>({
		resolver: zodResolver(dataVisualizerSchema),
		defaultValues: {
			xAxis: "",
			yAxis: "",
			plotType: "",
		},
	});

	const handleUploadCSV = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		try {
			if (!event.target.files || event.target.files.length === 0) {
				throw new Error("Must a .csv file");
			}
			const formData = new FormData();
			const file = event.target.files[0];
			formData.append("file", file);

			setFile(file.name);

			const response = await fetch("/api/file", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				const errorData = await response.json();
				console.error("Upload failed:", errorData);
				alert("Error uploading file. Please try again.");
				return;
			}

			const fileData = await response.json();
			setTable(fileData);
		} catch (error) {
			alert("Error uploading csv!");
		}
	};

	async function onSubmit(values: z.infer<typeof dataVisualizerSchema>) {
		setIsLoading(true);

		if (values.xAxis == "" || values.yAxis == "" || values.plotType == "") {
			toast({
				title: "Missing Values",
				description: "Please Fill up the missing values",
				variant: "destructive",
			});
		} else {
			try {
				const response = await fetch("/api/proxy", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						url: "/visualization/data-chart/",
						xAxis: values.xAxis,
						yAxis: values.yAxis,
						plotType: values.plotType,
						data: table?.data,
					}),
				});
				const data = await response.json();
				setPlot(`data:image/png;base64,${data.image}`);
			} catch (error) {
				console.error("Error:", error);
				alert("Error submitting the loan application. Please try again.");
			} finally {
				setIsLoading(false);
			}
		}
	}

	return (
		<section className='flex flex-col min-h-[calc(90vh-30px)] w-full items-center justify-center px-4'>
			<div className='container mx-auto'>
				<h1
					className={`text-2xl sm:text-4xl font-bold my-16 ${space_mono.className}`}>
					Data Visualizer
				</h1>

				<div className='flex flex-row w-full items-center gap-2 mb-10'>
					<input
						type='file'
						accept='.csv'
						id='file-upload'
						className='hidden'
						onChange={handleUploadCSV}
					/>
					<Button
						className={`text-white hover:bg-cyan-400 p-6`}
						onClick={() => document.getElementById("file-upload")?.click()}>
						<FaUpload /> Upload CSV File
					</Button>

					<p className={`ml-4 font-bold ${jetbrainsMono.className}`}>
						{file == null ? "Select a file" : file}
					</p>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='!my-16'>
						<div className='grid grid-cols-3 gap-6'>
							<FormField
								control={form.control}
								name='xAxis'
								render={({ field }) => (
									<FormItem className='space-y-6'>
										<FormLabel
											htmlFor='xAxis'
											className={`startup-form_label ${jetbrainsMono.className}`}>
											X-Axis
										</FormLabel>
										<FormControl>
											<Select onValueChange={field.onChange} {...field}>
												<SelectTrigger
													className={`startup-form_select ${roboto_mono.className}`}>
													<SelectValue placeholder='Select X-Axis' />
												</SelectTrigger>
												<SelectContent>
													{table != null &&
														table.columns.map((c, i) => (
															<SelectItem value={c} key={i}>
																{c}
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
								name='yAxis'
								render={({ field }) => (
									<FormItem className='space-y-6'>
										<FormLabel
											htmlFor='yAxis'
											className={`startup-form_label ${jetbrainsMono.className}`}>
											Y-Axis
										</FormLabel>
										<FormControl>
											<Select onValueChange={field.onChange} {...field}>
												<SelectTrigger
													className={`startup-form_select ${roboto_mono.className}`}>
													<SelectValue placeholder='Select Y-Axis' />
												</SelectTrigger>
												<SelectContent>
													{table != null &&
														table.columns.map((c, i) => (
															<SelectItem value={c} key={i}>
																{c}
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
								name='plotType'
								render={({ field }) => (
									<FormItem className='space-y-6'>
										<FormLabel
											htmlFor='plotType'
											className={`startup-form_label ${jetbrainsMono.className}`}>
											Plot Type
										</FormLabel>
										<FormControl>
											<Select onValueChange={field.onChange} {...field}>
												<SelectTrigger
													className={`startup-form_select ${roboto_mono.className}`}>
													<SelectValue placeholder='Select Plot' />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value='Scatter Plot'>
														Scatter Plot
													</SelectItem>
													<SelectItem value='Line Plot'>Line Plot</SelectItem>
													<SelectItem value='Bar Plot'>Bar Plot</SelectItem>
													<SelectItem value='Distribution Plot'>
														Distribution Plot
													</SelectItem>
													<SelectItem value='Count Plot'>Count Plot</SelectItem>
													<SelectItem value='Heatmap'>Heatmap</SelectItem>
													<SelectItem value='Box Plot'>Box Plot</SelectItem>
													<SelectItem value='Violin Plot'>
														Violin Plot
													</SelectItem>
													<SelectItem value='Swarm Plot'>Swarm Plot</SelectItem>
													<SelectItem value='Joint Plot'>Joint Plot</SelectItem>
													<SelectItem value='Pair Plot'>Violin Plot</SelectItem>
													<SelectItem value='Hexbin Plot'>
														Hexbin Plot
													</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button
							type='submit'
							className='startup-form_btn text-white w-full mt-8'
							disabled={
								isLoading == true ? true : false || table == null ? true : false
							}>
							<RiAiGenerate className='!size-6` mr-2' /> Generate Plot
						</Button>
					</form>
				</Form>

				{table != null && (
					<div className='max-h-[500px] overflow-hidden mb-16 border border-gray-200 rounded-md'>
						{/* Sticky Header */}
						<div className='overflow-hidden'>
							<Table className='w-full table-fixed'>
								<TableHeader className='sticky top-0 z-[50] bg-white'>
									<TableRow>
										{table.columns.map((columns, index) => (
											<TableHead
												key={index}
												className={`py-2 ${index === 0 ? "" : "px-0"}`}>
												{columns}
											</TableHead>
										))}
									</TableRow>
								</TableHeader>
							</Table>
						</div>

						<div className='max-h-[300px] overflow-y-auto'>
							<Table className='w-full table-fixed'>
								<TableBody>
									{table.data.map((row, rowIndex) => (
										<TableRow key={rowIndex}>
											{table.columns.map((column: any, colIndex) => (
												<TableCell key={colIndex} className='px-2 py-2'>
													{row[column]}
												</TableCell>
											))}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</div>
				)}

				{plot != "" && (
					<div className='my-4'>
						<Image
							className='w-full'
							src={plot}
							alt='Generated Chart'
							width={1200}
							height={1200}
							unoptimized
						/>
					</div>
				)}
			</div>
		</section>
	);
};

export default DataVisualizer;
