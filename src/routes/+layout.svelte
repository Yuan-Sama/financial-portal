<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	import '../app.css';
	import { Toaster } from 'svelte-sonner';
	import BackToTop from '$components/back-to-top.svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<Toaster closeButton richColors />

{@render children()}

<BackToTop />
