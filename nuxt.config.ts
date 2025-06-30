// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-05-15",
	devtools: { enabled: true },
	ssr: true,
	nitro: {
		routeRules: {
			"/serviceworker.js": { headers: { "cache-control": "no-cache" } },
		},
	},
	app: {
		head: {
			meta: [
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
			],
		},
	},
});
