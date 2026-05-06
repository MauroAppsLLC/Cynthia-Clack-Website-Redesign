<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	// ─── Known routes ────────────────────────────────────────────────────────────

	interface Route {
		path: string;
		label: string;
		keywords: string[];
	}

	const ROUTES: Route[] = [
		{ path: '/', label: 'Home', keywords: ['home', 'index', 'main', 'attorney', 'lawyer', 'law'] },
		{ path: '/about', label: 'About', keywords: ['about', 'bio', 'biography', 'background', 'story', 'cynthia', 'clack', 'me'] },
		{ path: '/speaking', label: 'Speaking', keywords: ['speaking', 'speaker', 'keynote', 'talk', 'event', 'lecture', 'presentation'] },
		{ path: '/contact', label: 'Contact', keywords: ['contact', 'reach', 'email', 'phone', 'office', 'consult', 'consultation', 'touch', 'connect'] },
		{ path: '/work', label: 'Work', keywords: ['work', 'portfolio', 'cases', 'projects', 'books', 'writings'] },
		{
			path: '/work/johnny-foote',
			label: "Johnny Foote's Story",
			keywords: ['johnny', 'foote', 'wrongful', 'confession', 'murder', 'acquittal', 'odessa', 'case', 'landmark', 'innocent']
		},
		{
			path: '/work/emily-wu',
			label: 'The Emily Wu Case',
			keywords: ['emily', 'wu', 'international', 'kidnapping', 'custody', 'china', 'chinese', 'cross-border', 'abduction', 'case']
		},
		{
			path: '/work/eye-of-the-tiger',
			label: 'Eye of the Tiger',
			keywords: ['eye', 'tiger', 'rock', 'opera', 'musical', 'theater', 'theatre', 'libretto', 'lyrics', 'creative', 'project']
		},
		{
			path: '/work/discovering-the-club',
			label: 'Discovering the Club',
			keywords: ['discovering', 'club', 'publishing', 'network', 'book', 'author', 'guide', 'industry', 'literary']
		},
		{
			path: '/work/doodles-the-series',
			label: 'The Doodles Series',
			keywords: ['doodles', 'series', 'children', 'kids', 'book', 'poodle', 'ashley', 'american', 'hero', 'celebrity']
		}
	];

	// ─── Infinite-redirect guard ─────────────────────────────────────────────────

	const REDIRECT_GUARD_KEY = 'error_page_redirected';

	/** Returns true if we already attempted a redirect for this pathname in this session. */
	function hasAlreadyRedirected(pathname: string): boolean {
		try {
			const stored = sessionStorage.getItem(REDIRECT_GUARD_KEY);
			if (!stored) return false;
			const set: string[] = JSON.parse(stored);
			return set.includes(pathname);
		} catch {
			return false;
		}
	}

	/** Mark a pathname as having been redirected so we don't loop. */
	function markRedirected(pathname: string): void {
		try {
			const stored = sessionStorage.getItem(REDIRECT_GUARD_KEY);
			const set: string[] = stored ? JSON.parse(stored) : [];
			if (!set.includes(pathname)) set.push(pathname);
			sessionStorage.setItem(REDIRECT_GUARD_KEY, JSON.stringify(set));
		} catch {
			// sessionStorage unavailable — silently skip
		}
	}

	// ─── URL matching logic ──────────────────────────────────────────────────────

	/**
	 * Tokenise a URL path into lowercase words, stripping punctuation.
	 * e.g. "/work/johnny-foote-case" → ["work", "johnny", "foote", "case"]
	 */
	function tokenise(path: string): string[] {
		return path
			.toLowerCase()
			.replace(/[^a-z0-9\s]/g, ' ')
			.split(/\s+/)
			.filter(Boolean);
	}

	/** Return the route with the highest keyword overlap score, or null if no match. */
	function findBestMatch(pathname: string): Route | null {
		const tokens = tokenise(pathname);
		if (tokens.length === 0) return null;

		let best: Route | null = null;
		let bestScore = 0;

		for (const route of ROUTES) {
			let score = 0;
			for (const token of tokens) {
				// Exact keyword hit
				if (route.keywords.includes(token)) score += 2;
				// Partial keyword hit (token appears inside a keyword or vice versa)
				else if (route.keywords.some((kw) => kw.includes(token) || token.includes(kw))) score += 1;
			}
			if (score > bestScore) {
				bestScore = score;
				best = route;
			}
		}

		// Require at least one meaningful match; home is always the fallback
		return bestScore >= 2 ? best : null;
	}

	// ─── State ───────────────────────────────────────────────────────────────────

	let countdown = $state(5);
	let targetRoute = $state<Route | null>(null);
	let loopDetected = $state(false);

	// ─── Mount logic ─────────────────────────────────────────────────────────────

	onMount(() => {
		const pathname = page.url.pathname;

		// Guard: if we already redirected from this exact pathname, do NOT redirect
		// again. This breaks any potential infinite loop.
		if (hasAlreadyRedirected(pathname)) {
			loopDetected = true;
			targetRoute = null;
			return;
		}

		const referrer = typeof document !== 'undefined' ? document.referrer : '';
		const isFromSearchEngine =
			referrer.includes('google.') ||
			referrer.includes('googlebot') ||
			referrer.includes('bing.com') ||
			referrer.includes('yahoo.com') ||
			referrer.includes('duckduckgo.com');

		const matched = findBestMatch(pathname);

		// If from a search engine and no confident match, go home immediately
		if (isFromSearchEngine && !matched) {
			markRedirected(pathname);
			goto('/', { replaceState: true });
			return;
		}

		targetRoute = matched;

		// Count down and redirect
		const interval = setInterval(() => {
			countdown -= 1;
			if (countdown <= 0) {
				clearInterval(interval);
				markRedirected(pathname);
				goto(targetRoute?.path ?? '/', { replaceState: true });
			}
		}, 1000);

		return () => clearInterval(interval);
	});

	// Derived values for the template
	const destination = $derived(targetRoute?.path ?? '/');
	const destinationLabel = $derived(targetRoute?.label ?? 'Home');
	const statusCode = $derived(page.status);
