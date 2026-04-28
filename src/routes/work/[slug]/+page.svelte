<script lang="ts">
	import { getRelated } from '$lib/data/work';
	import Button from '$lib/components/Button.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import PlaceholderBadge from '$lib/components/PlaceholderBadge.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { optimizeImage } from '$lib/utils/image';

	let { data } = $props();
	const item = $derived(data.item);
	const related = $derived(getRelated(item));

	let expandedVolumes: Record<number, boolean> = $state({});
	function toggleVolume(i: number) {
		expandedVolumes[i] = !expandedVolumes[i];
	}

	const SITE_URL = 'https://cynthiaclack.com';

	/** Category → display label */
	const categoryLabel: Record<string, string> = {
		cases: 'Landmark Cases',
		projects: 'Creative Projects',
		books: 'Books',
	};

	/** Category → icon */
	const categoryIcon: Record<string, string> = {
		cases: '⚖️',
		projects: '🎭',
		books: '📖',
	};

	/** Back-link target (scrolls to the right tab) */
	const backHref = $derived(`/work#${item.category}`);

	/** Colour accent per category */
	const accentClass: Record<string, string> = {
		cases:    'tag-cases',
		projects: 'tag-projects',
		books:    'tag-books',
	};

	const breadcrumbJsonLd = $derived({
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{
				"@type": "ListItem",
				"position": 1,
				"name": "Work",
				"item": `${SITE_URL}/work`
			},
			{
				"@type": "ListItem",
				"position": 2,
				"name": categoryLabel[item.category],
				"item": `${SITE_URL}/work#${item.category}`
			},
			{
				"@type": "ListItem",
				"position": 3,
				"name": item.title,
				"item": `${SITE_URL}/work/${item.slug}`
			}
		]
	});

	const itemJsonLd = $derived(item.category === 'books' ? {
		"@context": "https://schema.org",
		"@type": "Book",
		"name": item.title,
		"author": {
			"@type": "Person",
			"name": "Cynthia L. Clack"
		},
		"url": `${SITE_URL}/work/${item.slug}`,
		"description": item.summary,
		...(item.year ? { "datePublished": item.year } : {})
	} : {
		"@context": "https://schema.org",
		"@type": "Article",
		"headline": item.title,
		"author": {
			"@type": "Person",
			"name": "Cynthia L. Clack"
		},
		"description": item.summary,
		"url": `${SITE_URL}/work/${item.slug}`
	});

	const jsonLd = $derived([breadcrumbJsonLd, itemJsonLd]);
	const type = $derived(item.category === 'books' ? 'book' : 'article');
</script>

<SEO 
	title="{item.title} — Cynthia L. Clack"
	description={item.summary}
	image={item.coverSrc ?? undefined}
	imageAlt={item.coverAlt ?? item.title}
	{type}
	{jsonLd}
	article={item.category !== 'books' ? {
		section: categoryLabel[item.category],
		tags: [item.tag ?? categoryLabel[item.category], "Law", "Advocacy"]
	} : undefined}
/>

<!-- ─── Back breadcrumb ─────────────────────────────────────────────────────── -->
<nav class="breadcrumb" aria-label="Breadcrumb" use:reveal>
	<div class="breadcrumb__inner">
		<a href="/work" class="breadcrumb__link">← Work</a>
		<span class="breadcrumb__sep" aria-hidden="true">/</span>
		<span class="breadcrumb__current">{categoryLabel[item.category]}</span>
	</div>
</nav>

