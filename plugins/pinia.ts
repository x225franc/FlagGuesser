import { defineNuxtPlugin } from "#app";
import { createPinia } from "pinia";

export default defineNuxtPlugin((nuxtApp) => {
	const pinia = createPinia();
	if (process.client) {
		import("pinia-plugin-persistedstate").then((module) => {
			pinia.use(module.default);
		});
	}
	nuxtApp.vueApp.use(pinia);
});
