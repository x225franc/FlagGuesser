<template>
	<div id="app">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<style>
	body {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		min-height: 100vh;
		font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	}

	#app {
		min-height: 100vh;
		padding: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	#app > div {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	.nuxt-layout, .nuxt-page {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}
</style>
