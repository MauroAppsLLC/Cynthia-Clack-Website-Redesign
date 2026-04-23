<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import StatStrip from '$lib/components/StatStrip.svelte';
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
	import BookCard from '$lib/components/BookCard.svelte';
	import { reveal } from '$lib/actions/reveal';

	const headshotSrc = '/images/Cynthia-Headshot.png';
	const brickRightSrc = '/images/brick-right.png';
const discoveringClubCoverSrc = '/images/wk2_Monday_Insta_v3.png';
	const SITE_URL = 'https://cynthiaclack.com';

	const stats = [
		{ value: '40+', label: 'Years of legal experience' },
		{ value: 'Author', label: 'Books shaped by real cases' },
		{ value: 'Advocate', label: 'A voice for complex issues' }
	];

	const focusAreas = [
		{
			title: 'Family Law',
			description:
				'High-conflict custody, complex divorce, and advocacy for families navigating the most difficult chapters of their lives.'
		},
		{
			title: 'Advocacy',
			description:
				'A tireless champion for underdog clients — from wrongful convictions to international custody disputes.'
		},
		{
			title: 'Authorship',
			description:
				"Turning decades of courtroom experience into books that illuminate the human side of the legal system."
		}
	];
</script>

<svelte:head>
	<title>Cynthia L. Clack — Texas Family Law Attorney, Author & Advocate | Odessa, TX</title>
	<meta name="description" content="Cynthia L. Clack is a Texas Board-Certified Family Law attorney in Odessa, TX with 40+ years of experience in high-conflict custody, complex divorce, and landmark advocacy. Also an acclaimed author." />
	<meta property="og:title" content="Cynthia L. Clack — Texas Family Law Attorney, Author & Advocate" />
	<meta property="og:description" content="Texas Board-Certified Family Law attorney with 40+ years of experience in Odessa, TX. Author of Discovering the Club. Advocate for families navigating the most difficult legal challenges." />
	<meta property="og:url" content="{SITE_URL}/" />

	<!-- WebSite JSON-LD — enables Sitelinks Searchbox eligibility -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": "${SITE_URL}/#website",
		"name": "Cynthia L. Clack",
		"url": "${SITE_URL}",
		"description": "Official website of Cynthia L. Clack — Texas Board-Certified Family Law attorney, author, and advocate.",
		"publisher": {
			"@id": "${SITE_URL}/#organization"
		}
	}
	<\/script>`}
</svelte:head>


<!-- Hero -->
<section class="relative min-h-[85vh] overflow-hidden bg-bg">
	<!-- Full hero image — Cynthia on brick wall, subject to the right -->
	<img
		src={brickRightSrc}
		alt="Cynthia L. Clack, Texas family law attorney and author, photographed against a brick wall in Odessa, TX"
		class="absolute inset-0 h-full w-full object-cover object-[right_20%]"
	/>
	<!-- Fade left so text is readable -->
	<div class="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg from-15% via-bg/70 via-40% to-transparent to-65%"></div>
	<!-- Fade bottom into next section -->
	<div class="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg to-transparent"></div>

	<div class="relative z-10 mx-auto flex min-h-[85vh] max-w-[var(--width-content)] items-center px-6">
		<div class="max-w-xl py-24 md:py-32">
			<h1
				class="font-headline whitespace-nowrap text-[clamp(1.875rem,5vw+1rem,4.5rem)] leading-[1.1]"
			>
				Cynthia L. Clack
			</h1>
			<p class="mt-3 text-lg font-medium tracking-widest text-text/70">
				Attorney. &nbsp;Author. &nbsp;Advocate.
			</p>
			<p class="mt-6 max-w-md text-text/60 leading-relaxed">
				Over four decades inside the legal system,
				working with families and complex cases,
				offering perspective shaped by experience.
			</p>
			<div class="mt-8 flex flex-wrap gap-4">
				<Button href="/work" variant="outline">Explore My Work</Button>
				<Button href="/work#books" variant="outline">Latest Book</Button>
			</div>
		</div>
	</div>
</section>

<!-- Positioning Strip -->
<div use:reveal><StatStrip {stats} /></div>

<!-- Featured Book -->
<section class="py-section" use:reveal>
	<div class="mx-auto grid max-w-[var(--width-content)] items-center gap-12 px-6 md:grid-cols-2">
		<div class="flex justify-center">
			<img
				src={discoveringClubCoverSrc}
				alt="Discovering the Club book cover by Cynthia L. Clack"
				class="aspect-[3/4] w-full max-w-xs rounded-[var(--radius-card)] object-cover shadow-card"
				loading="lazy"
			/>
		</div>
		<div class="max-w-[var(--width-text)]">
			<p class="text-sm font-semibold uppercase tracking-widest text-accent/60">Featured Book</p>
			<h2 class="mt-3 font-headline text-h2 leading-[var(--text-h2--line-height)]">Discovering the Club</h2>
			<p class="mt-4 text-text/70 leading-relaxed">
				A powerful examination of patterns hidden inside the family court system — parental
				alienation, institutional failure, and the resilience of those caught in between.
				Written from decades of firsthand experience.
			</p>
			<div class="mt-8">
				<Button href="/work#books">Explore the Book</Button>
			</div>
		</div>
	</div>
</section>

<!-- About Preview -->
<section class="bg-white py-section" use:reveal>
	<div class="mx-auto max-w-[var(--width-content)] px-6 text-center">
		<SectionHeading title="About Cynthia" />
		<p class="mx-auto max-w-[var(--width-text)] text-text/70 leading-relaxed">
			A pioneering woman lawyer, a humanitarian, and a creative force to be reckoned with.
			Cynthia L. Clack was only the third woman to practice law in the west Texas city of Odessa.
			Born into a family of legal luminaries, she built a career spanning private practice,
			public service, teaching, authorship, and creative work.
		</p>
		<div class="mt-8">
			<Button href="/about" variant="outline">Read Full Bio</Button>
		</div>
	</div>
</section>

<!-- Areas of Focus -->
<section class="py-section" use:reveal>
	<div class="mx-auto max-w-[var(--width-content)] px-6">
		<SectionHeading title="Areas of Focus" subtitle="A career defined by courage, range, and conviction." />
		<div class="grid gap-8 md:grid-cols-3">
			{#each focusAreas as area}
				<div class="rounded-[var(--radius-card)] border border-secondary bg-white p-8 shadow-card">
					<h3 class="font-headline text-h3 leading-[var(--text-h3--line-height)]">{area.title}</h3>
					<p class="mt-3 text-text/70">{area.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Selected Work -->
<section class="bg-white py-section" use:reveal>
	<div class="mx-auto max-w-[var(--width-content)] px-6">
		<SectionHeading title="Selected Work" subtitle="From the courtroom to the written page." />
		<div class="grid gap-8 md:grid-cols-3">
			<div class="md:col-span-2 rounded-[var(--radius-card)] border border-secondary bg-bg p-8 shadow-card">
				<p class="text-sm font-semibold uppercase tracking-widest text-accent/60">Featured</p>
				<h3 class="mt-2 font-headline text-h3 leading-[var(--text-h3--line-height)]">Johnny Foote's Story</h3>
				<p class="mt-1 text-sm text-text/50">1992–2000</p>
				<p class="mt-4 text-text/70 leading-relaxed">
					The case of a man who confessed to a horrific murder he did not commit. Cynthia's
					advocacy led to his acquittal and exposed the failures of a system that nearly
					destroyed an innocent life.
				</p>
				<div class="mt-6">
					<Button href="/work" variant="outline">Read the Story &rsaquo;</Button>
				</div>
			</div>
			<div class="flex flex-col gap-8">
				<div class="rounded-[var(--radius-card)] border border-secondary bg-bg p-6 shadow-card">
					<h4 class="font-headline text-lg">The Emily Wu Case</h4>
					<p class="mt-1 text-sm text-text/50">2000–2005</p>
					<p class="mt-2 text-sm text-text/70">
						An international child kidnapping case that made headlines across continents.
					</p>
				</div>
				<div class="rounded-[var(--radius-card)] border border-secondary bg-bg p-6 shadow-card">
					<h4 class="font-headline text-lg">Eye of the Tiger</h4>
					<p class="mt-1 text-sm text-text/50">Rock Opera, 2005</p>
					<p class="mt-2 text-sm text-text/70">
						A rock opera performed at the Globe of the Great Southwest and internationally in China.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Speaking -->
<section class="py-section" use:reveal>
	<div class="mx-auto max-w-[var(--width-content)] px-6 text-center">
		<SectionHeading title="Speaking" subtitle="Insights drawn from four decades inside the legal system." />
		<div class="mx-auto max-w-[var(--width-text)]">
			<p class="text-text/70 leading-relaxed">
				Cynthia speaks on family law, advocacy for vulnerable populations, the intersection
				of law and storytelling, and the realities of practicing law as a woman in west Texas.
			</p>
			<div class="mt-6 flex flex-wrap justify-center gap-3">
				<span class="rounded-full bg-secondary px-4 py-2 text-sm">Family Law</span>
				<span class="rounded-full bg-secondary px-4 py-2 text-sm">Advocacy</span>
				<span class="rounded-full bg-secondary px-4 py-2 text-sm">Storytelling & Law</span>
				<span class="rounded-full bg-secondary px-4 py-2 text-sm">Women in Law</span>
			</div>
			<div class="mt-8">
				<Button href="/speaking" variant="outline">Learn More</Button>
			</div>
		</div>
	</div>
</section>

<!-- Email Signup -->
<section class="bg-accent py-section text-white" use:reveal={{ delay: 0 }}>
	<div class="mx-auto max-w-[var(--width-content)] px-6 text-center">
		<h2 class="font-headline text-h2 leading-[var(--text-h2--line-height)]">Stay Connected</h2>
		<p class="mx-auto mt-3 max-w-[var(--width-text)] text-white/70">
			Receive updates on new writing, speaking engagements, and insights from Cynthia's work.
		</p>
		<form class="mx-auto mt-8 flex max-w-lg flex-col gap-4 sm:flex-row" method="POST" action="/?success=true" data-netlify="true" name="newsletter">
			<input type="hidden" name="form-name" value="newsletter" />
			<input
				type="text"
				name="name"
				placeholder="Your name"
				class="flex-1 rounded-full bg-white/10 px-5 py-3 text-sm text-white placeholder-white/50 outline-none ring-1 ring-white/20 focus:ring-white/50"
			/>
			<input
				type="email"
				name="email"
				placeholder="Your email"
				required
				class="flex-1 rounded-full bg-white/10 px-5 py-3 text-sm text-white placeholder-white/50 outline-none ring-1 ring-white/20 focus:ring-white/50"
			/>
			<button
				type="submit"
				class="rounded-full bg-white px-7 py-3 text-sm font-medium text-accent transition-colors hover:bg-white/90 cursor-pointer"
			>
				Subscribe
			</button>
		</form>
	</div>
</section>
