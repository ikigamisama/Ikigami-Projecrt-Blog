import { blog_data } from "@/assets/assets";
import profile_icon from "@/assets/profile_icon.png";
import BlogItem from "@/components/BlogItem";
import Image from "next/image";

const Author = () => {
	return (
		<section className='profile_container'>
			<div className='profile_card'>
				<div className='profile_title'>
					<h3 className='text-24-black uppercase text-center line-clamp-1'>
						iikigami
					</h3>
				</div>

				<Image
					src={profile_icon}
					alt=''
					width={220}
					height={220}
					className='profile_image'
				/>

				<p className='text-30-extrabold mt-7 text-center'>@ikigamidevs</p>
				<p className='mt-1 text-center text-14-normal'>Nothing as of now</p>
			</div>

			<div className='flex-1 flex flex-col gap-5 lg:-mt-5'>
				<p className='text-30-bold'>All Blog</p>
				<ul className='card_grid-sm'>
					{blog_data.map((data, i) => (
						<BlogItem info={data} key={i} />
					))}
				</ul>
			</div>
		</section>
	);
};

export default Author;
