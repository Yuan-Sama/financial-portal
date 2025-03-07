<script lang="ts">
	import type { PageData } from './$types';
	import Metadata from '$components/metadata.svelte';

	let { data }: { data: PageData } = $props();
</script>

<Metadata title="Dashboard" />
