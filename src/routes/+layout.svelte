<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	import '../app.css';
	import Logo from '$assets/logo.svg';
	import { getPageTitle } from '$lib';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<svelte:head>
	<title>{getPageTitle()}</title>
	<link rel="shortcut icon" href={Logo} type="image/svg" />
</svelte:head>

{@render children()}
