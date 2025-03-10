<script lang="ts" module>
	import type { Snippet } from 'svelte';

	interface Props {
		loading?: boolean;
		children: Snippet;
	}
</script>

<script lang="ts">
	import { Spinner } from '$components/spinner';
	import { Skeleton } from '$components/ui/skeleton';
	import { Card, CardContent, CardHeader } from '$components/ui/card';

	let { loading, children }: Props = $props();
</script>

{#if loading}
	<div class="px-4 lg:px-14 pb-10 -mt-24">
		<Card class="border-none drop-shadow-sm">
			<CardHeader>
				<Skeleton class="h-8 w-52" />
			</CardHeader>

			<CardContent>
				<div class="h-[500px] w-full flex items-center justify-center">
					<Spinner class="size-10" />
				</div>
			</CardContent>
		</Card>
	</div>
{:else}
	{@render children()}
{/if}
