<script lang="ts">
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import CaseCard from '$lib/components/CaseCard.svelte';
	import BookCard from '$lib/components/BookCard.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { getByCategory } from '$lib/data/work';

	const cases    = getByCategory('cases');
	const projects = getByCategory('projects');
	const books    = getByCategory('books');

	const discoveringClubCoverSrc = '/images/discovering_the_club_final.jpeg';
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

	function scrollToSection(id: WorkSection) {
		activeSection = id;
		const section = document.getElementById(id);
		if (section) {
			isScrolling = true;
			// Target the heading inside the section
			const heading = section.querySelector('h2, h3') as HTMLElement | null;
			const target = heading ?? section;
			// Subtract offset for sticky nav+tabs
			const y = target.getBoundingClientRect().top + window.scrollY - 165;
			window.scrollTo({ top: y, behavior: 'smooth' });
			
			// DO NOT update history state here. SvelteKit manages scroll state based on the current URL.
			// Altering the hash interferes with SvelteKit's popstate and native scroll restoration.
			
			clearTimeout(scrollTimeout);
			scrollTimeout = setTimeout(() => {
				isScrolling = false;
				// Sync once smooth scroll finishes to ensure accuracy
				syncActiveFromScroll();
			}, 800);
		}
	}

	/** Derive the active section from current scroll position. */
	function syncActiveFromScroll() {
		if (!browser) return;
		const ids = ['cases', 'projects', 'books'] as const;
		let detected: WorkSection = activeSection;
		for (const id of ids) {
			const section = document.getElementById(id);
			if (!section) continue;
			const heading = section.querySelector('h2, h3') as HTMLElement | null;
			const rect = (heading ?? section).getBoundingClientRect();
			// Switch when the heading comes into the top portion of the viewport
			if (rect.top <= 230 && rect.bottom >= 60) {
				detected = id;
			}
		}
		if (activeSection !== detected) {
			activeSection = detected;
		}
	}

	function handleScroll() {
		if (isScrolling || !browser) return;
		syncActiveFromScroll();
	}

	afterNavigate(() => {
		// Runs on initial load and after back/forward navigations.
		// SvelteKit restores scroll position before this runs.
		// Use a short delay to ensure the browser has finished painting any layout shifts.
		setTimeout(() => {
			syncActiveFromScroll();
		}, 50);
	});

	const jsonLd = {
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
					"url": `${SITE_URL}/work#books`,
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
					"url": `${SITE_URL}/work#books`,
					"inLanguage": "en"
				}
			},
			{
				"@type": "ListItem",
				"position": 3,
				"item": {
					"@type": "BookSeries",
					"name": "The Doodles Series",
					"author": {
						"@type": "Person",
						"name": "Cynthia L. Clack"
					},
					"url": `${SITE_URL}/work/doodles-the-series`,
					"description": "A children's book series following the adventures of Doodles, a loveable teacup poodle.",
					"inLanguage": "en"
				}
			}
		]
	};
</script>

<svelte:window onscroll={handleScroll} />

<SEO 
	title="Books, Cases &amp; Creative Work — Cynthia L. Clack | Texas Attorney &amp; Author"
	description="Explore Cynthia L. Clack's landmark legal cases, published books (Discovering the Club, Crossing Together, Doodles series), and creative projects including the internationally performed rock opera Eye of the Tiger."
	keywords={["Cynthia Clack books", "Discovering the Club", "Eye of the Tiger rock opera", "Texas landmark cases"]}
	{jsonLd}
/>

<!-- Hero -->
<section class="pt-6 pb-4 md:py-section text-center" use:reveal={{ distance: 10, duration: 600 }}>
	<div class="mx-auto max-w-[var(--width-content)] px-6">
		<h1 class="font-headline text-4xl md:text-h1 leading-[var(--text-h1--line-height)]">My Work</h1>
		<p class="mt-2 font-headline text-xl text-text/60">Books, Projects &amp; Cases</p>
		<p class="mx-auto mt-4 max-w-[var(--width-text)] text-text/70">
			A career that spans the courtroom, the stage, and the written page.
		</p>
	</div>
