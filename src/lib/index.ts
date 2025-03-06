// place files you want to import through the `$lib` alias in this folder.
export const APP_NAME = 'Financial Portal';

export function getPageTitle(title: string = '') {
	if (title) return `${title} - ${APP_NAME}`;
	return APP_NAME;
}
