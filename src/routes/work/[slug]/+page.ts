import { error } from '@sveltejs/kit';
import { getWorkItem, workItems } from '$lib/data/work';
import type { PageLoad } from './$types';

export const prerender = false;

export const load: PageLoad = ({ params }) => {
	const item = getWorkItem(params.slug);
	if (!item) {
		error(404, `No work item found for slug "${params.slug}"`);
	}
	return { item };
};

export function entries() {
	return workItems.map((item) => ({ slug: item.slug }));
}
