<template>
	<header>
		<NxNavbar :menu="mainMenu" @clicked="menuClicked" />
	</header>
	<slot />
</template>

<script setup lang="ts">
import type { NxLink, NxLinks } from "~/types";

const mainMenu = [
	{
		name: "Login",
		link: "/",
	},
] as NxLinks;

const menuClicked = (menuItem: NxLink) => {
	if (menuItem.link) navigateTo(menuItem.link);
};
</script>
