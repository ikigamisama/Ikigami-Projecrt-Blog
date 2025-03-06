"use client";

import { space_mono } from "@/lib/font";
import {
	QuestionAnswer,
	QuestionareListData,
	SubmitAnswerData,
} from "@/lib/type";
import { useEffect, useState } from "react";
import { setupQuiz, submitQuiz } from "@/app/project/[project]/actions";
import QuizWrapper from "../QuizWrapper";
import QuizCheckWrapper from "../QuizCheckWrapper";
import QuestionWrapper from "../QuestionWrapper";

const Questionare = () => {
	const [questions, setQuestion] = useState<
		QuestionareListData[] | null | undefined
	>([]);
	const [questionWithAnswer, setQuestionWithAnswer] = useState<
		QuestionAnswer[] | null | undefined
	>([]);
	const [score, setScore] = useState<number | undefined>(0);
	const [currentQuizEvent, setCurrentQuizEvent] = useState<string>("setup");

	const setCategoryQuestion = async (
		category: string,
		question_num: string,
	) => {
		const result = await setupQuiz(category, parseInt(question_num));

		const questionFormatResult = result.data?.map((item) => ({
			...item,
			choices: item.choices
				.split("., ")
				.map((choice) => choice.trim())
				.sort(() => Math.random() - 0.5),
		}));
		setQuestion(questionFormatResult);
		setCurrentQuizEvent("quiz");
	};

	const submitAnswer = async (answer: SubmitAnswerData[]) => {
		const result = await submitQuiz(answer);
		setQuestionWithAnswer(result.data);
		setCurrentQuizEvent("submit_answer");
		setScore(result.score);
	};

	return (
		<section className='flex flex-col min-h-[calc(90vh-30px)] w-full items-center justify-center px-4'>
			<div className='container mx-auto'>
				<h1
					className={`text-2xl sm:text-4xl font-bold mb-12 ${space_mono.className}`}>
					Question Interviews
				</h1>

				{currentQuizEvent == "setup" && (
					<QuestionWrapper setCategory={setCategoryQuestion} />
				)}

				{currentQuizEvent == "quiz" && (
					<QuizWrapper question={questions} submitAnswer={submitAnswer} />
				)}
				{currentQuizEvent == "submit_answer" && (
					<QuizCheckWrapper
						questionWithAnswer={questionWithAnswer}
						score={score}
					/>
				)}
			</div>
		</section>
	);
};

export default Questionare;
