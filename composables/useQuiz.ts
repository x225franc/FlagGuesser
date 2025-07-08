import { ref } from "vue";
import type { Question } from "../stores/quiz";

// Interface pour les pays reçus depuis l'API
interface Country {
	name: { common: string };
	flags: { svg: string; png: string };
	translations: {
		fra: { common: string; official: string };
	};
}

export function useQuiz() {
	const loading = ref(false);
	const error = ref<string | null>(null);

	async function fetchQuestions(count: number): Promise<Question[]> {
		loading.value = true;
		error.value = null;

		try {
			const { data, error: fetchError } = await useFetch<Country[]>(
				"https://restcountries.com/v3.1/all?fields=name,flags,translations"
			);

			if (fetchError.value) {
				throw new Error(fetchError.value?.message || "Erreur API");
			}

			if (!data.value || !data.value.length) {
				throw new Error("Aucune donnée reçue de l'API");
			}

			// Filtrer les pays qui ont une traduction en français
			const countriesWithFrench = (data.value as Country[]).filter(
				(country) =>
					country.translations &&
					country.translations.fra &&
					country.translations.fra.common
			);

			// Mélanger les pays
			const shuffled = countriesWithFrench.sort(() => 0.5 - Math.random());
			const questions: Question[] = [];

			// S'assurer qu'on ne demande pas plus de questions qu'il n'y a de pays disponibles
			const questionsCount = Math.min(count, Math.floor(shuffled.length / 4));

			// Pour chaque question, créer un choix avec 4 options
			for (let i = 0; i < questionsCount; i++) {
				// Pays correct pour cette question
				const correctCountry = shuffled[i];

				// Créer 3 autres choix incorrects
				const choices = [
					correctCountry,
					...shuffled.slice(shuffled.length - 3 - i, shuffled.length - i),
				];

				// Mélanger les choix
				const shuffledChoices = choices
					.map((c) => c.translations.fra.common)
					.sort(() => 0.5 - Math.random());

				// Créer la question
				questions.push({
					flagUrl: correctCountry.flags.svg,
					choices: shuffledChoices,
					correct: correctCountry.translations.fra.common,
				});
			}
			return questions;
		} catch (e: any) {
			console.error("Erreur lors du chargement des questions:", e);
			error.value =
				e instanceof Error
					? e.message
					: "Erreur lors du chargement des questions.";
			return [];
		} finally {
			loading.value = false;
		}
	}

	return { fetchQuestions, loading, error };
}
