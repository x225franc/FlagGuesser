import { defineNuxtPlugin } from "#app";
import { createPinia } from "pinia";

export default defineNuxtPlugin((nuxtApp) => {
	const pinia = createPinia();
	if (process.client) {
		const piniaPluginPersistedstate =
			require("pinia-plugin-persistedstate").default;
		pinia.use(piniaPluginPersistedstate);
	}
	nuxtApp.vueApp.use(pinia);
});
