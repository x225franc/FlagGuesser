import { ref } from "vue";
import type { Question } from "../stores/quiz";

export function useQuiz() {
	const loading = ref(false);
	const error = ref<string | null>(null);
	async function fetchQuestions(count: number): Promise<Question[]> {
		loading.value = true;
		error.value = null;
		try {
			// On recupère les données des pays depuis l'API
			const res = await fetch(
				"https://restcountries.com/v3.1/all?fields=name,flags,translations"
			);
			const countries = await res.json();

			// Filtrer les pays qui ont une traduction en français
			const countriesWithFrench = countries.filter(
				(country: any) =>
					country.translations &&
					country.translations.fra &&
					country.translations.fra.common
			);

			// Si le nombre de pays est inférieur au nombre de questions demandées, on ajuste le nombre
			const shuffled = countriesWithFrench.sort(() => 0.5 - Math.random());
			const questions: Question[] = [];

			for (let i = 0; i < count; i++) {
				const correctCountry = shuffled[i];
				const choices = [
					correctCountry,
					...shuffled.slice(count + i, count + i + 3),
				];
				const shuffledChoices = choices
					.map((c: any) => c.translations.fra.common)
					.sort(() => 0.5 - Math.random());

				questions.push({
					flagUrl: correctCountry.flags.svg,
					choices: shuffledChoices,
					correct: correctCountry.translations.fra.common,
				});
			}
			return questions;
		} catch (e: any) {
			error.value = "Erreur lors du chargement des questions.";
			return [];
		} finally {
			loading.value = false;
		}
	}

	return { fetchQuestions, loading, error };
}
