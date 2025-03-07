<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	import '../app.css';
	import { Toaster } from 'svelte-sonner';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<Toaster closeButton richColors />

{@render children()}
