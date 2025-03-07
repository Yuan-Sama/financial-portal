<script lang="ts">
	import Metadata from '$components/metadata.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<Metadata title="Your Financial Accounts" />