</script>

<svelte:head>
	<title>Page Not Found · Cynthia L. Clack</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<section class="error-page">
	<div class="error-bg-shapes" aria-hidden="true">
		<div class="shape shape-1"></div>
		<div class="shape shape-2"></div>
		<div class="shape shape-3"></div>
	</div>

	<div class="error-content">
		<!-- Status badge -->
		<div class="error-badge">
			<span class="error-code">{statusCode}</span>
		</div>

		<!-- Headline -->
		<h1 class="error-title">This page has moved</h1>
		<p class="error-message">
			{#if targetRoute}
				We found a page that looks like what you were looking for.
			{:else}
				We couldn't find an exact match, but we'll take you somewhere helpful.
			{/if}
		</p>

		<!-- Redirect info -->
		<div class="redirect-card" aria-live="polite">
			<div class="redirect-icon" aria-hidden="true">
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M3 10H17M17 10L11 4M17 10L11 16" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</div>
			<p class="redirect-text">
				Redirecting you to <strong>{destinationLabel}</strong> in <strong>{countdown}</strong> second{countdown !== 1 ? 's' : ''}…
			</p>
		</div>

		<!-- Action buttons -->
		<div class="error-actions">
			<a href={destination} class="btn-primary">
				Go to {destinationLabel} now
			</a>
			<a href="/" class="btn-ghost">
				Return to Home
			</a>
		</div>

		<!-- Quick nav -->
		<nav class="quick-nav" aria-label="Quick navigation">
			<p class="quick-nav-label">Or explore the site:</p>
			<ul class="quick-nav-links">
				<li><a href="/about">About</a></li>
				<li><a href="/work">Work</a></li>
				<li><a href="/speaking">Speaking</a></li>
				<li><a href="/contact">Contact</a></li>
			</ul>
		</nav>
	</div>
</section>

<style>
	/* ─── Layout ────────────────────────────────────────────────────────────── */
	.error-page {
		position: relative;
		min-height: calc(100vh - 72px);
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		padding: 3rem 1.5rem;
	}

	/* ─── Background shapes ─────────────────────────────────────────────────── */
	.error-bg-shapes {
		position: absolute;
		inset: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.shape {
		position: absolute;
		border-radius: 50%;
		opacity: 0.06;
		background: var(--color-accent);
	}

	.shape-1 {
		width: 600px;
		height: 600px;
		top: -200px;
		right: -150px;
		animation: float-1 18s ease-in-out infinite;
	}

	.shape-2 {
		width: 400px;
		height: 400px;
		bottom: -100px;
		left: -100px;
		opacity: 0.04;
		animation: float-2 22s ease-in-out infinite;
	}

	.shape-3 {
		width: 200px;
		height: 200px;
		top: 40%;
		left: 20%;
		opacity: 0.035;
		animation: float-1 14s ease-in-out infinite reverse;
	}

	@keyframes float-1 {
		0%, 100% { transform: translate(0, 0); }
		50% { transform: translate(20px, -30px); }
	}

	@keyframes float-2 {
		0%, 100% { transform: translate(0, 0); }
		50% { transform: translate(-15px, 25px); }
	}

	/* ─── Content ───────────────────────────────────────────────────────────── */
	.error-content {
		position: relative;
		z-index: 1;
		max-width: 540px;
		width: 100%;
		text-align: center;
	}

	/* ─── Status badge ──────────────────────────────────────────────────────── */
	.error-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 80px;
		height: 80px;
		border-radius: 50%;
		background: color-mix(in srgb, var(--color-accent) 10%, transparent);
		border: 2px solid color-mix(in srgb, var(--color-accent) 20%, transparent);
		margin-bottom: 1.75rem;
	}

	.error-code {
		font-family: var(--font-headline);
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color-accent);
		letter-spacing: -0.02em;
	}

	/* ─── Title & message ───────────────────────────────────────────────────── */
	.error-title {
		font-family: var(--font-headline);
		font-size: clamp(2rem, 5vw, 3rem);
		font-weight: 700;
		color: var(--color-text);
		line-height: 1.1;
		margin: 0 0 0.75rem;
	}

	.error-message {
		font-size: 1.0625rem;
		color: color-mix(in srgb, var(--color-text) 65%, transparent);
		margin: 0 0 2rem;
		line-height: 1.6;
	}

	/* ─── Redirect card ─────────────────────────────────────────────────────── */
	.redirect-card {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		background: color-mix(in srgb, var(--color-accent) 7%, transparent);
		border: 1px solid color-mix(in srgb, var(--color-accent) 15%, transparent);
		border-radius: 0.75rem;
		padding: 0.875rem 1.25rem;
		margin-bottom: 2rem;
		text-align: left;
	}

	.redirect-icon {
		flex-shrink: 0;
		color: var(--color-accent);
		display: flex;
		align-items: center;
	}

	.redirect-text {
		font-size: 0.9375rem;
		color: var(--color-text);
		margin: 0;
		line-height: 1.5;
	}

	.redirect-text strong {
		color: var(--color-accent);
	}

	/* ─── Action buttons ────────────────────────────────────────────────────── */
	.error-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		justify-content: center;
		margin-bottom: 2.5rem;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		background: var(--color-accent);
		color: #fff;
		border-radius: var(--radius-pill);
		font-size: 0.9375rem;
		font-weight: 600;
		text-decoration: none;
		transition:
			background var(--duration-short) var(--ease-soft),
			transform var(--duration-short) var(--ease-soft);
	}

	.btn-primary:hover {
		background: var(--color-accent-hover);
		transform: translateY(-1px);
	}

	.btn-ghost {
		display: inline-flex;
		align-items: center;
		padding: 0.75rem 1.5rem;
		border: 1.5px solid color-mix(in srgb, var(--color-accent) 30%, transparent);
		color: var(--color-accent);
		border-radius: var(--radius-pill);
		font-size: 0.9375rem;
		font-weight: 600;
		text-decoration: none;
		transition:
			border-color var(--duration-short) var(--ease-soft),
			background var(--duration-short) var(--ease-soft),
			transform var(--duration-short) var(--ease-soft);
	}

	.btn-ghost:hover {
		border-color: var(--color-accent);
		background: color-mix(in srgb, var(--color-accent) 8%, transparent);
		transform: translateY(-1px);
	}

	/* ─── Quick nav ─────────────────────────────────────────────────────────── */
	.quick-nav {
		border-top: 1px solid color-mix(in srgb, var(--color-text) 10%, transparent);
		padding-top: 1.5rem;
	}

	.quick-nav-label {
		font-size: 0.8125rem;
		color: color-mix(in srgb, var(--color-text) 50%, transparent);
		margin: 0 0 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.quick-nav-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.5rem;
		justify-content: center;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.quick-nav-links a {
		font-size: 0.9375rem;
		color: var(--color-accent);
		text-decoration: none;
		font-weight: 500;
		transition: color var(--duration-short) var(--ease-soft);
	}

	.quick-nav-links a:hover {
		color: var(--color-accent-hover);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	/* ─── Reduced motion ────────────────────────────────────────────────────── */
	@media (prefers-reduced-motion: reduce) {
		.shape {
			animation: none;
		}
		.btn-primary:hover,
		.btn-ghost:hover {
			transform: none;
		}
	}
</style>
