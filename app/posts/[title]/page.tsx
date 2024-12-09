import Image from "next/image";
import profile_icon from "@/assets/profile_icon.png";
import Link from "next/link";
import { jetbrainsMono } from "@/lib/font";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import EditPostButton from "@/components/EditPostButton";
import { getPostData } from "@/lib/models/data";
import dayjs from "dayjs";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { convertToSlug } from "@/lib/string";

const Posts = async ({ params }: { params: Promise<{ title: string }> }) => {
	const { title } = await params;
	const cookieStore = await cookies();
	const supabase = createClient(cookieStore);
	const data = await getPostData(title, supabase);
	const dateOnly = dayjs(data.created_at).format("MMMM DD, YYYY");
	const categoryGroup = data.category.split(", ");

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

				<div className='flex-between gap-5 my-8'>
					<Link href={`/author/`} className='flex gap-2 items-center mb-3'>
						<Image
							src={profile_icon}
							alt='avatar'
							width={72}
							height={72}
							className='rounded-full drop-shadow-lg mr-2'
						/>

						<div>
							<p className={`text-20-bold ${jetbrainsMono.className}`}>
								{`${data.Author.first_name} ${data.Author.last_name}`}
							</p>
							<p
								className={`text-16-medium !text-black-300 ${jetbrainsMono.className}`}>
								@{data.Author.username}
							</p>
						</div>
					</Link>

					<div className='flex flex-row gap-2'>
						{categoryGroup.map((item: any, i: number) => (
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

				<MarkdownRenderer content={data.content} />

				<hr className='divider' />

				<EditPostButton blog_id={data.id} />
			</section>
		</>
	);
};

export default Posts;
