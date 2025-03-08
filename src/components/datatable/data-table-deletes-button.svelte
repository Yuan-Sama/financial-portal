<script lang="ts" generics="TData, TForm extends Record<string, unknown>">
	import type { Row } from '@tanstack/table-core';
	import { Button } from '$components/ui/button';
	import { Trash2 } from 'lucide-svelte';
	import type { SuperForm } from 'sveltekit-superforms';

	type Props = {
		selectedRows: Row<TData>[];
		onUpdate: (selectedRows: Row<TData>[]) => void;
		form: SuperForm<TForm, any>;
	};

	let { selectedRows, onUpdate, form }: Props = $props();
	const { enhance } = form;

	$effect(() => onUpdate(selectedRows));
</script>

{#if selectedRows.length > 0}
	<form action="?/deletes" method="post" use:enhance class="contents">
		<Button
			type="submit"
			variant="outline-red"
			class="ml-auto font-normal text-xs hover:cursor-pointer"
		>
			<Trash2 /> Delete ({selectedRows.length})
		</Button>
	</form>
{/if}
