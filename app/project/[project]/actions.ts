"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { getCorrectAnswerQuestion, getQuestionList } from "@/lib/models/data";
import { QuestionAnswer, SubmitAnswerData } from "@/lib/type";

export const setupQuiz = async (category: string, question_num: number) => {
	try {
		const cookieStore = cookies();
		const supabase = createClient(await cookieStore);

		const { data, error } = await getQuestionList(
			supabase,
			category,
			question_num,
		);

		if (error) return { error: true, message: error.message };

		return { data };
	} catch (error) {
		return { error: true, message: "An unexpected error occurred." };
	}
};

export const submitQuiz = async (answer_submit: SubmitAnswerData[]) => {
	try {
		const cookieStore = cookies();
		const supabase = createClient(await cookieStore);

		let answer: QuestionAnswer[] = [];
		let i = 0;

		for (const list of answer_submit) {
			const { data } = await getCorrectAnswerQuestion(supabase, list.id);

			let answer_detail = {
				id: list.id,
				answer: list.answer,
				is_correct:
					list.answer?.trim().toLowerCase() ===
					data.answer?.trim().toLowerCase(),
				correct_ans: data.answer,
				question: data.question,
				choices: data.choices.split("., "),
			};

			i += answer_detail["is_correct"] ? 1 : 0;

			answer.push(answer_detail);
		}

		return { data: answer, score: i };
	} catch (error) {
		return { error: true, message: "An unexpected error occurred." };
	}
};
