<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/state';

	let { children } = $props();

	const SITE_URL = 'https://cynthiaclack.com';

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
<main class="pt-[72px] md:pt-[102px]">
	{#key transitionKey}
		<div class={transitionKey > 0 ? 'page-transition' : ''}>
			{@render children()}
		</div>
	{/key}
</main>
<Footer />

