<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import Button from '$lib/components/Button.svelte';
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import CaseCard from '$lib/components/CaseCard.svelte';
	import BookCard from '$lib/components/BookCard.svelte';
	import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
	import { reveal } from '$lib/actions/reveal';

	const discoveringClubCoverSrc = '/images/wk2_Monday_Insta_v3.png';
	const SITE_URL = 'https://cynthiaclack.com';

	const workTabs = [
		{ id: 'cases' as const, label: 'Landmark Cases' },
		{ id: 'projects' as const, label: 'Projects' },
		{ id: 'books' as const, label: 'Books' }
	];

	type WorkSection = (typeof workTabs)[number]['id'];

	let activeSection = $state<WorkSection>('cases');

	function syncActiveFromHash() {
		if (!browser) return;
		const id = window.location.hash.slice(1);
		if (id === 'cases' || id === 'projects' || id === 'books') {
			activeSection = id;
		}
	}

	function scrollToSection(id: WorkSection) {
		activeSection = id;
		const el = document.getElementById(id);
		el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		history.replaceState(null, '', `#${id}`);
	}

	onMount(() => {
		syncActiveFromHash();
		window.addEventListener('hashchange', syncActiveFromHash);
		return () => window.removeEventListener('hashchange', syncActiveFromHash);
	});
</script>

