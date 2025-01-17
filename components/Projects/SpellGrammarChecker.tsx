import { space_mono } from "@/lib/font";

const SpellGrammarChecker = () => {
	return (
		<section className='flex flex-col min-h-[calc(90vh-30px)] w-full items-center justify-center px-4'>
			<div className='container mx-auto'>
				<h1
					className={`text-2xl sm:text-4xl font-bold ${space_mono.className}`}>
					Spelling and Grammar Checker
				</h1>
			</div>
		</section>
	);
};

export default SpellGrammarChecker;
