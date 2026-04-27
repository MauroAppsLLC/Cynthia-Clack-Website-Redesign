import type { RequestHandler } from '@sveltejs/kit';
import { workItems } from '$lib/data/work';

const SITE_URL = 'https://cynthiaclack.com';

const staticPages = [
	{ path: '/', priority: '1.0', changefreq: 'monthly' },
	{ path: '/about', priority: '0.8', changefreq: 'monthly' },
	{ path: '/work', priority: '0.8', changefreq: 'monthly' },
	{ path: '/speaking', priority: '0.7', changefreq: 'monthly' },
	{ path: '/contact', priority: '0.6', changefreq: 'yearly' }
];

const workPages = workItems.map((item: any) => ({
	path: `/work/${item.slug}`,
	priority: '0.7',
	changefreq: 'monthly'
}));

const pages = [...staticPages, ...workPages];

export const GET: RequestHandler = () => {
	const urls = pages
		.map(
			({ path, priority, changefreq }) => `
	<url>
		<loc>${SITE_URL}${path}</loc>
		<changefreq>${changefreq}</changefreq>
		<priority>${priority}</priority>
	</url>`
		)
		.join('');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
	xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
		http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>${urls}
</urlset>`.trim();

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};

export const prerender = true;
