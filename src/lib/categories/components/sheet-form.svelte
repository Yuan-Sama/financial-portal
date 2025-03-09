<script lang="ts" module>
	import type { SuperForm } from 'sveltekit-superforms';
	import type { CreateCategoryFormSchema, UpdateCategoryFormSchema } from '../categories.validator';

	export type CategoryForm =
		| SuperForm<CreateCategoryFormSchema, any>
		| SuperForm<UpdateCategoryFormSchema, any>;
</script>

<script lang="ts">
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
	import {
		AlertDialog,
		AlertDialogAction,
		AlertDialogCancel,
		AlertDialogContent,
		AlertDialogDescription,
		AlertDialogFooter,
		AlertDialogHeader,
		AlertDialogTitle
	} from '$components/ui/alert-dialog';

	type Props = {
		form: CategoryForm;
		open?: boolean;
		loading?: boolean;
		onOpenChange?: (value: boolean) => void;
	};

	type Action = '?/create' | '?/update' | '?/delete';

	let { form, open = $bindable(), loading = false, onOpenChange }: Props = $props();

	const { enhance, form: formData, delayed, submit } = form;

	let action: Action = $state('?/create');
	let updating = $state(Boolean($formData.id));
	let isOpen = $state(false);
	let promise: { resolve: (value: boolean) => void } | null = $state(null);

	const confirm: () => Promise<boolean | null> = () =>
		new Promise((resolve, _) => {
			promise = { resolve };
		});

	const handleClose = () => {
		promise = null;
	};

	const handleConfirm = () => {
		promise?.resolve(true);
		handleClose();
	};

	const handleCancel = () => {
		promise?.resolve(false);
		handleClose();
	};

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
					onclick={async (event) => {
						isOpen = true;
						event.preventDefault();

						const ok = await confirm();

						return ok ? submit(event.currentTarget) : undefined;
					}}
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

<AlertDialog bind:open={isOpen}>
	<AlertDialogContent>
		<AlertDialogHeader>
			<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
			<AlertDialogDescription>You are about to delete this category</AlertDialogDescription>
		</AlertDialogHeader>

		<AlertDialogFooter>
			<AlertDialogCancel onclick={handleCancel}>Cancel</AlertDialogCancel>

			<AlertDialogAction
				onclick={() => {
					action = '?/delete';
					handleConfirm();
					isOpen = false;
				}}
			>
				Continue
			</AlertDialogAction>
		</AlertDialogFooter>
	</AlertDialogContent>
</AlertDialog>
