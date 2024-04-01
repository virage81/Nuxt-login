// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
								css: ["@/assets/resources/css/styles.css"],
								devtools: { enabled: true },

								modules: ["nuxt-vue3-google-signin"],

								runtimeConfig: {
																googleClientId: process.env.GOOGLE_CLIENT_ID,
																googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
								},

								googleSignIn: {
																clientId: process.env.GOOGLE_CLIENT_ID,
								},
});
