<template>
	<div class="container d-flex align-items-center justify-content-center" style="min-height: 100vh;">
		<div class="row justify-content-center w-100">
			<div class="col-md-6">
				<div class="card shadow-lg">
					<div class="card-header bg-primary text-white text-center">
						<h1 class="mb-0">
							<img src="../public/icon.png" alt="Flag Icon" class="mb-2" style="width: 30px; height: 30px;" /> FlagGuesser</h1>
					</div>
					<div class="card-body text-center">
						<p class="lead">
							Testez vos connaissances des drapeaux du monde entier !
						</p>
						<div class="mb-4">
							<label for="questionCount" class="form-label fw-bold"
								>Nombre de questions :</label
							>
							<input
								id="questionCount"
								type="number"
								class="form-control form-control-lg text-center"
								v-model.number="questionCount"
								min="5"
								max="20"
							/>
						</div>
						<button
							@click="startQuiz"
							class="btn btn-success btn-lg px-5"
							:disabled="loading"
						>
							<span
								v-if="loading"
								class="spinner-border spinner-border-sm me-2"
							></span>
							{{ loading ? "Chargement..." : "Commencer le quiz" }}
						</button>
						<div v-if="error" class="alert alert-danger mt-3">
							{{ error }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import { useRouter } from "vue-router";
	import { useQuizStore } from "~/stores/quiz";
	import { useQuiz } from "~/composables/useQuiz";

	const questionCount = ref(5);
	const router = useRouter();
	const quizStore = useQuizStore();
	const { fetchQuestions, loading, error } = useQuiz();

	async function startQuiz() {
		const questions = await fetchQuestions(questionCount.value);
		if (questions.length > 0) {
			quizStore.setQuestions(questions);
			router.push("/quiz");
		}
	}
</script>

<style scoped>
	.card {
		border: none;
		border-radius: 15px;
	}

	.card-header {
		border-radius: 15px 15px 0 0 !important;
	}

	body {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		min-height: 100vh;
	}
	
	/* Centrage vertical du contenu */
	:deep(.container) {
		min-height: calc(100vh - 2rem);
	}
</style>
