<template>
	<div class="container d-flex align-items-center justify-content-center" style="min-height: 100vh;">
		<div class="row justify-content-center w-100 py-4">
			<div class="col-lg-8">
				<div class="card shadow-lg mb-4">
					<div class="card-header bg-success text-white text-center">
						<h1 class="mb-0">🏆 Résultats</h1>
					</div>
					<div class="card-body text-center">
						<div class="mb-4">
							<div class="display-1 text-success mb-3">
								{{ quizStore.score }}/{{ quizStore.total }}
							</div>
							<div class="progress mb-3" style="height: 20px">
								<div
									class="progress-bar"
									:class="getScoreClass()"
									:style="{ width: average + '%' }"
								>
									{{ average }}%
								</div>
							</div>
							<h4 :class="getTextClass()">{{ getScoreMessage() }}</h4>
						</div>

						<div class="d-grid gap-3">
							<NuxtLink to="/" class="btn btn-primary btn-lg">
								🔄 Rejouer
							</NuxtLink>
							<!-- <button
								@click="quizStore.reset()"
								class="btn btn-outline-secondary"
							>
								📊 Réinitialiser les scores
							</button> -->
						</div>
					</div>
				</div>

				<!-- Détail des réponses -->
				<div class="card shadow-lg">
					<div class="card-header bg-info text-white">
						<h3 class="mb-0">📋 Détail des réponses</h3>
					</div>
					<div class="card-body">
						<div
							v-for="(detail, index) in quizStore.answerDetails"
							:key="index"
							class="answer-detail mb-4 p-3 border rounded"
						>
							<div class="row align-items-center">
								<div class="col-md-3 text-center">
									<img
										:src="detail.question.flagUrl"
										alt="Drapeau"
										class="flag-small shadow-sm mb-2"
									/>
									<div class="badge bg-secondary">
										Question {{ detail.questionIndex }}
									</div>
								</div>
								<div class="col-md-9">
									<div class="row answer-details">
										<div class="col-sm-6 mb-2">
											<strong>Bonne réponse :</strong>
											<div class="text-success fw-bold">
												{{ detail.question.correct }}
											</div>
										</div>
										<div class="col-sm-6 mb-2">
											<strong>Votre réponse :</strong>
											<div
												:class="
													detail.isCorrect
														? 'text-success fw-bold'
														: 'text-danger fw-bold'
												"
											>
												{{ detail.userAnswer }}
												<span v-if="detail.isCorrect" class="ms-2">✅</span>
												<span v-else class="ms-2">❌</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed, onMounted } from "vue";
	import { useRouter } from "vue-router";
	import { useQuizStore } from "~/stores/quiz";

	const quizStore = useQuizStore();
	const router = useRouter();

	const average = computed(() =>
		quizStore.total ? Math.round((quizStore.score / quizStore.total) * 100) : 0
	);

	function getScoreClass() {
		if (average.value >= 80) return "bg-success";
		if (average.value >= 60) return "bg-warning";
		return "bg-danger";
	}

	function getTextClass() {
		if (average.value >= 80) return "text-success";
		if (average.value >= 60) return "text-warning";
		return "text-danger";
	}

	function getScoreMessage() {
		if (average.value >= 90) return "Excellent ! 🌟";
		if (average.value >= 80) return "Très bien ! 👏";
		if (average.value >= 60) return "Pas mal ! 👍";
		if (average.value >= 40) return "Peut mieux faire 🤔";
		return "Il faut réviser ! 📚";
	}

	onMounted(() => {
		if (!quizStore.questions.length) {
			router.replace("/");
		}
	});
</script>

<style scoped>
	.flag-small {
		width: 80px;
		height: 60px;
		object-fit: cover;
		border-radius: 8px;
		border: 2px solid #dee2e6;
	}

	.answer-detail {
		transition: all 0.3s ease;
	}

	.answer-detail:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	@media (max-width: 768px) {
		.flag-small {
			width: 60px;
			height: 45px;
		}
		
		/* Centre les réponses en version mobile */
		.answer-details {
			text-align: center;
		}
		
		.answer-details .col-sm-6 {
			width: 100%;
		}
	}
	
	/* Styles supplémentaires pour le centrage vertical */
	:deep(.container) {
		min-height: 100vh;
		padding-top: 0;
		padding-bottom: 0;
	}
</style>
