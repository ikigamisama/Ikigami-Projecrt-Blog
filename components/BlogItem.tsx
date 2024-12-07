import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { BlogData } from "@/lib/type";
import { jetbrainsMono, roboto_mono, space_mono } from "@/lib/font";

const BlogItem = ({ info }: { info: BlogData }) => {
	const readableDate = new Date(info.date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
	return (
		<li className='startup-card group'>
			<div className='flex-between'>
				<p className={`startup-card_date ${roboto_mono.className}`}>
					{readableDate}
				</p>
				<div className='flex gap-1.5'>
					<EyeIcon className='size-6 text-primary' />
					<span
						className={`text-[16px] text-black font-bold ${roboto_mono.className}`}>
						10
					</span>
				</div>
			</div>

			<div className='flex-between mt-5 gap-5'>
				<div className='flex-1'>
					<Link href={``}>
						<p
							className={`text-16-medium line-clamp-1 ${jetbrainsMono.className}`}>
							{info.author}
						</p>
					</Link>
					<Link href={`posts/123`}>
						<h3
							className={`text-26-semibold line-clamp-1  ${roboto_mono.className}`}>
							{info.title}
						</h3>
					</Link>
				</div>
				<Image
					src={info.author_img}
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
				src={info.image.src}
				alt='placeholder'
				className='startup-card_img'
			/>

			<div className='flex-between gap-3 mt-5'>
				<Link href={``}>
					<p className={`text-16-medium ${space_mono.className}`}>
						{info.category}
					</p>
				</Link>
				<Button className={`startup-card_btn ${space_mono.className}`} asChild>
					<Link href={``}>
						<b>Details</b>
					</Link>
				</Button>
			</div>
		</li>
	);
};

export default BlogItem;
