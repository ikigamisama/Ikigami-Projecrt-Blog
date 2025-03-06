import { jetbrainsMono, workSans } from "@/lib/font";
import { QuestionAnswer } from "@/lib/type";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "./ui/label";

type QuizCheckProps = {
	questionWithAnswer: QuestionAnswer[] | null | undefined;
	score: number | undefined;
};

const QuizCheckWrapper = ({ questionWithAnswer, score }: QuizCheckProps) => {
	console.log(questionWithAnswer);
	if (questionWithAnswer) {
		return (
			<section className='flex flex-col items-center justify-center space-y-12 my-12'>
				<p className={` ${workSans.className} text-xl font-semibold`}>
					Correct Answer: {score}
				</p>
				{questionWithAnswer.map((question, i) => (
					<div className='w-full' key={i}>
						<h2 className={`text-2xl font-semibold mb-8 ${workSans.className}`}>
							{i + 1}. {question.question}
						</h2>
						<RadioGroup disabled={true} className='space-y-4'>
							{question.choices?.map((choice, index) => {
								const isUserAnswer = choice === question.answer;
								const isCorrectAnswer = choice === question.correct_ans;
								const isWrongAnswer = isUserAnswer && !question.is_correct;
								return (
									<div key={index} className={`flex items-center space-x-3 `}>
										<RadioGroupItem
											value={choice}
											id={`choice-${index}`}
											className={`border ${
												isCorrectAnswer && "border-green-600"
											} ${isWrongAnswer && "border-red-600"}`}
										/>
										<Label
											htmlFor={`choice-${index}`}
											className={`${jetbrainsMono.className} text-md  ${
												isCorrectAnswer && "text-green-600"
											} ${isWrongAnswer && "text-red-600"}`}>
											{choice}
										</Label>
									</div>
								);
							})}
						</RadioGroup>
					</div>
				))}
			</section>
		);
	}
};

export default QuizCheckWrapper;
