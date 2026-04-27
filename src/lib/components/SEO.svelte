<script lang="ts">
	import { page } from '$app/state';

	type Props = {
		title: string;
		description: string;
		image?: string;
		imageAlt?: string;
		type?: 'website' | 'article' | 'book' | 'profile';
		keywords?: string[];
		author?: string;
		jsonLd?: Record<string, any> | Record<string, any>[];
		article?: {
			publishedTime?: string;
			modifiedTime?: string;
			section?: string;
			tags?: string[];
		};
	};

	let {
		title,
		description,
		image = 'https://cynthiaclack.com/og-image.jpg',
		imageAlt = 'Cynthia L. Clack — Attorney, Author, Advocate',
		type = 'website',
		keywords = [],
		author = 'Cynthia L. Clack',
		jsonLd = [],
		article
	}: Props = $props();

	const SITE_URL = 'https://cynthiaclack.com';
	const canonicalUrl = $derived(`${SITE_URL}${page.url.pathname}`);
	
	const defaultKeywords = [
		'Texas Board-Certified Family Law',
		'Odessa TX attorney',
		'high-conflict custody',
		'family law advocate'
	];
	
	const allKeywords = $derived(Array.from(new Set([...defaultKeywords, ...keywords])));
	
	const safeJsonLd = $derived(
		jsonLd && (Array.isArray(jsonLd) ? jsonLd.length > 0 : Object.keys(jsonLd).length > 0)
			? JSON.stringify(jsonLd).replace(/</g, '\\u003C')
			: null
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	{#if allKeywords.length > 0}
		<meta name="keywords" content={allKeywords.join(', ')} />
	{/if}
	<meta name="author" content={author} />

	<!-- Canonical -->
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph -->
	<meta property="og:type" content={type} />
	<meta property="og:site_name" content="Cynthia L. Clack" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={image.startsWith('http') ? image : `${SITE_URL}${image}`} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={imageAlt} />
	<meta property="og:locale" content="en_US" />

	<!-- Article / Book specifics -->
	{#if type === 'article'}
		{#if article?.publishedTime}
			<meta property="article:published_time" content={article.publishedTime} />
		{/if}
		{#if article?.modifiedTime}
			<meta property="article:modified_time" content={article.modifiedTime} />
		{/if}
		<meta property="article:author" content={author} />
		{#if article?.section}
			<meta property="article:section" content={article.section} />
		{/if}
		{#each article?.tags ?? [] as tag}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}
	
	{#if type === 'book'}
		<meta property="book:author" content={author} />
	{/if}

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@CynthiaLClack" />
	<meta name="twitter:creator" content="@CynthiaLClack" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image.startsWith('http') ? image : `${SITE_URL}${image}`} />
	<meta name="twitter:image:alt" content={imageAlt} />

	<!-- JSON-LD -->
	{#if safeJsonLd}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html `<script type="application/ld+json">\n${safeJsonLd}\n</script>`}
	{/if}
</svelte:head>
