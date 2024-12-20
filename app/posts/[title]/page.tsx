import Image from "next/image";
import Link from "next/link";
import { jetbrainsMono } from "@/lib/font";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import EditPostButton from "@/components/EditPostButton";
import { getPostData, ifSignInUser } from "@/lib/models/data";
import dayjs from "dayjs";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { convertToSlug } from "@/lib/string";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TableContents from "@/components/TableContents";

type Props = {
	params: Promise<{ title: string }>;
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const cookieStore = await cookies();
	const supabase = createClient(cookieStore);
	const { data, error } = await getPostData((await params).title, supabase);

	if (error || !data) {
		console.error("Error fetching post data:", error);
		return {
			title: "Post Not Found",
			description: "The requested post could not be found.",
		};
	}

	return {
		title: `${data.title} | Iki's Project Blog`,
		description: data.description,
		authors: [
			{
				name: `${data.Author?.first_name} ${data.Author?.last_name}`,
				url: data.Author?.avatar_url ?? undefined,
			},
		],
		openGraph: {
			title: `${data.title} | Iki's Project Blog`,
			description: data.description,
			images: [data.image_link ?? "/default-og-image.jpg"],
		},
	};
}

const Posts = async ({ params, searchParams }: Props) => {
	const { title } = await params;
	const cookieStore = await cookies();
	const supabase = createClient(cookieStore);
	const { data, error } = await getPostData(title, supabase);
	const { user } = await ifSignInUser(supabase);
	const dateOnly = dayjs(data?.created_at).format("MMMM DD, YYYY");
	const categoryGroup = data?.category.split(", ");

	const avatar_fallback = `${data?.Author?.first_name[0]}${data?.Author?.last_name[0]}`;

	if (!data || error) {
		return notFound();
	}
	return (
		<>
			<section className='post_header_container min-h-[450px] mb-8'>
				<p className='tag'>{dateOnly}</p>

				<h1 className='heading'>{data.title}</h1>
				<p className='sub-heading !max-w-5xl'>{data.description}</p>
			</section>

			<section className='section-container'>
				{data.image_link && (
					<Image
						src={data.image_link}
						width={1000}
						height={100}
						alt='thumbnail'
						className='w-full h-auto rounded-xl'
					/>
				)}

				<div className='flex items-center justify-between flex-col xl:flex-row gap-5 my-8'>
					<Link href={`/author/`} className='flex gap-2 items-center mb-3'>
						<Avatar className='w-[70px] h-[70px] flex items-center'>
							{data?.Author?.avatar_url === null ? (
								<AvatarFallback className='bg-primary text-white text-5xl'>
									{avatar_fallback}
								</AvatarFallback>
							) : (
								<AvatarImage
									src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data?.Author?.avatar_url}`}
									alt={avatar_fallback}
									className='object-cover'
								/>
							)}
						</Avatar>

						<div className='ml-2'>
							<p className={`text-20-bold mb-1 ${jetbrainsMono.className}`}>
								{`${data?.Author?.first_name} ${data?.Author?.last_name}`}
							</p>
							<p
								className={`text-16-medium !text-black-300 ${jetbrainsMono.className}`}>
								@{data?.Author?.username}
							</p>
						</div>
					</Link>

					<div className='flex flex-row gap-2'>
						{categoryGroup?.map((item: any, i: number) => (
							<p
								key={i}
								className={`category-tag ${
									jetbrainsMono.className
								} ${convertToSlug(item)}`}>
								{item}
							</p>
						))}
					</div>
				</div>

				<div className='relative flex flex-col xl:flex-row gap-8'>
					<MarkdownRenderer content={data.content} />
					<TableContents />
				</div>
				{user != null && <EditPostButton blog_id={data.id} />}
			</section>
		</>
	);
};

export default Posts;
