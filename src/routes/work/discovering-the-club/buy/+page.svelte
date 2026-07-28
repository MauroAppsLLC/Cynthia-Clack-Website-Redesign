<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { reveal } from '$lib/actions/reveal';

	const SITE_URL = 'https://cynthiaclack.com';
	const BOOK_TITLE = 'Discovering the Club';
	const COVER_SRC = '/images/discovering_the_club_final.jpeg';

	interface Retailer {
		name: string;
		href: string;
		logoSrc: string;
		logoAlt: string;
	}

	const retailers: Retailer[] = [
		{
			name: 'Amazon',
			href: 'https://www.amazon.com/dp/196662977X',
			logoSrc: '/images/retailers/amazon.svg',
			logoAlt: 'Amazon',
		},
		{
			name: 'Porchlight Books',
			href: 'https://www.porchlightbooks.com/products/discovering-the-club-cynthia-l-clack-9781966629771',
			logoSrc: '/images/retailers/porchlight.jpg',
			logoAlt: 'Porchlight Books',
		},
	];
</script>

<SEO
	title="Where to Buy — {BOOK_TITLE} | Cynthia L. Clack"
	description="{BOOK_TITLE} by Cynthia L. Clack, J.D. is available at major retailers and bookstores."
	image="{SITE_URL}{COVER_SRC}"
/>

