<script lang="ts">
	import type { Account as AccountModel, DeleteAccountsForm } from '$lib/accounts/types';
	import type { Row } from '@tanstack/table-core';
	import { Button } from '$components/ui/button';
	import { Trash2 } from 'lucide-svelte';

	type Account = Omit<AccountModel, 'userId'>;

	type Props = {
		selectedRows: Row<Account>[];
		form: DeleteAccountsForm;
	};

	let { selectedRows, form }: Props = $props();

	const { enhance, form: formData } = form;
	$effect(() => {
		formData.update(() => ({ ids: selectedRows.map((r) => r.original.id) }));
	});
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
