import { defineNuxtPlugin } from "#app";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

export default defineNuxtPlugin((nuxtApp) => {
	if (process.client) {
		const pinia = createPinia();
		pinia.use(piniaPluginPersistedstate);
		nuxtApp.vueApp.use(pinia);
	}
});
