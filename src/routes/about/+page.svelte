<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { reveal } from '$lib/actions/reveal';

	const brickLeftSrc = '/images/brick-left.png';
const discoveringClubCoverSrc = '/images/wk2_Monday_Insta_v3.png';
	const SITE_URL = 'https://cynthiaclack.com';
</script>

<SEO 
	title="About Cynthia L. Clack — Texas Family Law Attorney & Author | Biography"
	description="Learn about Cynthia L. Clack — pioneering Texas attorney, author, and advocate. One of the first women to practice law in Odessa, TX. Daughter of a Texas District Judge, stepdaughter of a Texas Supreme Court Justice."
	keywords={["Cynthia Clack biography", "woman lawyer Odessa TX", "Texas District Judge daughter"]}
/>

<!-- Hero -->
<section class="relative overflow-hidden bg-bg flex flex-col md:block">
	<!-- TEXT CONTENT (Stacked first on mobile, floating on desktop) -->
	<div class="relative z-10 mx-auto flex w-full max-w-[1440px] xl:max-w-[1600px] items-center justify-center md:justify-end px-6 pt-16 pb-12 md:py-0 md:px-12 md:min-h-[85vh] order-1 md:order-none">
		<div class="max-w-lg w-full text-center md:text-right" use:reveal={{ distance: 10, duration: 600 }}>
			<h1 class="font-headline text-4xl md:text-h1 leading-[var(--text-h1--line-height)]">
				A life in law. A voice shaped by experience.
			</h1>
			<p class="mt-4 text-lg font-medium tracking-wide text-accent">
				Attorney. Author. Advocate.
			</p>
			<p class="mx-auto md:mx-0 mt-6 max-w-md text-text/70 leading-relaxed md:ml-auto">
				For decades, Cynthia L. Clack has worked inside some of the most difficult corners of
				the legal system. Handling complex family matters, advocating for vulnerable clients,
				and building a career defined by courage, range, and conviction.
			</p>
		</div>
	</div>

	<!-- IMAGE CONTENT (Stacked under text on mobile, absolute full-bleed on desktop) -->
	<div class="relative w-full h-[50vh] md:absolute md:inset-0 md:h-auto order-2 md:order-none">
		<img
			src={brickLeftSrc}
			alt="Cynthia L. Clack photographed in front of a historic brick wall in Odessa, Texas"
			class="absolute inset-0 h-full w-full object-cover object-[25%_10%] md:object-[left_20%]"
		/>
		<!-- Desktop Gradient (Fade right so text is readable) -->
		<div class="hidden md:block pointer-events-none absolute inset-0 bg-gradient-to-l md:from-bg md:from-15% md:via-bg/70 md:via-40% md:to-transparent md:to-65%"></div>
		<!-- Fade bottom into next section -->
		<div class="pointer-events-none absolute bottom-0 left-0 right-0 h-16 md:h-24 bg-gradient-to-t from-bg to-transparent"></div>
	</div>
</section>

<!-- Her Story -->
<section class="bg-white py-section" use:reveal>
	<div class="mx-auto max-w-[var(--width-content)] px-6">
		<div class="mx-auto max-w-[var(--width-text)]">
			<div class="mb-10">
				<h2 class="text-h2 leading-[var(--text-h2--line-height)] font-headline">Her Story</h2>
				<div class="mt-4 h-px w-16 bg-accent/30"></div>
			</div>
			<div class="space-y-6 text-text/70 leading-relaxed">
				<p>
					Cynthia L. Clack was only the third woman to practice law in Odessa, Texas. Her
					career spans more than four decades of family law, public service, teaching,
					creative work, and advocacy for clients navigating high-stakes legal crises.
				</p>
				<p>
					Known for hard work, deep client trust, and courtroom persistence, she has
					represented families throughout Texas, across the United States, and
					internationally in complex divorce, custody, and child advocacy matters.
				</p>
				<p>
					Her late father, James Clack, served as a Texas district judge. Her late
					stepmother, Barbara Culver Clack, was the second woman appointed to the Texas
					Supreme Court. Her brother Steve is a Texas-based attorney, as was her late
					brother Gene.
				</p>
				<p>
					Early in her solo practice, she also served as a part-time municipal judge, a
					city attorney, and a professor of business law, adding public-facing experience
					that shaped her legal and educational voice.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Credentials -->
<section class="py-section" use:reveal>
	<div class="mx-auto max-w-[var(--width-content)] px-6">
		<div class="grid gap-8 md:grid-cols-2">
			<div class="rounded-[var(--radius-card)] border border-secondary bg-white p-8 shadow-card">
				<h3 class="font-headline text-h3 leading-[var(--text-h3--line-height)]">
					Texas Board-Certified in Family Law
				</h3>
				<p class="mt-4 text-text/70 leading-relaxed">
					Her legal practice includes high-conflict custody litigation, difficult family
					matters, and advocacy for clients others may overlook. Notable outcomes include
					the acquittal of a client in Odessa who falsely confessed to murder and landmark
					international child custody advocacy.
				</p>
			</div>
			<div class="rounded-[var(--radius-card)] border border-secondary bg-white p-8 shadow-card">
				<h3 class="font-headline text-h3 leading-[var(--text-h3--line-height)]">
					Service, teaching, and leadership
				</h3>
				<p class="mt-4 text-text/70 leading-relaxed">
					Clack is a Baylor Law graduate and has served in legal education and attorney
					training. Her community leadership includes service connected to Goodwill-West
					Texas, Midland/Odessa Symphony and Chorale, and Baylor Law alumni leadership.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Writing + Quote -->
<section class="bg-white py-section" use:reveal>
	<div class="mx-auto max-w-[var(--width-content)] px-6">
		<div class="grid items-center gap-12 md:grid-cols-2">
			<div>
				<h2 class="font-headline text-h2 leading-[var(--text-h2--line-height)]">
					Why writing matters now
				</h2>
				<p class="mt-6 text-text/70 leading-relaxed">
					After years of seeing what most people never see inside the legal system, writing
					became another form of witness. It created space to examine patterns, ask harder
					questions, and bring difficult realities into the light with clarity and conviction.
				</p>
				<blockquote class="mt-8 border-l-4 border-accent/30 pl-6 italic text-text/60">
					"There are things I have seen — in families, in courtrooms, and behind closed doors
					— that are difficult to explain and even harder to ignore. Writing became a way to
					name what experience had already taught me."
				</blockquote>
			</div>
			<div class="flex flex-col items-center gap-6">
				<img
					src={discoveringClubCoverSrc}
					alt="Discovering the Club book cover by Cynthia L. Clack"
					class="aspect-[3/4] w-full max-w-xs rounded-[var(--radius-card)] object-cover shadow-card"
					loading="lazy"
				/>
				<Button href="/work#books">Explore the Book</Button>
			</div>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="py-section" use:reveal>
	<div class="mx-auto max-w-[var(--width-content)] px-6 text-center">
		<p class="text-lg text-text/60">For speaking, media, or professional inquiries</p>
		<div class="mt-6 flex flex-wrap justify-center gap-4">
			<Button href="/contact" variant="outline">Contact</Button>
			<Button href="/speaking" variant="outline">Speaking</Button>
		</div>
	</div>
</section>
