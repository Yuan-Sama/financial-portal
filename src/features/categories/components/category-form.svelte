<script lang="ts" module>
	import type { z } from 'zod';
	import type { SuperForm } from 'sveltekit-superforms';
	import type { insertCategorySchema, updateCategorySchema } from '../categories.validator';

	export type InsertCategoryForm = SuperForm<z.input<typeof insertCategorySchema>, any>;
	export type UpdateCategoryForm = SuperForm<z.input<typeof updateCategorySchema>, any>;
	export type CategoryForms = InsertCategoryForm | UpdateCategoryForm;

	interface Props {
		form: CategoryForms;
		createAction?: string;
		updateAction?: string;
		deleteAction?: string;
		disabled?: boolean;
	}
</script>

<script lang="ts">
	import { Spinner } from '$components/spinner';
	import {
		FormButton,
		FormControl,
		FormField,
		FormFieldErrors,
		FormLabel
	} from '$components/ui/form';
	import { Input } from '$components/ui/input';
	import { Trash } from 'lucide-svelte';
	import ConfirmDialog, { getConfirmation } from '$components/confirm-dialog.svelte';

	let {
		form,
		createAction = '?/create',
		updateAction = '?/update',
		deleteAction = '?/delete',
		disabled = false
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

<form method="post" class="space-y-4 mt-2" use:enhance>
	{#if currentFormIsUpdateForm}
		<FormField {form} name="id">
			<FormControl>
				{#snippet children({ props })}
					<Input {...props} value={$formData.id} hidden />
				{/snippet}
			</FormControl>
		</FormField>
	{/if}

	<FormField {form} name="name">
		<FormControl>
			{#snippet children({ props })}
				<FormLabel>Name</FormLabel>

				<Input
					{...props}
					bind:value={$formData.name}
					placeholder="e.g. Cash, Bank, Credit Card"
					class="mt-2"
					{disabled}
				/>

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
			{currentFormIsUpdateForm ? 'Save Changes' : 'Create category'}
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
				<Trash />Delete category
			{/if}
		</FormButton>

		<ConfirmDialog
			bind:open={openConfirmDialog}
			title="Are you sure?"
			description="You are about to delete this category"
		/>
	{/if}
</form>
