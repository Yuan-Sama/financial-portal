<script lang="ts">
	import type { CategoryForm } from '../types';
	import { Input } from '$components/ui/input';
	import Spinner from '$components/spinner/spinner.svelte';
	import { Trash } from 'lucide-svelte';
	import {
		Sheet,
		SheetContent,
		SheetDescription,
		SheetHeader,
		SheetTitle
	} from '$components/ui/sheet';
	import {
		FormButton,
		FormControl,
		FormField,
		FormFieldErrors,
		FormLabel
	} from '$components/ui/form';

	type Props = {
		form: CategoryForm;
		open?: boolean;
		loading?: boolean;
		onOpenChange?: (value: boolean) => void;
	};

	type Action = '?/create' | '?/update' | '?/delete';

	let { form, open = $bindable(), loading = false, onOpenChange }: Props = $props();

	const { enhance, form: formData, delayed } = form;

	let action: Action = $state('?/create');
	let updating = $state(Boolean($formData.id));

	$effect(() => {
		action = updating ? '?/update' : '?/create';
	});
</script>

<Sheet {open} {onOpenChange}>
	<SheetContent class="space-y-4" interactOutsideBehavior={loading ? 'ignore' : 'close'}>
		<SheetHeader>
			{#if $formData.id}
				<SheetTitle>Edit Category</SheetTitle>
				<SheetDescription>Edit an existing category.</SheetDescription>
			{:else}
				<SheetTitle>New Category</SheetTitle>
				<SheetDescription>Create a new category to organize your transactions.</SheetDescription>
			{/if}
		</SheetHeader>

		<form {action} method="post" class="space-y-4 pt-2" use:enhance>
			{#if $formData.id}
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
							placeholder="e.g. Food, Travel, etc."
							class="mt-2"
							disabled={$delayed}
						/>

						<FormFieldErrors />
					{/snippet}
				</FormControl>
			</FormField>

			<FormButton class="w-full" disabled={$delayed}>
				{$formData.id ? 'Save Changes' : 'Create category'}
				{#if $delayed && action !== '?/delete'}
					<Spinner class="ml-1" />
				{/if}
			</FormButton>

			{#if $formData.id}
				<FormButton
					class="w-full"
					disabled={$delayed}
					variant="outline-red"
					onclick={() => (action = '?/delete')}
				>
					<Trash />Delete category
					{#if $delayed && action === '?/delete'}
						<Spinner class="ml-1" variant="red" />
					{/if}
				</FormButton>
			{/if}
		</form>
	</SheetContent>
</Sheet>
