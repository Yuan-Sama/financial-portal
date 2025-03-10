<script lang="ts" module>
	import type { z } from 'zod';
	import type { SuperForm } from 'sveltekit-superforms';
	import type { insertTransactionSchema } from '../transactions.validator';
	import type { getAccountOptions } from '$features/accounts/accounts.server';

	export type InsertTransactionForm = SuperForm<z.input<typeof insertTransactionSchema>, any>;
	export type TransactionForms = InsertTransactionForm;

	interface Props {
		form: TransactionForms;
		createAction?: string;
		updateAction?: string;
		deleteAction?: string;
		disabled?: boolean;
		accountOptions?: AsyncReturnType<typeof getAccountOptions>;
	}
</script>

<script lang="ts">
	import {
		FormButton,
		FormControl,
		FormField,
		FormFieldErrors,
		FormLabel
	} from '$components/ui/form';
	import { Input } from '$components/ui/input';
	import { Spinner } from '$components/spinner';
	import { Trash } from 'lucide-svelte';
	import { Select, SelectContent, SelectItem, SelectTrigger } from '$components/ui/select';
	import ConfirmDialog, { getConfirmation } from '$components/confirm-dialog.svelte';

	let {
		form,
		createAction = '?/create',
		updateAction = '?/update',
		deleteAction = '?/delete',
		disabled = false,
		accountOptions = []
	}: Props = $props();

	const { form: formData, enhance, submit } = form;

	let deleteForm = $state(false);
	let currentFormIsUpdateForm = $state($formData.id !== undefined);

	let openConfirmDialog = $state(false);

	async function onDelete(
		event:
			| (MouseEvent & { currentTarget: EventTarget & HTMLButtonElement })
			| (MouseEvent & { currentTarget: EventTarget & HTMLAnchorElement })
	) {
		openConfirmDialog = true;
		event.preventDefault();

		const ok = await getConfirmation();

		if (ok) {
			deleteForm = true;
			return submit(event.target);
		}
	}
</script>

<form action="#####" method="post" class="space-y-4 pt-2" use:enhance>
	{#if $formData.id}
		<FormField {form} name="id">
			<FormControl>
				{#snippet children({ props })}
					<Input {...props} value={$formData.id} hidden {disabled} />
				{/snippet}
			</FormControl>
		</FormField>
	{/if}

	<FormField {form} name="accountId">
		<FormControl>
			{#snippet children({ props })}
				<FormLabel>Account</FormLabel>

				<Select
					type="single"
					value={`${$formData.accountId}`}
					onValueChange={(value) => ($formData.accountId = Number(value))}
					name={props.name}
				>
					<SelectTrigger>Select an account</SelectTrigger>
					<SelectContent>
						{#each accountOptions as option}
							<SelectItem value={`${option.id}`} label={option.name} />
						{/each}
					</SelectContent>
				</Select>

				<FormFieldErrors />
			{/snippet}
		</FormControl>
	</FormField>

	<FormButton
		class="w-full"
		{disabled}
		formaction={currentFormIsUpdateForm ? updateAction : createAction}
	>
		{#if disabled && !deleteForm}
			<Spinner class="ml-1" />
			{currentFormIsUpdateForm ? 'Saving...' : 'Creating...'}
		{:else}
			{currentFormIsUpdateForm ? 'Save Changes' : 'Create transaction'}
		{/if}
	</FormButton>

	{#if currentFormIsUpdateForm}
		<FormButton
			formaction={deleteAction}
			class="w-full"
			{disabled}
			variant="outline-red"
			onclick={onDelete}
		>
			{#if disabled && deleteForm}
				<Spinner class="ml-1" variant="red" />
				Deleting...
			{:else}
				<Trash />Delete transaction
			{/if}
		</FormButton>

		<ConfirmDialog
			bind:open={openConfirmDialog}
			title="Are you sure?"
			description="You are about to delete this transaction"
		/>
	{/if}
</form>
