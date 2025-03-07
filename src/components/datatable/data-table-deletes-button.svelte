<script lang="ts" generics="TData">
	import { Button } from '$components/ui/button';
	import type { Row } from '@tanstack/table-core';
	import { Trash2 } from 'lucide-svelte';

	type Props = {
		selectedRows: Row<TData>[];
	};

	let { selectedRows }: Props = $props();
</script>

{#if selectedRows.length > 0}
	<Button
		size="sm"
		variant="outline-red"
		class="ml-auto font-normal text-xs"
		onclick={async () => {
			// const data = deletesData(table.getFilteredSelectedRowModel().rows);
			// onSubmit?.();
			// let result: ActionResult;
			// try {
			// 	const response = await fetch(deletesAction, {
			// 		method: 'POST',
			// 		headers: {
			// 			accept: 'application/json',
			// 			'x-sveltekit-action': 'true'
			// 		},
			// 		cache: 'no-store',
			// 		body: JSON.stringify(data),
			// 		signal: new AbortController().signal
			// 	});
			// 	result = deserialize(await response.text());
			// 	if (result.type === 'error') {
			// 		throw result;
			// 	}
			// 	if (result.type === 'redirect') return await applyAction(result);
			// } catch (error) {
			// 	onError?.();
			// 	table.resetRowSelection();
			// 	if ((error as any)?.name === 'AbortError') {
			// 		return;
			// 	}
			// 	throw error;
			// }
			// await onUpdate?.({ result });
			// table.resetRowSelection();
			// onUpdated?.();
		}}
	>
		<Trash2 /> Delete ({selectedRows.length})
	</Button>
{/if}
