<script lang="ts" module>
	import type { AccountForm, Account as AccountModel } from '$lib/accounts/types';
	import type { ActionResult } from '@sveltejs/kit';
	import { PaginationState } from '$lib/state.svelte';

	type Account = Omit<AccountModel, 'userId'>;

	class State extends PaginationState<Account> {
		open = $state(false);
		form: AccountForm | undefined = $state();

		openSheet(form: AccountForm) {
			this.open = true;
			this.form = form;
		}

		closeSheet() {
			this.open = false;
			this.form?.reset();
			this.form = undefined;
		}
	}
</script>

<script lang="ts">
	import type { ActionData, PageServerData } from './$types';
	import type { ColumnDef } from '@tanstack/table-core';
	import { applyAction } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import { superForm, type FormResult } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { createAccountSchema, updateAccountSchema } from '$lib/accounts/validator';
	import Metadata from '$components/metadata.svelte';
	import { renderComponent } from '$components/ui/data-table';
	import { Checkbox } from '$components/ui/checkbox';
	import {
		DataTable,
		DataTableDeletesButton,
		DataTableRowActions,
		DataTableSortColumn
	} from '$components/datatable';
	import { Card, CardContent, CardHeader, CardTitle } from '$components/ui/card';
	import { Spinner } from '$components/spinner';
	import { Button } from '$components/ui/button';
	import { Plus } from 'lucide-svelte';
	import { Skeleton } from '$components/ui/skeleton';
	import { SheetForm } from '$lib/accounts/components';

	type OnUpdateParams = { result: Extract<ActionResult, { type: 'success' | 'failure' }> };

	async function onUpdate({ result }: OnUpdateParams) {
		if (result.status === 401) {
			await applyAction({ type: 'redirect', location: '/sign-in', status: 303 });
			toast.error('Unauthorized');
			return;
		}

		const { pagination } = result.data as FormResult<ActionData>;

		if (pagination) {
			pageState.updatePagination(pagination);
		}
	}

	let { data }: { data: PageServerData } = $props();

	const createForm = superForm(data.createForm, {
		validators: zodClient(createAccountSchema),
		onUpdate,
		onError() {
			if (loading) loading = false;
		},
		onUpdated({ form }) {
			pageState.closeSheet();
			if (form.message) {
				toast.success(form.message);
			}
			if (loading) loading = false;
		}
	});

	const { delayed: createState } = createForm;

	const updateForm = superForm(data.updateForm, {
		validators: zodClient(updateAccountSchema),
		onUpdate,
		onError() {
			if (loading) loading = false;
		},
		onUpdated({ form }) {
			pageState.closeSheet();
			if (form.message) {
				toast.success(form.message);
			}
			if (loading) loading = false;
		}
	});

	const { delayed: updateState } = updateForm;

	const deletesForm = superForm(data.deletesForm, {
		dataType: 'json',
		onSubmit() {
			setTimeout(() => (loading = true), 500);
		},
		onError() {
			if (loading) loading = false;
		},
		onUpdate,
		onUpdated({ form }) {
			pageState.closeSheet();
			if (form.message) {
				toast.success(form.message);
			}
			if (loading) loading = false;
		}
	});

	const pageState = new State(data.pagination);

	let loading = $state($createState || $updateState);

	const columns: ColumnDef<Account>[] = [
		{
			id: 'select',
			header: ({ table }) =>
				renderComponent(Checkbox, {
					checked: table.getIsAllPageRowsSelected(),
					indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
					onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
					'aria-label': 'Select all'
				}),
			cell: ({ row }) =>
				renderComponent(Checkbox, {
					checked: row.getIsSelected(),
					onCheckedChange: (value) => row.toggleSelected(!!value),
					'aria-label': 'Select row'
				}),
			enableSorting: false,
			enableHiding: false
		},
		{
			accessorKey: 'name',
			header: ({ column }) =>
				renderComponent(DataTableSortColumn, {
					onclick: () => column.toggleSorting(),
					isSorted: column.getIsSorted(),
					text: 'Name'
				})
		},
		{
			id: 'actions',
			cell: ({ row }) =>
				renderComponent(DataTableRowActions, {
					onEdit() {
						updateForm.form.set(row.original);
						pageState.openSheet(updateForm);
					}
				})
		}
	];
</script>

<Metadata title="Financial Accounts" />

{#if loading}
	<div class="px-4 lg:px-14 pb-10 -mt-24">
		<Card class="border-none drop-shadow-sm">
			<CardHeader>
				<Skeleton class="h-8 w-52" />
			</CardHeader>

			<CardContent>
				<div class="h-[500px] w-full flex items-center justify-center">
					<Spinner class="size-10" />
				</div>
			</CardContent>
		</Card>
	</div>
{:else}
	<div class="px-4 lg:px-14 pb-10 -mt-24">
		<Card class="border-none drop-shadow-sm max-w-screen-2xl w-full mx-auto">
			<CardHeader class="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
				<CardTitle class="text-xl line-clamp-1">Accounts page</CardTitle>

				<Button size="sm" onclick={() => pageState.openSheet(createForm)}>
					<Plus />Add new
				</Button>
			</CardHeader>

			<CardContent>
				<DataTable
					data={pageState.data}
					paginationState={{ pageIndex: pageState.page - 1, pageSize: pageState.pageSize }}
					{columns}
					filterKey="name"
				>
					{#snippet deleteBulk(selectedRows)}
						<DataTableDeletesButton
							{selectedRows}
							form={deletesForm}
							onUpdate={(selectedRows) => {
								deletesForm.form.update(() => ({ ids: selectedRows.map((r) => r.original.id) }));
							}}
							alertDialogDescription="You are about to delete these accounts"
						/>
					{/snippet}
				</DataTable>
			</CardContent>
		</Card>
	</div>
{/if}

{#if pageState.form}
	<SheetForm
		open={pageState.open}
		{loading}
		form={pageState.form}
		onOpenChange={() => {
			pageState.form?.reset();
			pageState.form = undefined;
		}}
	/>
{/if}
