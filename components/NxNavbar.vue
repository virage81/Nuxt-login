<template>
	<nav v-if="menu" class="py-2 border-bottom" :class="themeClass">
		<div class="container d-flex flex-wrap">
			<ul class="nav me-auto">
				<li v-for="item in props.menu" :class="[showClass(item), disabledClass(item)]" @click.stop="clicked(item)">
					<span class="nav-link px-2" :class="[hasChildrenClass(item)]">{{ item.name }}</span>
					<span v-if="item.children && item.showChildren !== false">
						<span @click="toggleShowChildren(showChildren)">&#9660;</span>
						<nxMenu v-if="showChildren" :menu="item.children" />
					</span>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script setup lang="ts">
type Link = {
	name: string;
	link?: string;
	disabled?: Boolean;
	show?: Boolean;
	showChildren?: Boolean;
	children?: Links;
};

type Links = Array<Link>;

const props = defineProps({
	menu: Array<Link>,
	theme: {
		validator(value: string) {
			return ["primary", "secondary", "success", "info", "warning", "danger", "dark", "light", "link", "none"].includes(value);
		},
		default: "light",
	},
});

const emit = defineEmits(["clicked"]);
const showChildren = ref(false);

const themeClasses = [
	{
		name: "light",
		class: "light",
	},
	{
		name: "dark",
		class: "dark",
	},
	{
		name: "primary",
		class: "primary",
	},
	{
		name: "secondary",
		class: "secondary",
	},
	{
		name: "info",
		class: "info",
	},
	{
		name: "warning",
		class: "warning",
	},
	{
		name: "danger",
		class: "danger",
	},
];

// Computed properties
const themeClass = computed(() => {
	const theme = themeClasses.find((theme) => theme.name === props.theme);
	return theme?.class;
});

/**
 * Receives object of menu item clicked and emits event
 * @param name Name of menu item that was clicked
 */
function clicked(link: Link) {
	emit("clicked", link);
}

/**
 * If the link showClass is false, a hide class will be added
 * @param link A Link object
 */
function showClass(link: Link) {
	if (link.show === false) return "hide";
}

/**
 * If the link disabled is true, a disabled class will be added
 * @param link A Link object
 */
function disabledClass(link: Link) {
	if (link.disabled === true) return "disabled";
}

/**
 * If the link has children, remove right padding
 * @param link A Link object
 */
function hasChildrenClass(link: Link) {
	if (link.children && link.showChildren !== false) return "pr-0";
}

/**
 * Toggles show children
 * @param value Value of showChildren
 */
function toggleShowChildren(value: boolean) {
	showChildren.value = !value;
}
</script>

<style scoped>
li {
	cursor: pointer;
}

.py-2 {
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
}

.flex-wrap {
	flex-wrap: wrap;
}

.d-flex {
	display: flex;
}

.nav {
	display: flex;
	flex-wrap: wrap;
	padding-left: 0;
	list-style: none;
}

.me-auto {
	margin-right: auto;
}

.nav-link {
	text-decoration: none;
	transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
}

.px-2 {
	padding-right: 0.5rem;
	padding-left: 0.5rem;
}

.menu-item {
	padding: 0.5rem 1rem;
}

a {
	text-decoration: none;
}

.menu-item:hover {
	background-color: #e9ecef;
}

.disabled {
	color: #adb5bd;
	cursor: auto;
}

.hide {
	display: none;
}

.pr-0 {
	padding-right: 0;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
	.container {
		max-width: 540px;
	}
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
	.container {
		max-width: 720px;
	}
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
	.container {
		max-width: 960px;
	}
}

/* X-Large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
	.container {
		max-width: 1140px;
	}
}

/* XX-Large devices (larger desktops, 1400px and up) */
@media (min-width: 1400px) {
	.container {
		max-width: 1320px;
	}
}

/* Themes */
.light {
	color: #212529;
	background-color: #f8f9fa;
	border-bottom: 1px solid #ccc;
}

.dark {
	color: #fff;
	background-color: #212529;
	border-bottom: #212529;
}

.none {
	color: #212529;
}

.primary {
	color: #fff;
	background-color: #0d6efd;
	border-bottom: #0d6efd;
}

.secondary {
	color: #fff;
	background-color: #6c757d;
	border-bottom: #6c757d;
}

.success {
	color: #fff;
	background-color: #198754;
	border-bottom: #198754;
}

.info {
	color: #000;
	background-color: #0dcaf0;
	border-bottom: #0dcaf0;
}

.warning {
	color: #000;
	background-color: #ffc107;
	border-bottom: #ffc107;
}

.danger {
	color: #fff;
	background-color: #dc3545;
	border-bottom: #dc3545;
}
</style>
