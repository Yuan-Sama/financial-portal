<script lang="ts" module>
	import type { CategoryForms } from './category-form.svelte';

	interface Props {
		open?: boolean;
		form: CategoryForms;
		disabled?: boolean;
		onOpenChange?: (value: boolean) => void;
	}
</script>

<script lang="ts">
	import {
		Sheet,
		SheetContent,
		SheetDescription,
		SheetHeader,
		SheetTitle
	} from '$components/ui/sheet';
	import CategoryForm from './category-form.svelte';

	let { open = $bindable(false), form, disabled = false, onOpenChange }: Props = $props();

	const { form: formData } = form;
	let editForm = $state($formData.id !== undefined);
</script>

<Sheet bind:open {onOpenChange}>
	<SheetContent class="space-y-4" interactOutsideBehavior={disabled ? 'ignore' : 'close'}>
		<SheetHeader>
			<SheetTitle>{editForm ? 'Edit ' : 'New '}Category</SheetTitle>
			<SheetDescription>
				{editForm
					? 'Edit an existing category.'
					: 'Create a new category to organize your transactions.'}
			</SheetDescription>
		</SheetHeader>

		<CategoryForm {form} {disabled} />
	</SheetContent>
</Sheet>
