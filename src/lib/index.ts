// place files you want to import through the `$lib` alias in this folder.

function _delay(minSeconds: number, maxSeconds: number) {
	const min = Math.ceil(minSeconds * 1000);
	const max = Math.floor(maxSeconds * 1000);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function delay(minSeconds: number, maxSeconds: number): Promise<void> {
	return new Promise((fullfill) => setTimeout(fullfill, _delay(minSeconds, maxSeconds)));
}

export class RequestSearchParams {
	page: number = $state(1);
	pageSize: number = $state(5);
	search: string | null | undefined = $state();
	sort: string | undefined | null = $state();

	constructor(page = 1, pageSize = 5) {
		this.page = page;
		this.pageSize = pageSize;
	}

	toString() {
		return this.toURLSearchParams().toString();
	}

	toURLSearchParams() {
		const urlSearchParams = new URLSearchParams();

		if (this.page) urlSearchParams.append('p', this.page.toString());
		if (this.pageSize) urlSearchParams.append('pz', this.pageSize.toString());
		if (this.search && this.search.length) urlSearchParams.append('s', this.search);
		if (this.sort) urlSearchParams.set('o', this.sort);

		return urlSearchParams;
	}
}
