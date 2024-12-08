import Image from "next/image";
import blog_pic_2 from "@/assets/blog_pic_2.png";
import profile_icon from "@/assets/profile_icon.png";
import Link from "next/link";
import { jetbrainsMono } from "@/lib/font";
import EditPostButton from "@/components/EditPostButton";

const Posts = () => {
	const readableDate = new Date(Date.now()).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
	return (
		<>
			<section className='post_header_container min-h-[450px] mb-8'>
				<p className='tag'>{readableDate}</p>

				<h1 className='heading'>
					A detailed step by step guide to manage your lifestyle
				</h1>
				<p className='sub-heading !max-w-5xl'>
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry. Lorem Ipsum has been the..
				</p>
			</section>

			<section className='section-container'>
				<Image
					src={blog_pic_2}
					alt='thumbnail'
					className='w-full h-auto rounded-xl'
				/>

				<article className='space-y-5 mt-10 max-w-4xl mx-auto'>
					<div className='flex-between gap-5'>
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
									Ikigami
								</p>
								<p
									className={`text-16-medium !text-black-300 ${jetbrainsMono.className}`}>
									@ikigamidevs
								</p>
							</div>
						</Link>

						<p className={`category-tag ${jetbrainsMono.className}`}>
							Machine Learning
						</p>
					</div>
				</article>

				<hr className='divider' />
				<EditPostButton blog_id='123' />
			</section>
		</>
	);
};

export default Posts;
