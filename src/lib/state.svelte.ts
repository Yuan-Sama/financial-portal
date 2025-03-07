export class PaginationState<TData> {
	page = $state(1);
	pageSize = $state(5);
	totalRecords = $state(0);
	data = $state<TData[]>([]);

	constructor(pagination: { page: number; pageSize: number; totalRecords: number; data: TData[] }) {
		this.page = pagination.page;
		this.pageSize = pagination.pageSize;
		this.totalRecords = pagination.totalRecords;
		this.data = [...pagination.data];
	}

	updatePagination(pagination: {
		page: number;
		pageSize: number;
		totalRecords: number;
		data: TData[];
	}) {
		this.page = pagination.page;
		this.pageSize = pagination.pageSize;
		this.totalRecords = pagination.totalRecords;
		this.data = [...pagination.data];
	}
}
