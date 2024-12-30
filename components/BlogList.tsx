import { category } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { roboto_mono } from "@/lib/font";
import BlogItem from "./BlogItem";
import { PostListDataInterface } from "@/lib/type";
import { Skeleton } from "./ui/skeleton";

const BlogList = ({ list, con }: PostListDataInterface) => {
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
			<TabsContent value='all' className='min-h-[500px]'>
				<ul className='mt-7 card_grid'>
					{!list ? (
						<>
							<li className='group'>
								<Skeleton className='w-full h-[400px]' />
							</li>
							<li className='group'>
								<Skeleton className='w-full h-[400px]' />
							</li>
							<li className='group'>
								<Skeleton className='w-full h-[400px]' />
							</li>
						</>
					) : (
						list.map((data, i) => <BlogItem info={data} key={i} />)
					)}
				</ul>
			</TabsContent>
			<TabsContent value='data-analysis' className='min-h-[500px]'>
				<ul className='mt-7 card_grid'>
					{!list ? (
						<>
							<li className='group'>
								<Skeleton className='w-full h-[400px]' />
							</li>
							<li className='group'>
								<Skeleton className='w-full h-[400px]' />
							</li>
							<li className='group'>
								<Skeleton className='w-full h-[400px]' />
							</li>
						</>
					) : (
						list.map((data, i) => {
							if (data.category.split(", ")[0] == "Data Analysis")
								return <BlogItem info={data} key={i} />;
						})
					)}
				</ul>
			</TabsContent>
			<TabsContent value='machine-learning' className='min-h-[500px]'>
				<ul className='mt-7 card_grid'>
					{!list ? (
						<>
							<li className='group'>
								<Skeleton className='w-full h-[400px]' />
							</li>
							<li className='group'>
								<Skeleton className='w-full h-[400px]' />
							</li>
							<li className='group'>
								<Skeleton className='w-full h-[400px]' />
							</li>
						</>
					) : (
						list.map((data, i) => {
							if (data.category.split(", ")[0] == "Machine Learning")
								return <BlogItem info={data} key={i} />;
						})
					)}
				</ul>
			</TabsContent>
			<TabsContent value='visualizaiton' className='min-h-[500px]'>
				<ul className='mt-7 card_grid'>
					{!list ? (
						<>
							<li className='group'>
								<Skeleton className='w-full h-[400px]' />
							</li>
							<li className='group'>
								<Skeleton className='w-full h-[400px]' />
							</li>
							<li className='group'>
								<Skeleton className='w-full h-[400px]' />
							</li>
						</>
					) : (
						list.map((data, i) => {
							if (data.category.split(", ")[0] == "Visualizaiton")
								return <BlogItem info={data} key={i} />;
						})
					)}
				</ul>
			</TabsContent>
			<TabsContent value='techniques' className='min-h-[500px]'>
				<ul className='mt-7 card_grid'>
					{!list ? (
						<>
							<li className='group'>
								<Skeleton className='w-full h-[400px]' />
							</li>
							<li className='group'>
								<Skeleton className='w-full h-[400px]' />
							</li>
							<li className='group'>
								<Skeleton className='w-full h-[400px]' />
							</li>
						</>
					) : (
						list.map((data, i) => {
							if (data.category.split(", ")[0] == "Techniques")
								return <BlogItem info={data} key={i} />;
						})
					)}
				</ul>
			</TabsContent>
			<TabsContent value='resource' className='min-h-[500px]'>
				<ul className='mt-7 card_grid'>
					{!list ? (
						<>
							<li className='group'>
								<Skeleton className='w-full h-[400px]' />
							</li>
							<li className='group'>
								<Skeleton className='w-full h-[400px]' />
							</li>
							<li className='group'>
								<Skeleton className='w-full h-[400px]' />
							</li>
						</>
					) : (
						list.map((data, i) => {
							if (data.category.split(", ")[0] == "Resource")
								return <BlogItem info={data} key={i} />;
						})
					)}
				</ul>
			</TabsContent>
		</Tabs>
	);
};

export default BlogList;