<section class="buy-page" use:reveal>
	<!-- Hero -->
	<div class="buy-hero">
		<div class="buy-hero__inner">
			<div class="buy-hero__cover">
				<img src={COVER_SRC} alt="{BOOK_TITLE} book cover" />
			</div>
			<div class="buy-hero__text">
				<h1 class="buy-hero__heading">Where to Buy</h1>
				<div class="buy-hero__divider">
					<span class="buy-hero__diamond"></span>
				</div>
				<p class="buy-hero__desc">
					<em>{BOOK_TITLE}</em> is available at major retailers and bookstores.
				</p>
			</div>
		</div>
	</div>

	<!-- Retailers -->
	<div class="buy-retailers">
		<h2 class="buy-retailers__heading">Buy Online</h2>
		<div class="buy-retailers__grid">
			{#each retailers as retailer}
				<a
					href={retailer.href}
					target="_blank"
					rel="noopener noreferrer"
					class="retailer-card"
				>
				<div class="retailer-card__logo">
					<img
						src={retailer.logoSrc}
						alt={retailer.logoAlt}
						class="retailer-card__logo-img"
						class:retailer-card__logo-img--round={retailer.name === 'Porchlight Books'}
					/>
				</div>
					<span class="retailer-card__name">{retailer.name}</span>
					<span class="retailer-card__btn">Buy Now</span>
				</a>
			{/each}
		</div>
	</div>

	<!-- Help CTA -->
	<div class="buy-help">
		<div class="buy-help__divider">
			<span class="buy-help__diamond"></span>
		</div>
		<div class="buy-help__inner">
			<div class="buy-help__icon">?</div>
			<div class="buy-help__text">
				<h3 class="buy-help__heading">Questions?</h3>
				<p class="buy-help__desc">Having trouble finding the book?<br />Contact us — we're happy to help.</p>
			</div>
		</div>
		<a href="/contact" class="buy-help__btn">Contact</a>
	</div>
</section>

<style>
	.buy-page {
		--detail-max: 900px;
		padding-bottom: 4rem;
		background: var(--color-bg);
	}

	/* ── Hero ─────────────────────────────────────────────────────────── */
	.buy-hero {
		padding: 4rem 1.5rem 3rem;
	}
	.buy-hero__inner {
		max-width: var(--detail-max);
		margin: 0 auto;
		display: flex;
		align-items: center;
		gap: 3rem;
	}
	.buy-hero__cover {
		flex-shrink: 0;
		width: 180px;
		border-radius: 0.5rem;
		overflow: hidden;
		box-shadow:
			0 8px 30px rgb(26 26 26 / 0.15),
			0 2px 8px rgb(26 26 26 / 0.08);
	}
	.buy-hero__cover img {
		width: 100%;
		display: block;
		object-fit: cover;
	}
	.buy-hero__text {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.buy-hero__heading {
		font-family: var(--font-headline);
		font-size: clamp(2rem, 5vw, 3rem);
		color: var(--color-accent);
		line-height: 1.1;
	}
	.buy-hero__divider {
		display: flex;
		align-items: center;
		gap: 1rem;
		width: 100%;
		max-width: 280px;
	}
	.buy-hero__divider::before,
	.buy-hero__divider::after {
		content: '';
		flex: 1;
		height: 1px;
		background: var(--color-accent);
		opacity: 0.25;
	}
	.buy-hero__diamond {
		width: 8px;
		height: 8px;
		background: var(--color-accent);
		opacity: 0.35;
		transform: rotate(45deg);
		flex-shrink: 0;
	}
	.buy-hero__desc {
		font-size: 1.0625rem;
		line-height: 1.6;
		color: var(--color-text);
		opacity: 0.7;
	}

	@media (max-width: 640px) {
		.buy-hero__inner {
			flex-direction: column;
			text-align: center;
			align-items: center;
			gap: 2rem;
		}
		.buy-hero__cover {
			width: 150px;
		}
		.buy-hero__text {
			align-items: center;
		}
	}

	/* ── Retailers Grid ───────────────────────────────────────────────── */
	.buy-retailers {
		padding: 0 1.5rem 3rem;
		max-width: var(--detail-max);
		margin: 0 auto;
	}
	.buy-retailers__heading {
		font-family: var(--font-headline);
		font-size: clamp(1.25rem, 3vw, 1.75rem);
		color: var(--color-text);
		text-align: center;
		margin-bottom: 2rem;
	}
	.buy-retailers__grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.25rem;
		max-width: 560px;
		margin: 0 auto;
	}
	@media (max-width: 480px) {
		.buy-retailers__grid {
			grid-template-columns: 1fr;
			max-width: 300px;
		}
	}

	/* ── Retailer Card ────────────────────────────────────────────────── */
	.retailer-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 1.75rem 1.25rem 1.5rem;
		background: #fff;
		border: 1.5px solid var(--color-secondary);
		border-radius: var(--radius-card);
		text-decoration: none;
		color: inherit;
		transition: transform 0.3s var(--ease-decel), box-shadow 0.3s var(--ease-decel);
		box-shadow: 0 1px 4px rgb(26 26 26 / 0.04);
	}
	.retailer-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 24px rgb(26 26 26 / 0.1);
	}

	.retailer-card__logo {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 3.5rem;
	}
	.retailer-card__logo-img {
		height: 2.5rem;
		width: auto;
		max-width: 140px;
		object-fit: contain;
	}
	.retailer-card__logo-img--round {
		height: 3.25rem;
		width: 3.25rem;
		border-radius: 50%;
		object-fit: cover;
	}

	.retailer-card__name {
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--color-text);
		opacity: 0.6;
	}
	.retailer-card__btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem 1.5rem;
		border-radius: var(--radius-pill);
		background: var(--color-accent);
		color: #fff;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		transition: background 0.2s;
	}
	.retailer-card:hover .retailer-card__btn {
		background: var(--color-accent-hover);
	}

	/* ── Help CTA ─────────────────────────────────────────────────────── */
	.buy-help {
		max-width: var(--detail-max);
		margin: 2rem auto 0;
		padding: 0 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
	}
	.buy-help__divider {
		display: flex;
		align-items: center;
		gap: 1rem;
		width: 100%;
		max-width: 400px;
	}
	.buy-help__divider::before,
	.buy-help__divider::after {
		content: '';
		flex: 1;
		height: 1px;
		background: var(--color-accent);
		opacity: 0.15;
	}
	.buy-help__diamond {
		width: 8px;
		height: 8px;
		background: var(--color-accent);
		opacity: 0.25;
		transform: rotate(45deg);
		flex-shrink: 0;
	}
	.buy-help__inner {
		display: flex;
		align-items: flex-start;
		gap: 1.25rem;
	}
	.buy-help__icon {
		flex-shrink: 0;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		border: 2px solid var(--color-accent);
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-headline);
		font-size: 1.5rem;
		color: var(--color-accent);
		opacity: 0.6;
	}
	.buy-help__heading {
		font-family: var(--font-headline);
		font-size: 1.25rem;
		color: var(--color-text);
		margin-bottom: 0.25rem;
	}
	.buy-help__desc {
		font-size: 0.9375rem;
		line-height: 1.6;
		color: var(--color-text);
		opacity: 0.6;
	}
	.buy-help__btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.65rem 2rem;
		border-radius: var(--radius-pill);
		background: var(--color-accent);
		color: #fff;
		font-size: 0.8125rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		text-decoration: none;
		transition: background 0.2s;
	}
	.buy-help__btn:hover {
		background: var(--color-accent-hover);
	}

	@media (max-width: 480px) {
		.buy-help__inner {
			flex-direction: column;
			align-items: center;
			text-align: center;
		}
	}
</style>
