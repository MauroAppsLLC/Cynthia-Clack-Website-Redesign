<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/state';

	let { children } = $props();

	const SITE_URL = 'https://cynthiaclack.com';
	const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

	const canonicalUrl = $derived(`${SITE_URL}${page.url.pathname}`);

	// Each time the pathname changes, increment a key so the <div>
	// is replaced in the DOM and the page-transition animation re-fires.
	// The `mounted` guard prevents the animation from playing on initial
	// page load / refresh (only real SPA navigations should trigger it).
	let transitionKey = $state(0);
	let currentPath = $state('');
	let mounted = $state(false);

	$effect(() => {
		const path = page.url.pathname;
		if (!mounted) {
			mounted = true;
			currentPath = path;
			return;
		}
		if (path !== currentPath) {
			currentPath = path;
			transitionKey += 1;
		}
	});
</script>

<svelte:head>
	<title>Cynthia L. Clack — Attorney. Author. Advocate.</title>
	<meta name="description" content="Cynthia L. Clack is a Texas Board-Certified Family Law attorney, author, and advocate with over 40 years of legal experience in Odessa, TX. Handling high-conflict custody, complex divorce, and landmark advocacy cases." />

	<!-- Canonical -->
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Cynthia L. Clack" />
	<meta property="og:title" content="Cynthia L. Clack — Attorney. Author. Advocate." />
	<meta property="og:description" content="Texas Board-Certified Family Law attorney with 40+ years of experience. Author of Discovering the Club. Advocate for families and the overlooked." />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Cynthia L. Clack — Attorney, Author, Advocate" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Cynthia L. Clack — Attorney. Author. Advocate." />
	<meta name="twitter:description" content="Texas Board-Certified Family Law attorney, author, and advocate with 40+ years of experience in Odessa, TX." />
	<meta name="twitter:image" content={OG_IMAGE} />
	<meta name="twitter:image:alt" content="Cynthia L. Clack — Attorney, Author, Advocate" />

	<!-- Organization + Person JSON-LD (site-wide entity establishment) -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Organization",
				"@id": "${SITE_URL}/#organization",
				"name": "Law Offices of Cynthia L. Clack",
				"url": "${SITE_URL}",
				"logo": {
					"@type": "ImageObject",
					"url": "${SITE_URL}/favicon.svg"
				},
				"address": {
					"@type": "PostalAddress",
					"streetAddress": "522 N Grant Ave",
					"addressLocality": "Odessa",
					"addressRegion": "TX",
					"postalCode": "79761",
					"addressCountry": "US"
				},
				"telephone": "+14323378511",
				"email": "cynthia.l.clack@gmail.com",
				"sameAs": [
					"${SITE_URL}"
				]
			},
			{
				"@type": "Person",
				"@id": "${SITE_URL}/#person",
				"name": "Cynthia L. Clack",
				"jobTitle": "Attorney at Law",
				"description": "Texas Board-Certified Family Law attorney, author, and advocate with over 40 years of legal experience in Odessa, Texas.",
				"url": "${SITE_URL}",
				"worksFor": {
					"@id": "${SITE_URL}/#organization"
				},
				"address": {
					"@type": "PostalAddress",
					"streetAddress": "522 N Grant Ave",
					"addressLocality": "Odessa",
					"addressRegion": "TX",
					"postalCode": "79761",
					"addressCountry": "US"
				},
				"knowsAbout": ["Family Law", "High-Conflict Custody", "Parental Alienation", "Wrongful Conviction Advocacy", "International Child Custody"],
				"hasOccupation": {
					"@type": "Occupation",
					"name": "Attorney",
					"occupationLocation": {
						"@type": "City",
						"name": "Odessa, Texas"
					}
				}
			}
		]
	}
	<\/script>`}
</svelte:head>

<Nav />
<main class="pt-[72px]">
	{#key transitionKey}
		<div class={transitionKey > 0 ? 'page-transition' : ''}>
			{@render children()}
		</div>
	{/key}
</main>
<Footer />

