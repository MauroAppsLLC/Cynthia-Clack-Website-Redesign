<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import StatStrip from '$lib/components/StatStrip.svelte';
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
	import BookCard from '$lib/components/BookCard.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { optimizeImage } from '$lib/utils/image';

	const headshotSrc = '/images/Cynthia-Headshot.png';
	const brickRightSrc = '/images/brick-right.png';
const discoveringClubCoverSrc = '/images/discovering_the_club_final.jpeg';
	const SITE_URL = 'https://cynthiaclack.com';

	const stats = [
		{ value: '40+', label: 'Years of legal experience' },
		{ value: 'Author', label: 'Books shaped by real cases' },
		{ value: 'Advocate', label: 'A voice for complex issues' }
	];

	const focusAreas: { title: string; description: string; }[] = [
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
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": `${SITE_URL}/#website`,
		"name": "Cynthia L. Clack",
		"url": SITE_URL,
		"description": "Official website of Cynthia L. Clack — Texas Board-Certified Family Law attorney, author, and advocate.",
		"publisher": {
			"@id": `${SITE_URL}/#organization`
		}
	};
</script>

<SEO 
	title="Cynthia L. Clack — Texas Family Law Attorney, Author & Advocate | Odessa, TX"
	description="Cynthia L. Clack is a Texas Board-Certified Family Law attorney in Odessa, TX with 40+ years of experience in high-conflict custody, complex divorce, and landmark advocacy. Also an acclaimed author."
	keywords={["Odessa TX Family Lawyer", "complex divorce", "landmark advocacy"]}
	{jsonLd}
/>

<!-- Hero -->
<section class="relative overflow-hidden bg-bg flex flex-col md:block">
	<!-- TEXT CONTENT (Stacked first on mobile, floating on desktop) -->
	<div class="relative z-10 mx-auto flex w-full max-w-[var(--width-content)] items-center justify-center md:justify-start px-6 pt-16 pb-12 md:py-0 md:min-h-[85vh] order-1 md:order-none">
		<div class="max-w-xl w-full text-center md:text-left" use:reveal={{ distance: 10, duration: 600 }}>
			<h1
				class="font-headline whitespace-nowrap text-[clamp(1.875rem,5vw+1rem,4.5rem)] leading-[1.1]"
			>
				Cynthia L. Clack
			</h1>
			<p class="mt-3 text-lg font-medium tracking-widest text-text/70">
				Attorney. &nbsp;Author. &nbsp;Advocate.
			</p>
			<p class="mx-auto md:mx-0 mt-6 max-w-md text-text/60 leading-relaxed">
				Over four decades inside the legal system,
				working with families and complex cases,
				offering perspective shaped by experience.
			</p>
			<div class="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
				<Button href="/work" variant="outline">Explore My Work</Button>
				<Button href="/work#books" variant="outline">Latest Book</Button>
			</div>
		</div>
	</div>

	<!-- IMAGE CONTENT (Stacked under text on mobile, absolute full-bleed on desktop) -->
	<div class="relative w-full h-[50vh] md:absolute md:inset-0 md:h-auto order-2 md:order-none">
		<!-- Full hero image — Cynthia on brick wall, subject to the right -->
		<picture class="absolute inset-0 h-full w-full">
			<source media="(max-width: 768px)" srcset={optimizeImage('/images/hero-center.png')} />
			<img
				src={optimizeImage(brickRightSrc)}
				alt="Cynthia L. Clack, Texas family law attorney and author, photographed against a brick wall in Odessa, TX"
				class="h-full w-full object-cover object-[75%_10%] md:object-[right_20%]"
			/>
		</picture>
		<!-- Desktop Gradient (Fade left so text is readable) -->
		<div class="hidden md:block pointer-events-none absolute inset-0 bg-gradient-to-r md:from-bg md:from-15% md:via-bg/70 md:via-40% md:to-transparent md:to-65%"></div>
		<!-- Fade bottom into next section -->
		<div class="pointer-events-none absolute bottom-0 left-0 right-0 h-16 md:h-24 bg-gradient-to-t from-bg to-transparent"></div>
	</div>
</section>

<!-- Positioning Strip -->
<div use:reveal={{ distance: 12, delay: 80 }}><StatStrip {stats} /></div>

<!-- Featured Book -->
<section class="py-section" use:reveal>
	<div class="mx-auto grid max-w-[var(--width-content)] items-center gap-12 px-6 md:grid-cols-2">
		<div class="flex justify-center">
			<img
				src={optimizeImage(discoveringClubCoverSrc)}
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
				<Button href="/work/discovering-the-club">Explore the Book</Button>
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
<section class="bg-accent py-section text-white" use:reveal={{ distance: 10 }}>
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
