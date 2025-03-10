<script lang="ts" module>
	import type { AccountForms } from './account-form.svelte';

	interface Props {
		open?: boolean;
		form: AccountForms;
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
	import AccountForm from './account-form.svelte';

	let { open = $bindable(false), form, disabled = false, onOpenChange }: Props = $props();

	const { form: formData } = form;
	let editForm = $state($formData.id !== undefined);
</script>

<Sheet bind:open {onOpenChange}>
	<SheetContent class="space-y-4" interactOutsideBehavior={disabled ? 'ignore' : 'close'}>
		<SheetHeader>
			<SheetTitle>{editForm ? 'Edit ' : 'New '}Account</SheetTitle>
			<SheetDescription>
				{editForm
					? 'Edit an existing account.'
					: 'Create a new account to track your transactions.'}
			</SheetDescription>
		</SheetHeader>

		<AccountForm {form} {disabled} />
	</SheetContent>
</Sheet>
