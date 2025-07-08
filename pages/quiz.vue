<template>
	<div class="container d-flex align-items-center justify-content-center" style="min-height: 100vh;">
		<div class="row justify-content-center w-100 py-4">
			<div class="col-md-8">
				<div v-if="currentQuestion" class="card shadow-lg">
					<div class="card-header bg-info text-white">
						<div class="row align-items-center">
							<div class="col">
								<h4 class="mb-0">
									Question {{ quizStore.currentIndex + 1 }} /
									{{ quizStore.total }}
								</h4>
							</div>
							<div class="col-auto">
								<div class="progress" style="width: 200px">
									<div
										class="progress-bar bg-success"
										:style="{
											width:
												(quizStore.currentIndex / quizStore.total) * 100 + '%',
										}"
									></div>
								</div>
							</div>
						</div>
					</div>
					<div class="card-body text-center">
						<div class="mb-4">
							<img
								:src="currentQuestion.flagUrl"
								alt="Drapeau"
								class="flag-image shadow-sm"
							/>
						</div>
						<h5 class="mb-4">Quel est ce pays ?</h5>
						<ChoiceSelector
							:choices="currentQuestion.choices"
							v-model="selected"
							@submit="submitAnswer"
						/>
					</div>
				</div>
				<div v-else class="card shadow-lg text-center">
					<div class="card-body">
						<h3 class="text-success mb-4">🎉 Quiz terminé !</h3>
						<p class="lead">Découvrez votre score</p>
						<NuxtLink to="/result" class="btn btn-primary btn-lg"
							>Voir le résultat</NuxtLink
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted } from "vue";
	import { useRouter } from "vue-router";
	import { useQuizStore } from "~/stores/quiz";
	import ChoiceSelector from "~/components/ChoiceSelector.vue";

	const quizStore = useQuizStore();
	const router = useRouter();
	const selected = ref<string | null>(null);

	const currentQuestion = computed(
		() => quizStore.questions[quizStore.currentIndex]
	);

	function submitAnswer() {
		if (selected.value) {
			quizStore.answer(selected.value);
			selected.value = null;
		}
	}

	onMounted(() => {
		quizStore.reset();
		if (!quizStore.questions.length) {
			router.replace("/");
		}
	});
</script>

<style scoped>
	.flag-image {
		width: 300px;
		height: 200px;
		object-fit: cover;
		border-radius: 10px;
		border: 3px solid #dee2e6;
	}

	@media (max-width: 768px) {
		.flag-image {
			width: 250px;
			height: 150px;
		}
	}
	
	/* Styles supplémentaires pour le centrage vertical */
	:deep(.container) {
		min-height: 100vh;
		padding-top: 0;
		padding-bottom: 0;
	}
</style>