<svelte:head>
	<title>Books, Cases & Creative Work — Cynthia L. Clack | Texas Attorney & Author</title>
	<meta name="description" content="Explore Cynthia L. Clack's landmark legal cases, published books (Discovering the Club, Crossing Together, Doodles series), and creative projects including the internationally performed rock opera Eye of the Tiger." />
	<meta property="og:title" content="Books, Cases & Creative Work — Cynthia L. Clack" />
	<meta property="og:description" content="Landmark cases, published books, and creative projects from Texas attorney and author Cynthia L. Clack — from wrongful conviction advocacy to an internationally performed rock opera." />
	<meta property="og:url" content="{SITE_URL}/work" />

	<!-- Book JSON-LD for rich results -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "ItemList",
		"name": "Books by Cynthia L. Clack",
		"itemListElement": [
			{
				"@type": "ListItem",
				"position": 1,
				"item": {
					"@type": "Book",
					"name": "Discovering the Club",
					"author": {
						"@type": "Person",
						"name": "Cynthia L. Clack"
					},
					"datePublished": "2024",
					"url": "${SITE_URL}/work#books",
					"description": "A powerful examination of patterns hidden inside the family court system — parental alienation, institutional failure, and the resilience of those caught in between.",
					"inLanguage": "en"
				}
			},
			{
				"@type": "ListItem",
				"position": 2,
				"item": {
					"@type": "Book",
					"name": "Crossing Together",
					"author": {
						"@type": "Person",
						"name": "Cynthia L. Clack"
					},
					"datePublished": "2017",
					"url": "${SITE_URL}/work#books",
					"inLanguage": "en"
				}
			},
			{
				"@type": "ListItem",
				"position": 3,
				"item": {
					"@type": "Book",
					"name": "Doodles the American Poodle",
					"author": {
						"@type": "Person",
						"name": "Cynthia L. Clack"
					},
					"url": "${SITE_URL}/work#books",
					"inLanguage": "en"
				}
			},
			{
				"@type": "ListItem",
				"position": 4,
				"item": {
					"@type": "Book",
					"name": "Doodles the American Hero",
					"author": {
						"@type": "Person",
						"name": "Cynthia L. Clack"
					},
					"url": "${SITE_URL}/work#books",
					"inLanguage": "en"
				}
			}
		]
	}
	<\/script>`}
</svelte:head>


<!-- Hero -->
<section class="py-section text-center">
	<div class="mx-auto max-w-[var(--width-content)] px-6">
		<h1 class="font-headline text-h1 leading-[var(--text-h1--line-height)]">My Work</h1>
		<p class="mt-2 font-headline text-xl text-text/60">Books, Projects &amp; Cases</p>
		<p class="mx-auto mt-4 max-w-[var(--width-text)] text-text/70">
			A career that spans the courtroom, the stage, and the written page.
		</p>
		<nav
			class="mx-auto mt-10 flex max-w-lg flex-wrap justify-center gap-2"
			aria-label="Jump to a work category"
		>
			{#each workTabs as tab}
				<button
					type="button"
					onclick={() => scrollToSection(tab.id)}
					class={`rounded-full border px-5 py-2.5 text-[13px] font-medium tracking-widest uppercase transition-colors duration-200 cursor-pointer ${
						activeSection === tab.id
							? 'border-accent bg-accent text-white'
							: 'border-secondary bg-white text-text/60 hover:border-accent/40'
					}`}
				>
					{tab.label}
				</button>
			{/each}
		</nav>
	</div>
</section>

<!-- Landmark Cases -->
<section id="cases" class="scroll-mt-24 bg-white py-section" use:reveal>
	<div class="mx-auto max-w-[var(--width-content)] px-6">
		<SectionHeading title="Landmark Cases" />
		<div class="grid gap-8 md:grid-cols-2">
			<CaseCard
				title="Johnny Foote's Story"
				dates="1992–2000"
				description="Exposing a multi-generational network of parental pimping and systematic abuse."
				href="#"
			/>
			<CaseCard
				title="The Emily Wu Case"
				dates="2000–2005"
				description="Cross-border ritualistic abuse and victim testimony that spanned continents."
				href="#"
			/>
		</div>
		<div class="mt-8 text-center">
			<button class="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline cursor-pointer">
				View detailed case examples <span aria-hidden="true">&rsaquo;</span>
			</button>
		</div>
	</div>
</section>

<!-- Projects & Creative Works -->
<section id="projects" class="scroll-mt-24 py-section" use:reveal>
	<div class="mx-auto max-w-[var(--width-content)] px-6">
		<SectionHeading title="Projects & Creative Works" />
		<div class="grid items-center gap-10 rounded-[var(--radius-card)] border border-secondary bg-white p-8 shadow-sm md:grid-cols-[280px_1fr]">
			<ImagePlaceholder label="Eye of the Tiger — Production Photo" aspect="4/3" class="w-full" />
			<div>
				<h3 class="font-headline text-h3 leading-[var(--text-h3--line-height)]">
					Eye of the Tiger — A Rock Opera
				</h3>
				<p class="mt-1 text-sm text-text/50">2000–2007</p>
				<p class="mt-4 text-text/70 leading-relaxed">
					Authored a rock opera in 2005, performed at Odessa's Globe of the Great Southwest
					Theater. Cynthia received two invitations from the Chinese government to perform
					the musical more than eight times in Beijing, Shanghai, and several other major
					cities in China in 2007.
				</p>
				<div class="mt-6">
					<Button href="#" variant="outline">Explore Project &rsaquo;</Button>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Books -->
<section id="books" class="scroll-mt-24 bg-white py-section" use:reveal>
	<div class="mx-auto max-w-[var(--width-content)] px-6">
		<SectionHeading title="Books" />
		<div class="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
			<BookCard
				title="Discovering the Club"
				year="2024"
				href="#"
				coverSrc={discoveringClubCoverSrc}
				coverAlt="Discovering the Club book cover by Cynthia L. Clack"
			/>
			<BookCard title="Crossing Together" year="2017" href="#" />
			<BookCard title="Doodles the American Poodle" href="#" />
			<BookCard title="Doodles the American Hero" href="#" />
		</div>
	</div>
</section>

<!-- CTA -->
<section class="py-section" use:reveal>
	<div class="mx-auto max-w-[var(--width-content)] px-6 text-center">
		<p class="mx-auto max-w-[var(--width-text)] text-text/70 leading-relaxed">
			Cynthia's work continues to evolve — from landmark legal cases to published books and
			creative projects that bring difficult truths to light.
		</p>
		<div class="mt-4 text-lg text-text/60">Interested in working with Cynthia?</div>
		<div class="mt-6">
			<Button href="/contact">Contact</Button>
		</div>
	</div>
</section>
