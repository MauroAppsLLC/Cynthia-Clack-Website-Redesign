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
	const doodlesSrc = '/images/SKMBT_C35313012115410.jpg'; 
  const EyeOfTheTigerSrc = '/images/EyeoftheTiger.png'; 

	const SITE_URL = 'https://cynthiaclack.com';

	const workTabs = [
		{ id: 'cases' as const, label: 'Landmark Cases' },
		{ id: 'projects' as const, label: 'Projects' },
		{ id: 'books' as const, label: 'Books' }
	];

	type WorkSection = (typeof workTabs)[number]['id'];

	let activeSection = $state<WorkSection>('cases');
	let isScrolling = false;
	let scrollTimeout: ReturnType<typeof setTimeout>;

	function syncActiveFromHash() {
		if (!browser) return;
		const id = window.location.hash.slice(1);
		if (id === 'cases' || id === 'projects' || id === 'books') {
			activeSection = id;
		}
	}

	function scrollToSection(id: WorkSection) {
		activeSection = id;
		const section = document.getElementById(id);
		if (section) {
			isScrolling = true;
			// Target the heading inside the section, not the section top (which has 104px top padding)
			const heading = section.querySelector('h2, h3') as HTMLElement | null;
			const target = heading ?? section;
			// Subtract 165px to clear sticky nav+tabs and leave comfortable breathing room above the heading
			const y = target.getBoundingClientRect().top + window.scrollY - 165;
			window.scrollTo({ top: y, behavior: 'smooth' });
			history.replaceState(null, '', `#${id}`);
			
			clearTimeout(scrollTimeout);
			scrollTimeout = setTimeout(() => {
				isScrolling = false;
			}, 800);
		}
	}

	function handleScroll() {
		if (isScrolling || !browser) return;
		
		const sections = ['cases', 'projects', 'books'].map(id => document.getElementById(id));
		let currentSection = activeSection;

		for (const section of sections) {
			if (!section) continue;
			// Get the heading element inside the section (skips the 104px py-section top padding)
			const heading = section.querySelector('h2, h3') as HTMLElement | null;
			const target = heading ?? section;
			const rect = target.getBoundingClientRect();
			// Switch when the heading comes into the top 230px of the viewport (triggers earlier)
			if (rect.top <= 230 && rect.bottom >= 60) {
				currentSection = section.id as WorkSection;
			}
		}

		if (activeSection !== currentSection) {
			activeSection = currentSection;
			history.replaceState(null, '', `#${currentSection}`);
		}
	}

	onMount(() => {
		syncActiveFromHash();
		window.addEventListener('hashchange', syncActiveFromHash);
		return () => {
			window.removeEventListener('hashchange', syncActiveFromHash);
		};
	});
</script>

<svelte:window onscroll={handleScroll} />

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
					"datePublished": "2026",
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
<section class="pt-6 pb-4 md:py-section text-center" use:reveal>
	<div class="mx-auto max-w-[var(--width-content)] px-6">
		<h1 class="font-headline text-4xl md:text-h1 leading-[var(--text-h1--line-height)]">My Work</h1>
		<p class="mt-2 font-headline text-xl text-text/60">Books, Projects &amp; Cases</p>
		<p class="mx-auto mt-4 max-w-[var(--width-text)] text-text/70">
			A career that spans the courtroom, the stage, and the written page.
		</p>
	</div>
</section>

<!-- Sticky Tabs -->
<div class="sticky top-[65px] z-40 border-b border-secondary/30 bg-bg/95 backdrop-blur-md">
	<div class="overflow-x-auto scrollbar-none">
		<nav
			class="mx-auto flex w-max min-w-full max-w-[var(--width-content)] items-center justify-center gap-2 px-4 py-3 md:px-6 md:py-4"
			aria-label="Jump to a work category"
		>
			{#each workTabs as tab}
				<button
					type="button"
					onclick={() => scrollToSection(tab.id)}
					class={`cursor-pointer whitespace-nowrap rounded-full border px-4 py-2 text-[11px] font-semibold tracking-widest uppercase transition-colors duration-200 md:px-5 md:py-2.5 md:text-[13px] ${
						activeSection === tab.id
							? 'border-accent bg-accent text-white shadow-sm'
							: 'border-secondary bg-white text-text/60 hover:border-accent/40'
					}`}
				>
					{tab.label}
				</button>
			{/each}
		</nav>
	</div>
</div>


<!-- Landmark Cases -->
<section id="cases" class="scroll-mt-32 md:scroll-mt-40 bg-white py-section" use:reveal>
	<div class="mx-auto max-w-[var(--width-content)] px-6">
		<SectionHeading title="Landmark Cases" />
		<div class="grid gap-8 md:grid-cols-2">
			<CaseCard
				title="Johnny Foote's Story"
				dates="1992-2000"
				description="Exposing a multi-generational network of parental pimping and systematic abuse."
				href="#"
			/>
			<CaseCard
				title="The Emily Wu Case"
				dates="2000-2005"
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
<section id="projects" class="scroll-mt-32 md:scroll-mt-40 py-section" use:reveal>
	<div class="mx-auto max-w-[var(--width-content)] px-6">
		<SectionHeading title="Projects & Creative Works" />
		<div class="grid items-center gap-10 rounded-[var(--radius-card)] border border-secondary bg-white p-8 shadow-card md:grid-cols-[280px_1fr]">
			<img
				src={EyeOfTheTigerSrc}
				alt="Eye of the Tiger - A Rock Opera by Cynthia L. Clack"
				class="aspect-[3/4] w-full object-cover rounded-[var(--radius-card)] shadow-sm"
				loading="lazy"
			/>
			<div>
				<h3 class="font-headline text-h3 leading-[var(--text-h3--line-height)]">
					Eye of the Tiger — A Rock Opera
				</h3>
				<p class="mt-1 text-sm text-text/50">2005-2007</p>
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
<section id="books" class="scroll-mt-32 md:scroll-mt-40 bg-white py-section" use:reveal>
	<div class="mx-auto max-w-[var(--width-content)] px-6">
		<SectionHeading title="Books" />
		<div class="flex flex-wrap justify-center gap-8">
			<BookCard
				title="Discovering the Club"
				year="2026"
				href="#"
				coverSrc={discoveringClubCoverSrc}
				coverAlt="Discovering the Club book cover by Cynthia L. Clack"
			/>
			<BookCard title="Crossing Together" year="2017" href="#" />
			<BookCard title="Doodles the American Hero" year="2007" href="#"
        coverSrc={doodlesSrc}
				coverAlt="Doodles the American Hero book cover by Cynthia L. Clack"
        />
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
