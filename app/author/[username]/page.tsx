import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import BlogItem from "@/components/BlogItem";
import { notFound } from "next/navigation";
import { getAuthorPostList } from "@/lib/models/data";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
	params: Promise<{ username: string }>;
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const cookieStore = await cookies();
	const supabase = createClient(cookieStore);
	const { data } = await getAuthorPostList(
		(await params).username.replace("%40", ""),
		supabase,
	);

	return {
		title: `@${data?.username} | Iki's Project Blog`,
		description: data?.bio,
		openGraph: {
			title: `@${data?.username} | Iki's Project Blog`,
			description: data?.bio,
			images: [
				data?.avatar_url ?? "/default-og-image.jpg", // Fallback image if none provided
			],
		},
	};
}

const Author = async ({ params, searchParams }: Props) => {
	const { username } = await params;
	const cookieStore = await cookies();
	const supabase = createClient(cookieStore);

	const { data: authorData, error: errorAuthorData } = await getAuthorPostList(
		username.replace("%40", ""),
		supabase,
	);

	if (!authorData || errorAuthorData || !username.includes("%40")) {
		return notFound();
	}

	const { data: postData } = await supabase
		.from("Posts")
		.select(`*,Author(id,username,first_name,last_name)`)
		.eq("author_id", authorData.id);

	return (
		<section className='profile_container'>
			<div className='profile_card'>
				<div className='profile_title'>
					<h3 className='text-24-black uppercase text-center line-clamp-1'>
						{authorData.first_name} {authorData.last_name}
					</h3>
				</div>

				<Image
					src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${authorData.avatar_url}`}
					alt=''
					width={100}
					height={100}
					className='profile_image w-[200px] h-[200px]'
				/>

				<p className='text-30-extrabold mt-7 text-center'>
					@{authorData.username}
				</p>
				<p className='mt-1 tag text-center'> {authorData.bio}</p>
			</div>

			<div className='flex-1 flex flex-col gap-5 lg:-mt-5 min-h-[700px]'>
				<p className='text-30-bold'>All Blog</p>
				<ul className='card_grid-sm'>
					{postData == null ? (
						<p>Loading . . .</p>
					) : (
						postData.map((data, i) => <BlogItem info={data} key={i} />)
					)}
				</ul>
			</div>
		</section>
	);
};

export default Author;
