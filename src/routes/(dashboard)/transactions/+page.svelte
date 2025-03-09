<script lang="ts" module>
	import type { PageServerData } from './$types';
	import type { Transaction as TransactionModel } from '$lib/db/db.schema';
	import { PaginationState } from '$lib/state.svelte';

	type Transaction = Omit<
		TransactionModel & { account: string; category: string | null },
		'accountId' | 'categoryId'
	>;

	type PageProps = { data: PageServerData };

	class State extends PaginationState<Transaction> {}
</script>

<script lang="ts">
	import Metadata from '$components/metadata.svelte';
	import { Plus } from 'lucide-svelte';
	import { Card, CardContent, CardHeader, CardTitle } from '$components/ui/card';
	import { Skeleton } from '$components/ui/skeleton';
	import { Spinner } from '$components/spinner';
	import { Button } from '$components/ui/button';
	import { DataTable, DataTableRowActions, DataTableSortColumn } from '$components/datatable';
	import type { ColumnDef } from '@tanstack/table-core';
	import { renderComponent } from '$components/ui/data-table';
	import { Checkbox } from '$components/ui/checkbox';

	let { data }: PageProps = $props();

	const pageState = new State({ page: 1, pageSize: 5, totalRecords: 0, data: [] });

	let loading = $state(false);

	const columns: ColumnDef<Transaction>[] = [
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
					onEdit() {}
				})
		}
	];
</script>

<Metadata title="Transactions History" />

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
				<CardTitle class="text-xl line-clamp-1">Transactions History</CardTitle>

				<Button size="sm">
					<Plus />Add new
				</Button>
			</CardHeader>

			<CardContent>
				<DataTable
					data={pageState.data}
					paginationState={{ pageIndex: pageState.page - 1, pageSize: pageState.pageSize }}
					{columns}
					filterKey="name"
				></DataTable>
			</CardContent>
		</Card>
	</div>
{/if}