</section>

<!-- Sticky Tabs -->
<div class="sticky top-[65px] md:top-[95px] z-40 border-b border-secondary/30 bg-bg/95 backdrop-blur-md">
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
<section id="cases" class="scroll-mt-32 md:scroll-mt-48 bg-white py-section" use:reveal>
	<div class="mx-auto max-w-[var(--width-content)] px-6">
		<SectionHeading title="Landmark Cases" subtitle="Four decades of fighting for justice — case by case." />
		<div class="grid gap-8 md:grid-cols-2">
			{#each cases as c}
				<CaseCard
					title={c.title}
					dates={c.dates ?? ''}
					description={c.summary}
					href="/work/{c.slug}"
					isPlaceholder={c.isPlaceholder}
				/>
			{/each}
		</div>
	</div>
</section>

<!-- Projects & Creative Works -->
<section id="projects" class="scroll-mt-32 md:scroll-mt-48 py-section" use:reveal>
	<div class="mx-auto max-w-[var(--width-content)] px-6">
		<SectionHeading title="Projects &amp; Creative Works" subtitle="Beyond the courtroom — storytelling as advocacy." />
		<div class="grid gap-8 md:grid-cols-2">
			<!-- Eye of the Tiger — featured with image -->
			<div class="grid items-center gap-8 rounded-[var(--radius-card)] border border-secondary bg-white p-8 shadow-card md:grid-cols-[200px_1fr] md:col-span-2">
				<img
					src={EyeOfTheTigerSrc}
					alt="Eye of the Tiger - A Rock Opera by Cynthia L. Clack"
					class="aspect-[3/4] w-full object-cover rounded-[var(--radius-card)] shadow-sm"
					loading="lazy"
				/>
				<div>
					<span class="inline-block mb-2 rounded-full bg-[#f0ece8] px-3 py-1 text-[11px] font-bold tracking-widest uppercase text-[#7A3E1F]">🎭 Creative Project</span>
					<h3 class="font-headline text-h3 leading-[var(--text-h3--line-height)] mt-1">
						Eye of the Tiger — A Rock Opera
					</h3>
					<p class="mt-1 text-sm text-text/50">2005–2007</p>
					<p class="mt-4 text-text/70 leading-relaxed">
						Authored a rock opera in 2005, performed at Odessa's Globe of the Great Southwest
						Theater. Cynthia received two invitations from the Chinese government to perform
						the musical more than eight times in Beijing, Shanghai, and several other major
						cities in China in 2007.
					</p>
					<div class="mt-6">
						<Button href="/work/eye-of-the-tiger" variant="outline">Read Full Story &rsaquo;</Button>
					</div>
				</div>
			</div>

			<!-- Other projects -->
			{#each projects.filter(p => p.slug !== 'eye-of-the-tiger') as proj}
				<CaseCard
					title={proj.title}
					dates={proj.dates ?? ''}
					description={proj.summary}
					href="/work/{proj.slug}"
					isPlaceholder={proj.isPlaceholder}
				/>
			{/each}
		</div>
	</div>
</section>

<!-- Books -->
<section id="books" class="scroll-mt-32 md:scroll-mt-48 bg-white py-section" use:reveal>
	<div class="mx-auto max-w-[var(--width-content)] px-6">
		<SectionHeading title="Books" subtitle="From the courtroom to the page — stories that change lives." />
		<div class="flex flex-wrap justify-center gap-8">
			{#each books as book}
				<BookCard
					title={book.title}
					year={book.year}
					href="/work/{book.slug}"
					coverSrc={book.coverSrc}
					coverAlt={book.coverAlt}
					isPlaceholder={book.isPlaceholder}
				/>
			{/each}
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
