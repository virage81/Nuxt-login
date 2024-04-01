<template>
	<div>
		<h1>Login Page</h1>
		<h3>Name: {{ user ? user.name : "login to see name" }}</h3>

		<GoogleSignInButton @success="handleLoginSuccess" @error="handleLoginError"></GoogleSignInButton>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { GoogleSignInButton, type CredentialResponse } from "vue3-google-signin";

const user = ref(<{ name: string } | null>null);

const handleLoginSuccess = async (response: CredentialResponse) => {
	const { credential } = response;

	if (credential) {
		try {
			user.value = await $fetch("/api/google-login", {
				method: "POST",
				body: {
					token: credential,
				},
			});
		} catch (error) {
			console.error(error);
		}
	}
};

const handleLoginError = () => {
	console.error("Login failed");
};
</script>
