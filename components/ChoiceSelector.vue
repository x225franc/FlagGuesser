<template>
	<div class="choices">
		<div class="row g-3">
			<div v-for="choice in choices" :key="choice" class="col-md-6">
				<button
					:class="[
						'btn w-100 py-3',
						modelValue === choice ? 'btn-primary' : 'btn-outline-secondary',
					]"
					@click="$emit('update:modelValue', choice)"
				>
					{{ choice }}
				</button>
			</div>
		</div>
		<div v-if="modelValue" class="mt-4">
			<button @click="$emit('submit')" class="btn btn-success btn-lg px-5">
				✓ Valider ma réponse
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	const props = defineProps<{ choices: string[]; modelValue: string | null }>();
	const emit = defineEmits(["update:modelValue", "submit"]);
</script>

<style scoped>
	.choices {
		max-width: 600px;
		margin: 0 auto;
	}

	.btn {
		font-weight: 500;
		transition: all 0.3s ease;
	}

	.btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	}
</style>
