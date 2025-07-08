import { defineStore } from "pinia";

export interface Question {
	flagUrl: string;
	choices: string[];
	correct: string;
}

export interface AnswerDetail {
	question: Question;
	userAnswer: string;
	isCorrect: boolean;
	questionIndex: number;
}

export interface QuizState {
	questions: Question[];
	currentIndex: number;
	score: number;
	total: number;
	answers: string[];
	answerDetails: AnswerDetail[];
}

export const useQuizStore = defineStore("quiz", {	state: (): QuizState => ({
		questions: [],
		currentIndex: 0,
		score: 0,
		total: 0,
		answers: [],
		answerDetails: [],
	}),
	actions: {		setQuestions(questions: Question[]) {
			this.questions = questions;
			this.total = questions.length;
			this.currentIndex = 0;
			this.score = 0;
			this.answers = [];
			this.answerDetails = [];
		},
		answer(choice: string) {
			const current = this.questions[this.currentIndex];
			const isCorrect = choice === current.correct;
			
			this.answers.push(choice);
			this.answerDetails.push({
				question: current,
				userAnswer: choice,
				isCorrect,
				questionIndex: this.currentIndex + 1,
			});
			
			if (isCorrect) {
				this.score++;
			}
			this.currentIndex++;
		},
		reset() {
			this.currentIndex = 0;
			this.score = 0;
			this.answers = [];
			this.answerDetails = [];
		},
	},
});
