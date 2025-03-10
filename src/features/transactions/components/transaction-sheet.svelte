<script lang="ts" module>
	import type { TransactionForms } from './transaction-form.svelte';

	interface Props {
		open?: boolean;
		onOpenChange?: (value: boolean) => void;
		disabled?: boolean;
		form: TransactionForms;
		accountOptions?: { id: number; name: string }[];
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
	import TransactionForm from './transaction-form.svelte';

	let { open = false, onOpenChange, form, disabled = false, accountOptions = [] }: Props = $props();
	const { form: formData } = form;
</script>

<Sheet {open} {onOpenChange}>
	<SheetContent class="space-y-4" interactOutsideBehavior={disabled ? 'ignore' : 'close'}>
		<SheetHeader>
			<SheetTitle>New Transaction</SheetTitle>
			<SheetDescription>Create a new account to track your transactions.</SheetDescription>
		</SheetHeader>

		<TransactionForm {form} {accountOptions} />
	</SheetContent>
</Sheet>
