import { db } from '$lib/db/server';

export async function getPageAccount(
	userId: number,
	page: number = 1,
	pageSize: number = 5,
	orders: string[] = []
) {
	page = page < 1 ? 1 : page;
	pageSize = pageSize < 1 ? 5 : pageSize;
	orders = orders.length > 0 ? orders : [''];

	let query = db.selectFrom('accounts').where('user_id', '=', userId);

	for (const field of orders) {
		const normalizedField = field.toLowerCase();
		switch (normalizedField) {
			case '-name':
				query = query.orderBy('name desc');
				break;
			default:
				query = query.orderBy('name');
		}
	}

	const totalRecords =
		(
			await query
				.groupBy(['id', 'name'])
				.select(db.fn.count<number>('id').as('count'))
				.executeTakeFirst()
		)?.count ?? 0;

	const data = await query
		.offset(page * pageSize - pageSize)
		.limit(pageSize)
		.select(['id', 'name'])
		.execute();

	return {
		page,
		pageSize,
		totalRecords,
		data
	};
}
