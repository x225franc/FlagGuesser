import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => {
	// Supprimer les avertissements Vue Router pour les fichiers système
	if (process.client) {
		const originalWarn = console.warn;
		console.warn = function (...args) {
			if (args[0] && args[0].includes && args[0].includes("serviceworker.js")) {
				return;
			}
			originalWarn.apply(console, args);
		};
	}
});