<!-- ─── Hero ─────────────────────────────────────────────────────────────────── -->
<header class="detail-hero" use:reveal>
	<div class="detail-hero__inner">
		<!-- Left: text content -->
		<div class="detail-hero__copy">
			<div class="detail-hero__meta">
				<span class="tag {accentClass[item.category]}">
					{categoryIcon[item.category]} {item.tag ?? categoryLabel[item.category]}
				</span>
				{#if item.isPlaceholder}
					<PlaceholderBadge />
				{/if}
				{#if item.dates ?? item.year}
					<span class="detail-hero__date">{item.dates ?? item.year}</span>
				{/if}
			</div>

			<h1 class="detail-hero__title">{item.title}</h1>

			{#if item.subtitle}
				<p class="detail-hero__subtitle">{item.subtitle}</p>
			{/if}

			<p class="detail-hero__summary">{item.summary}</p>

			<div class="detail-hero__actions">
				<a href={backHref} class="btn-outline">
					← All {categoryLabel[item.category]}
				</a>
				{#if item.externalHref}
					<a href={item.externalHref} target="_blank" rel="noopener noreferrer" class="btn-primary">
						Learn More ↗
					</a>
				{/if}
			</div>
		</div>

		<!-- Right: cover image (books/projects) or case emblem -->
		<div class="detail-hero__visual">
			{#if item.coverSrc}
				<div class="detail-hero__cover-wrap">
					<img
						src={optimizeImage(item.coverSrc, 800)}
						alt={item.coverAlt ?? item.title}
						class="detail-hero__cover"
						loading="eager"
					/>
				</div>
			{:else}
				<!-- Abstract visual for cases / text-only items -->
				<div class="detail-hero__emblem" aria-hidden="true">
					<span class="detail-hero__emblem-icon">{categoryIcon[item.category]}</span>
					<div class="detail-hero__emblem-ring ring1"></div>
					<div class="detail-hero__emblem-ring ring2"></div>
					<div class="detail-hero__emblem-ring ring3"></div>
				</div>
			{/if}
		</div>
	</div>
</header>

<!-- ─── Body content ──────────────────────────────────────────────────────────── -->
<article class="detail-body" use:reveal>
	<div class="detail-body__inner">

		<!-- Main narrative -->
		<div class="detail-body__prose">
			{#each item.body as paragraph}
				<p>{paragraph}</p>
			{/each}
		</div>

		<!-- Secondary image -->
		{#if item.heroSrc}
			<figure class="detail-body__figure" use:reveal={{ delay: 40 }}>
				<img
					src={optimizeImage(item.heroSrc, 1200)}
					alt={item.title}
					class="detail-body__figure-img"
					loading="lazy"
				/>
			</figure>
		{/if}

		<!-- Quote pull-out -->
		{#if item.quote}
			<blockquote class="detail-quote" use:reveal={{ delay: 60 }}>
				<div class="detail-quote__mark" aria-hidden="true">"</div>
				{#if item.quote.isPlaceholder}
					<div class="mb-4">
						<PlaceholderBadge />
					</div>
				{/if}
				<p class="detail-quote__text">{item.quote.text}</p>
				{#if item.quote.attribution}
					<footer class="detail-quote__attr">— {item.quote.attribution}</footer>
				{/if}
			</blockquote>
		{/if}

		<!-- Accolades -->
		{#if item.accolades && item.accolades.length > 0}
			<aside class="detail-accolades" use:reveal={{ delay: 90 }}>
				<h2 class="detail-accolades__heading">Key Highlights</h2>
				<ul class="detail-accolades__list">
					{#each item.accolades as accolade}
						<li class="detail-accolades__item">
							<span class="detail-accolades__check" aria-hidden="true">✓</span>
							{accolade}
						</li>
					{/each}
				</ul>
			</aside>
		{/if}

		<!-- Timeline -->
		{#if item.timeline && item.timeline.length > 0}
			<section class="detail-timeline" use:reveal={{ delay: 120 }}>
				<h2 class="detail-timeline__heading">Timeline</h2>
				<ol class="detail-timeline__list">
					{#each item.timeline as event, i}
						<li class="detail-timeline__item">
							<div class="detail-timeline__node">
								<span class="detail-timeline__dot" aria-hidden="true"></span>
								{#if i < item.timeline!.length - 1}
									<span class="detail-timeline__line" aria-hidden="true"></span>
								{/if}
							</div>
							<div class="detail-timeline__content">
								<span class="detail-timeline__year">{event.year}</span>
								<span class="detail-timeline__label">{event.label}</span>
							</div>
						</li>
					{/each}
				</ol>
			</section>
		{/if}

		<!-- Volumes (series books) -->
		{#if item.volumes && item.volumes.length > 0}
			<section class="detail-volumes" use:reveal={{ delay: 150 }}>
				<h2 class="detail-volumes__heading">Books in the Series</h2>
				<div class="detail-volumes__list">
					{#each item.volumes as vol, i}
						<div class="volume-card" class:volume-card--open={expandedVolumes[i]}>
							<button
								class="volume-card__header"
								onclick={() => toggleVolume(i)}
								aria-expanded={expandedVolumes[i] ?? false}
							>
								<div class="volume-card__info">
									<span class="volume-card__subtitle">{vol.subtitle ?? ''}</span>
									<h3 class="volume-card__title">{vol.title}</h3>
									{#if vol.year}
										<span class="volume-card__year">{vol.year}</span>
									{/if}
								</div>
								<span class="volume-card__chevron" aria-hidden="true">
									{expandedVolumes[i] ? '−' : '+'}
								</span>
							</button>

							<p class="volume-card__summary">{vol.summary}</p>

							{#if expandedVolumes[i]}
								<div class="volume-card__body">
									{#each vol.body as paragraph}
										<p>{paragraph}</p>
									{/each}
									{#if vol.accolades && vol.accolades.length > 0}
										<ul class="volume-card__accolades">
											{#each vol.accolades as accolade}
												<li>{accolade}</li>
											{/each}
										</ul>
									{/if}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</section>
		{/if}

	</div>
</article>

<!-- ─── Related items ─────────────────────────────────────────────────────────── -->
{#if related.length > 0}
	<section class="related" use:reveal={{ distance: 12 }}>
		<div class="related__inner">
			<h2 class="related__heading">You May Also Like</h2>
			<div class="related__grid">
				{#each related as rel}
					<a href="/work/{rel.slug}" class="related-card">
						{#if rel.coverSrc}
							<div class="related-card__img-wrap">
								<img src={optimizeImage(rel.coverSrc, 600)} alt={rel.coverAlt ?? rel.title} class="related-card__img" loading="lazy" />
							</div>
						{:else}
							<div class="related-card__emblem" aria-hidden="true">
								{categoryIcon[rel.category]}
							</div>
						{/if}
						<div class="related-card__body">
							<span class="related-card__tag tag {accentClass[rel.category]}">{rel.tag ?? categoryLabel[rel.category]}</span>
							<h3 class="related-card__title">{rel.title}</h3>
							<p class="related-card__summary">{rel.summary}</p>
							<span class="related-card__cta">Read More →</span>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- ─── CTA ─────────────────────────────────────────────────────────────────────── -->
<section class="detail-cta" use:reveal={{ distance: 10 }}>
	<div class="detail-cta__inner">
		<p class="detail-cta__line">Interested in working with Cynthia?</p>
		<Button href="/contact">Get in Touch</Button>
	</div>
</section>

<style>
	/* ── Design tokens (mirrored from app.css for scoped use) ───────────────── */
	:root {
		--detail-max: 1100px;
		--detail-prose-max: 720px;
	}

	/* ── Breadcrumb ──────────────────────────────────────────────────────────── */
	.breadcrumb {
		padding: 1.25rem 1.5rem 0;
	}
	.breadcrumb__inner {
		margin: 0 auto;
		max-width: var(--detail-max);
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.8125rem;
		color: var(--color-text);
		opacity: 0.55;
	}
	.breadcrumb__link {
		color: inherit;
		text-decoration: none;
		transition: opacity 0.15s;
	}
	.breadcrumb__link:hover { opacity: 1; }
	.breadcrumb__sep { opacity: 0.4; }
	.breadcrumb__current { font-weight: 500; }

	/* ── Shared tag pill ─────────────────────────────────────────────────────── */
	.tag {
		display: inline-flex;
		align-items: center;
		gap: 0.3em;
		border-radius: 9999px;
		padding: 0.25em 0.85em;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
	.tag-cases    { background: #e8f0f8; color: #1F3A5F; }
	.tag-projects { background: #f0ece8; color: #7A3E1F; }
	.tag-books    { background: #e8f3ec; color: #1F5F3A; }

	/* ── Hero ────────────────────────────────────────────────────────────────── */
	.detail-hero {
		padding: 3.5rem 1.5rem 4rem;
	}
	.detail-hero__inner {
		margin: 0 auto;
		max-width: var(--detail-max);
		display: grid;
		grid-template-columns: 1fr 340px;
		gap: 4rem;
		align-items: center;
	}
	@media (max-width: 820px) {
		.detail-hero__inner {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}
		.detail-hero__visual { order: -1; }
	}

	.detail-hero__meta {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1.25rem;
		flex-wrap: wrap;
	}
	.detail-hero__date {
		font-size: 0.8125rem;
		color: var(--color-text);
		opacity: 0.45;
		font-weight: 500;
	}
	.detail-hero__title {
		font-family: var(--font-headline);
		font-size: clamp(2rem, 5vw, 3.25rem);
		line-height: 1.1;
		color: var(--color-accent);
		margin-bottom: 0.75rem;
	}
	.detail-hero__subtitle {
		font-size: 1rem;
		color: var(--color-text);
		opacity: 0.55;
		margin-bottom: 1.5rem;
		font-style: italic;
	}
	.detail-hero__summary {
		font-size: 1.125rem;
		line-height: 1.75;
		color: var(--color-text);
		opacity: 0.75;
		max-width: 540px;
		margin-bottom: 2rem;
	}

	.detail-hero__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}
	.btn-primary {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		padding: 0.7rem 1.75rem;
		font-size: 0.875rem;
		font-weight: 600;
		background: var(--color-accent);
		color: #fff;
		text-decoration: none;
		transition: background 0.2s;
	}
	.btn-primary:hover { background: var(--color-accent-hover); }
	.btn-outline {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		padding: 0.7rem 1.75rem;
		font-size: 0.875rem;
		font-weight: 600;
		border: 1.5px solid var(--color-accent);
		color: var(--color-accent);
		text-decoration: none;
		transition: background 0.2s, color 0.2s;
	}
	.btn-outline:hover {
		background: var(--color-accent);
		color: #fff;
	}

	/* Cover image (books / projects) */
	.detail-hero__cover-wrap {
		position: relative;
		border-radius: 1.25rem;
		overflow: hidden;
		box-shadow:
			0 4px 20px rgb(26 26 26 / 0.12),
			0 1px 4px rgb(26 26 26 / 0.07);
		background: var(--color-secondary);
	}
	.detail-hero__cover {
		width: 100%;
		display: block;
		object-fit: cover;
		aspect-ratio: 3/4;
		transition: transform 0.6s var(--ease-decel);
	}
	.detail-hero__cover-wrap:hover .detail-hero__cover {
		transform: scale(1.03);
	}

	/* Emblem (cases / text-only) */
	.detail-hero__emblem {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 300px;
	}
	.detail-hero__emblem-icon {
		position: relative;
		z-index: 2;
		font-size: 5rem;
		filter: drop-shadow(0 8px 24px rgb(31 58 95 / 0.18));
	}
	.detail-hero__emblem-ring {
		position: absolute;
		border-radius: 9999px;
		border: 1.5px solid var(--color-accent);
		opacity: 0.12;
	}
	.ring1 { width: 160px; height: 160px; animation: pulse-ring 3s ease-in-out infinite; }
	.ring2 { width: 240px; height: 240px; animation: pulse-ring 3s ease-in-out infinite 0.6s; }
	.ring3 { width: 320px; height: 320px; animation: pulse-ring 3s ease-in-out infinite 1.2s; }
	@keyframes pulse-ring {
		0%, 100% { opacity: 0.06; transform: scale(1); }
		50%       { opacity: 0.18; transform: scale(1.04); }
	}

	/* ── Body ────────────────────────────────────────────────────────────────── */
	.detail-body {
		background: #fff;
		padding: 4rem 1.5rem;
	}
	.detail-body__inner {
		margin: 0 auto;
		max-width: var(--detail-max);
		display: grid;
		grid-template-columns: 1fr;
		gap: 3.5rem;
	}

	.detail-body__prose p {
		font-size: 1.0625rem;
		line-height: 1.82;
		color: var(--color-text);
		opacity: 0.8;
		max-width: var(--detail-prose-max);
		margin-bottom: 1.5rem;
	}
	.detail-body__prose p:last-child { margin-bottom: 0; }

	/* ── Secondary figure ────────────────────────────────────────────────────── */
	.detail-body__figure {
		max-width: var(--detail-prose-max);
		border-radius: 1.25rem;
		overflow: hidden;
		box-shadow:
			0 4px 20px rgb(26 26 26 / 0.1),
			0 1px 4px rgb(26 26 26 / 0.06);
	}
	.detail-body__figure-img {
		width: 100%;
		display: block;
		object-fit: cover;
	}

	/* ── Quote ───────────────────────────────────────────────────────────────── */
	.detail-quote {
		position: relative;
		background: var(--color-secondary);
		border-left: 4px solid var(--color-accent);
		border-radius: 0 1rem 1rem 0;
		padding: 2.25rem 2.5rem 2.25rem 3rem;
		max-width: var(--detail-prose-max);
	}
	.detail-quote__mark {
		position: absolute;
		top: 0.5rem;
		left: 1.25rem;
		font-family: var(--font-headline);
		font-size: 5rem;
		line-height: 1;
		color: var(--color-accent);
		opacity: 0.15;
		pointer-events: none;
		user-select: none;
	}
	.detail-quote__text {
		font-family: var(--font-headline);
		font-size: 1.2rem;
		line-height: 1.65;
		color: var(--color-accent);
		font-style: italic;
		position: relative;
		z-index: 1;
	}
	.detail-quote__attr {
		margin-top: 1rem;
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--color-text);
		opacity: 0.55;
		letter-spacing: 0.03em;
	}

	/* ── Accolades ───────────────────────────────────────────────────────────── */
	.detail-accolades {
		background: var(--color-bg);
		border: 1.5px solid var(--color-secondary);
		border-radius: 1.25rem;
		padding: 2rem 2.25rem;
		max-width: var(--detail-prose-max);
	}
	.detail-accolades__heading {
		font-family: var(--font-headline);
		font-size: 1.3rem;
		color: var(--color-accent);
		margin-bottom: 1.25rem;
	}
	.detail-accolades__list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	.detail-accolades__item {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		font-size: 0.9375rem;
		color: var(--color-text);
		opacity: 0.8;
		line-height: 1.5;
	}
	.detail-accolades__check {
		flex-shrink: 0;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 9999px;
		background: var(--color-accent);
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.7rem;
		font-weight: 700;
		margin-top: 0.05rem;
	}

	/* ── Timeline ────────────────────────────────────────────────────────────── */
	.detail-timeline {
		max-width: var(--detail-prose-max);
	}
	.detail-timeline__heading {
		font-family: var(--font-headline);
		font-size: 1.3rem;
		color: var(--color-accent);
		margin-bottom: 2rem;
	}
	.detail-timeline__list {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.detail-timeline__item {
		display: flex;
		gap: 1.25rem;
		align-items: flex-start;
	}
	.detail-timeline__node {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
		width: 1.25rem;
	}
	.detail-timeline__dot {
		width: 0.85rem;
		height: 0.85rem;
		border-radius: 9999px;
		background: var(--color-accent);
		flex-shrink: 0;
		margin-top: 0.3rem;
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 20%, transparent);
	}
	.detail-timeline__line {
		flex: 1;
		width: 2px;
		background: linear-gradient(to bottom, var(--color-accent) 0%, transparent 100%);
		opacity: 0.2;
		min-height: 2.5rem;
		margin-top: 0.25rem;
	}
	.detail-timeline__content {
		padding-bottom: 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}
	.detail-timeline__year {
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--color-accent);
		opacity: 0.7;
	}
	.detail-timeline__label {
		font-size: 0.9375rem;
		color: var(--color-text);
		opacity: 0.75;
		line-height: 1.55;
	}

	/* ── Related ─────────────────────────────────────────────────────────────── */
	.related {
		padding: 4rem 1.5rem;
		background: var(--color-bg);
	}
	.related__inner {
		margin: 0 auto;
		max-width: var(--detail-max);
	}
	.related__heading {
		font-family: var(--font-headline);
		font-size: clamp(1.5rem, 3vw, 2rem);
		color: var(--color-accent);
		margin-bottom: 2rem;
	}
	.related__grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
		gap: 1.5rem;
	}

	.related-card {
		display: flex;
		flex-direction: column;
		background: #fff;
		border: 1.5px solid var(--color-secondary);
		border-radius: 1.25rem;
		overflow: hidden;
		text-decoration: none;
		color: inherit;
		transition: transform 0.35s var(--ease-decel), box-shadow 0.35s var(--ease-decel);
		box-shadow: 0 1px 3px rgb(26 26 26 / 0.05);
	}
	.related-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 28px rgb(26 26 26 / 0.1);
	}
	.related-card__img-wrap {
		overflow: hidden;
		aspect-ratio: 4/3;
		background: var(--color-secondary);
	}
	.related-card__img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 0.5s var(--ease-decel);
	}
	.related-card:hover .related-card__img { transform: scale(1.06); }

	.related-card__emblem {
		aspect-ratio: 4/3;
		background: linear-gradient(135deg, var(--color-secondary) 0%, #fff 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 3.5rem;
	}

	.related-card__body {
		padding: 1.25rem 1.5rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		flex: 1;
	}
	.related-card__tag { align-self: flex-start; }
	.related-card__title {
		font-family: var(--font-headline);
		font-size: 1.125rem;
		line-height: 1.3;
		color: var(--color-accent);
	}
	.related-card__summary {
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--color-text);
		opacity: 0.65;
		flex: 1;
	}
	.related-card__cta {
		display: inline-block;
		margin-top: 0.5rem;
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--color-accent);
		opacity: 0.75;
		transition: opacity 0.15s;
	}
	.related-card:hover .related-card__cta { opacity: 1; }

	/* ── CTA ─────────────────────────────────────────────────────────────────── */
	.detail-cta {
		background: var(--color-accent);
		padding: 4rem 1.5rem;
		text-align: center;
	}
	.detail-cta__inner {
		margin: 0 auto;
		max-width: var(--detail-max);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
	}
	.detail-cta__line {
		font-family: var(--font-headline);
		font-size: clamp(1.25rem, 3vw, 1.75rem);
		color: #fff;
		opacity: 0.92;
	}

	/* Override Button colors inside the dark CTA */
	.detail-cta :global(a),
	.detail-cta :global(button) {
		background: #fff !important;
		color: var(--color-accent) !important;
	}
	.detail-cta :global(a:hover),
	.detail-cta :global(button:hover) {
		background: #e8f0f8 !important;
	}

	/* ── Volumes (accordion cards) ──────────────────────────────────────────── */
	.detail-volumes {
		max-width: var(--detail-prose-max);
	}
	.detail-volumes__heading {
		font-family: var(--font-headline);
		font-size: 1.3rem;
		color: var(--color-accent);
		margin-bottom: 1.5rem;
	}
	.detail-volumes__list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.volume-card {
		border: 1.5px solid var(--color-secondary);
		border-radius: 1rem;
		overflow: hidden;
		background: var(--color-bg);
		transition: box-shadow 0.25s ease;
	}
	.volume-card--open {
		box-shadow: 0 4px 16px rgb(26 26 26 / 0.08);
	}

	.volume-card__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 1.25rem 1.5rem;
		background: none;
		border: none;
		cursor: pointer;
		text-align: left;
		gap: 1rem;
	}
	.volume-card__header:hover {
		background: var(--color-secondary);
	}

	.volume-card__info {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}
	.volume-card__subtitle {
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-accent);
		opacity: 0.6;
	}
	.volume-card__title {
		font-family: var(--font-headline);
		font-size: 1.05rem;
		color: var(--color-text);
		line-height: 1.3;
	}
	.volume-card__year {
		font-size: 0.8rem;
		color: var(--color-text);
		opacity: 0.45;
		font-weight: 500;
	}

	.volume-card__chevron {
		flex-shrink: 0;
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		background: var(--color-secondary);
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--color-accent);
		transition: background 0.15s;
	}
	.volume-card__header:hover .volume-card__chevron {
		background: var(--color-accent);
		color: #fff;
	}

	.volume-card__summary {
		padding: 0 1.5rem 1.25rem;
		font-size: 0.9rem;
		line-height: 1.6;
		color: var(--color-text);
		opacity: 0.65;
	}

	.volume-card__body {
		padding: 0 1.5rem 1.5rem;
		border-top: 1px solid var(--color-secondary);
		padding-top: 1.25rem;
	}
	.volume-card__body p {
		font-size: 0.9375rem;
		line-height: 1.75;
		color: var(--color-text);
		opacity: 0.8;
		margin-bottom: 1rem;
	}
	.volume-card__body p:last-child {
		margin-bottom: 0;
	}

	.volume-card__accolades {
		list-style: none;
		padding: 0;
		margin: 1rem 0 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.volume-card__accolades li {
		display: inline-flex;
		align-items: center;
		gap: 0.4em;
		background: var(--color-secondary);
		border-radius: 9999px;
		padding: 0.3em 0.85em;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-text);
		opacity: 0.7;
	}
	.volume-card__accolades li::before {
		content: '✓';
		font-size: 0.65rem;
		font-weight: 700;
		color: var(--color-accent);
	}
</style>
