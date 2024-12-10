import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { PostsListData } from "@/lib/type";
import { jetbrainsMono, roboto_mono, space_mono } from "@/lib/font";
import dayjs from "dayjs";
import profile_icon from "@/assets/profile_icon.png";
import { convertToSlug } from "@/lib/string";

const BlogItem = ({ info }: { info: PostsListData }) => {
	const dateOnly = dayjs(info.created_at).format("MMMM DD, YYYY");
	return (
		<li className='startup-card group'>
			<div className='flex-between'>
				<p className={`startup-card_date ${roboto_mono.className}`}>
					{dateOnly}
				</p>
				<div className='flex gap-1.5'>
					<EyeIcon className='size-6 text-primary' />
					<span
						className={`text-[16px] text-black font-bold ${roboto_mono.className}`}>
						0
					</span>
				</div>
			</div>

			<div className='flex-between mt-5 gap-5'>
				<div className='flex-1'>
					<Link href={`/author/@${info?.Author?.username}`}>
						<p
							className={`text-16-medium line-clamp-1 ${jetbrainsMono.className}`}>
							@{info?.Author?.username}
						</p>
					</Link>
					<Link href={`/posts/${convertToSlug(info.title)}`}>
						<h3
							className={`text-26-semibold line-clamp-1  ${roboto_mono.className}`}>
							{info.title}
						</h3>
					</Link>
				</div>
				<Image
					src={profile_icon}
					alt={``}
					width={48}
					height={48}
					className='rounded-full'
				/>
			</div>

			<p className={`startup-card_desc ${roboto_mono.className}`}>
				{info.description}
			</p>

			<img
				src={info.image_link}
				alt='placeholder'
				className='startup-card_img'
			/>

			<div className='flex-between gap-3 mt-5'>
				<p className={`text-16-medium ${space_mono.className}`}>
					{info.category.split(", ")[0]}
				</p>
				<Button className={`startup-card_btn ${space_mono.className}`} asChild>
					<Link href={`posts/${convertToSlug(info.title)}`}>
						<b>Details</b>
					</Link>
				</Button>
			</div>
		</li>
	);
};

export default BlogItem;
