import { space_mono } from "@/lib/font";

const Questionare = () => {
	return (
		<section className='flex flex-col min-h-[calc(90vh-30px)] w-full items-center justify-center px-4'>
			<div className='container mx-auto'>
				<h1
					className={`text-2xl sm:text-4xl font-bold mb-12 ${space_mono.className}`}>
					Question Interviews
				</h1>
			</div>
		</section>
	);
};

export default Questionare;
