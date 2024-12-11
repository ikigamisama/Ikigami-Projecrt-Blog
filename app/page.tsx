import BlogList from "@/components/BlogList";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { roboto_mono, space_mono } from "@/lib/font";
import { getPostList } from "@/lib/models/data";

export default async function Home() {
	const cookieStore = await cookies();
	const supabase = createClient(cookieStore);

	const { data } = await getPostList(supabase);

	return (
		<>
			<div className='container mx-auto w-full'>
				<div className='text-center my-[5rem]'>
					<h1
						className={`text-4xl sm:text-6xl font-bold ${space_mono.className}`}>
						Project Blogs
					</h1>
					<p
						className={`mt-10 max-w-[700px] m-auto text-xs sm:text-base leading-5 ${roboto_mono.className}`}>
						Welcome to my project blog, a space where I showcase my journey in
						Data Science and Analytics. Here, you'll find hands-on projects in
						Data Analysis, Machine Learning, and Data Visualization, along with
						insights into the tools, techniques, and resources I use to bring
						data to life. Explore, learn, and get inspired!
					</p>
				</div>

				<BlogList list={data} con={supabase} />
			</div>
		</>
	);
}
