<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { reveal } from '$lib/actions/reveal';

	const speakerPhotoSrc = '/images/cynthia-office-final.jpeg';

	const SITE_URL = 'https://cynthiaclack.com';

	const topics = [
		{
			title: 'Family Law & High-Conflict Custody',
			description:
				'Navigating the most complex custody battles, parental alienation, and systemic failures in family courts.'
		},
		{
			title: 'Advocacy for the Overlooked',
			description:
				'How to fight for clients the system has forgotten — from wrongful convictions to international disputes.'
		},
		{
			title: 'Storytelling & the Law',
			description:
				'The power of narrative in courtrooms, books, and public discourse. Why lawyers should also be writers.'
		},
		{
			title: 'Women in Law',
			description:
				'Four decades as a pioneering woman attorney in west Texas — lessons, battles, and breakthroughs.'
		}
	];
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		"@id": `${SITE_URL}/#person`,
		"name": "Cynthia L. Clack",
		"url": SITE_URL,
		"description": "Texas Board-Certified Family Law attorney and keynote speaker with 40+ years of legal experience. Available for conferences, bar associations, universities, community organizations, and CLEs.",
		"knowsAbout": [
			"Family Law",
			"High-Conflict Custody",
			"Parental Alienation",
			"Wrongful Conviction Advocacy",
			"International Child Custody",
			"Women in Law",
			"Legal Storytelling"
		],
		"performerIn": {
			"@type": "Event",
			"name": "Speaking Engagement with Cynthia L. Clack",
			"organizer": {
				"@type": "Organization",
				"name": "Law Offices of Cynthia L. Clack"
			}
		}
	};
</script>

<SEO 
	title="Speaking Engagements — Cynthia L. Clack | Family Law Keynote Speaker, Texas"
	description="Book Cynthia L. Clack for keynotes, panels, CLEs, and university lectures. Speaking topics include family law, high-conflict custody, wrongful conviction advocacy, women in law, and legal storytelling."
	keywords={["keynote speaker Texas", "legal storytelling speaker", "women in law speaking"]}
	{jsonLd}
/>

<!-- Hero -->
<section class="pt-6 pb-4 md:py-section">
	<div class="mx-auto grid max-w-[var(--width-content)] items-center gap-10 px-6 md:grid-cols-2 md:gap-12">
		<div class="text-center md:text-left" use:reveal={{ distance: 10, duration: 600 }}>
			<h1 class="font-headline text-4xl md:text-h1 leading-[var(--text-h1--line-height)]">Speaking</h1>
			<p class="mt-4 text-lg text-text/60">
				Insights drawn from four decades inside the legal system.
			</p>
			<p class="mx-auto mt-6 max-w-md text-text/70 leading-relaxed md:mx-0">
				Cynthia brings hard-won perspective to every stage and podium. Her talks draw on
				real cases, real families, and the realities of practicing law — not theory, but
				experience. Available for keynotes, panels, CLEs, and university lectures.
			</p>
			<div class="mt-8 flex justify-center md:justify-start">
				<Button href="/contact">Book Cynthia</Button>
			</div>
		</div>
		<div class="overflow-hidden rounded-[var(--radius-card)] shadow-card" use:reveal={{ distance: 14, delay: 120 }}>
			<img
				src={speakerPhotoSrc}
				alt="Cynthia L. Clack - Speaker"
				class="aspect-[4/3] w-full object-cover"
				loading="lazy"
			/>
		</div>
	</div>
</section>

<!-- Topics -->
<section class="bg-white py-section" use:reveal>
	<div class="mx-auto max-w-[var(--width-content)] px-6">
		<SectionHeading title="Speaking Topics" subtitle="Talks shaped by real experience, not abstractions." />
		<div class="grid gap-8 md:grid-cols-2">
			{#each topics as topic}
				<div class="rounded-[var(--radius-card)] border border-secondary bg-bg p-8">
					<h3 class="font-headline text-h3 leading-[var(--text-h3--line-height)]">
						{topic.title}
					</h3>
					<p class="mt-3 text-text/70 leading-relaxed">{topic.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Testimonial -->
<section class="py-section" use:reveal>
	<div class="mx-auto max-w-[var(--width-content)] px-6 text-center">
		<blockquote class="mx-auto max-w-[var(--width-text)] font-headline text-2xl italic leading-relaxed text-text/70">
			"It's about hard work, listening to the clients, believing the clients, and working
			with the clients."
		</blockquote>
		<p class="mt-4 text-sm font-medium text-accent">— Cynthia L. Clack</p>
	</div>
</section>

<!-- CTA -->
<section class="bg-accent py-20 text-white text-center" use:reveal>
	<div class="mx-auto max-w-[var(--width-content)] px-6">
		<h2 class="font-headline text-h2 leading-[var(--text-h2--line-height)]">Invite Cynthia to Speak</h2>
		<p class="mx-auto mt-4 max-w-[var(--width-text)] text-white/70">
			Available for conferences, bar associations, universities, community organizations,
			and media appearances.
		</p>
		<div class="mt-8">
			<a
				href="/contact"
				class="inline-flex items-center justify-center rounded-full border border-white bg-transparent px-7 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-white hover:text-accent"
			>
				Get in Touch
			</a>
		</div>
	</div>
</section>
