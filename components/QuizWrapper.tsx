"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

import { QuestionareListData, SubmitAnswerData } from "@/lib/type";
import { jetbrainsMono, workSans } from "@/lib/font";

type QuestionsProps = {
	question: QuestionareListData[] | null | undefined;
	submitAnswer: (answer: SubmitAnswerData[]) => Promise<void>;
};

const QuizWrapper = ({ question, submitAnswer }: QuestionsProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [answers, setAnswers] = useState<SubmitAnswerData[]>([]);

	const handleNext = () => {
		if (question && currentIndex < question.length - 1) {
			setCurrentIndex(currentIndex + 1);
		}
	};

	const handlePrevious = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		}
	};

	const handleSelectAnswer = (value: string) => {
		setAnswers((prev) => {
			if (!Array.isArray(prev)) return [];
			if (!question) return [];

			const updatedAnswers = [...prev];
			const questionId = question[currentIndex].id;

			const existingIndex = updatedAnswers.findIndex(
				(a) => a.id === questionId,
			);
			if (existingIndex !== -1) {
				updatedAnswers[existingIndex] = { id: questionId, answer: value };
			} else {
				updatedAnswers.push({ id: questionId, answer: value });
			}

			return updatedAnswers;
		});
	};

	const handleSubmit = () => {
		submitAnswer(answers);
	};

	if (question)
		return (
			<section className='flex flex-col items-center justify-center'>
				<div className='w-full'>
					<h2 className={`text-2xl font-semibold mb-8 ${workSans.className}`}>
						{currentIndex + 1}. {question[currentIndex].question}
					</h2>
					<RadioGroup
						value={
							answers.find(
								(a: { id: string | undefined }) =>
									a.id === question[currentIndex].id,
							)?.answer || ""
						}
						onValueChange={handleSelectAnswer}
						className='space-y-4'>
						{question[currentIndex].choices.map((choice, index) => (
							<div key={index} className='flex items-center space-x-3'>
								<RadioGroupItem value={choice} id={`choice-${index}`} />
								<Label
									htmlFor={`choice-${index}`}
									className={`${jetbrainsMono.className} text-md`}>
									{choice}
								</Label>
							</div>
						))}
					</RadioGroup>

					<div className='flex justify-between mt-6'>
						<Button
							onClick={handlePrevious}
							disabled={currentIndex === 0}
							variant='outline'>
							Previous
						</Button>

						{currentIndex < question.length - 1 ? (
							<Button onClick={handleNext} disabled={!answers[currentIndex]}>
								Next
							</Button>
						) : (
							<Button onClick={handleSubmit} disabled={!answers[currentIndex]}>
								Submit
							</Button>
						)}
					</div>
				</div>
			</section>
		);
};

export default QuizWrapper;
