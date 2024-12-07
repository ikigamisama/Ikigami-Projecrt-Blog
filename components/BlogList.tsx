import { category } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { roboto_mono } from "@/lib/font";
import BlogItem from "./BlogItem";
import { blog_data } from "@/assets/assets";

const BlogList = () => {
	return (
		<Tabs
			defaultValue='all'
			className='flex flex-col justify-center gap-6 my-10'>
			<TabsList className='gap-4 bg-transparent flex-col xl:flex-row mb-4'>
				{category.map((item, i) => (
					<TabsTrigger
						key={i}
						value={item.value}
						className={`${roboto_mono.className} bg-white py-2 px-4 rounded-sm data-[state=active]:bg-black data-[state=active]:text-white`}>
						{item.name}
					</TabsTrigger>
				))}
			</TabsList>
			<TabsContent value='all'>
				<ul className='mt-7 card_grid'>
					{blog_data.map((data, i) => (
						<BlogItem info={data} key={i} />
					))}
				</ul>
			</TabsContent>
			<TabsContent value='data-analysis'>Data Analysis List</TabsContent>
			<TabsContent value='machine-learning'>Machine Learning List</TabsContent>
			<TabsContent value='visualizaiton'>Visualization List</TabsContent>
			<TabsContent value='techniques'>Technique List</TabsContent>
			<TabsContent value='resource'>Resource List</TabsContent>
		</Tabs>
	);
};

export default BlogList;
