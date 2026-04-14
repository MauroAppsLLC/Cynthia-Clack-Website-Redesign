<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import CaseCard from '$lib/components/CaseCard.svelte';
	import BookCard from '$lib/components/BookCard.svelte';
	import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
</script>

<svelte:head>
	<title>My Work — Cynthia Clack</title>
</svelte:head>

<!-- Hero -->
<section class="py-section text-center">
	<div class="mx-auto max-w-[var(--width-content)] px-6">
		<h1 class="font-headline text-h1 leading-[var(--text-h1--line-height)]">My Work</h1>
		<p class="mt-2 font-headline text-xl text-text/60">Books, Projects &amp; Cases</p>
		<p class="mx-auto mt-4 max-w-[var(--width-text)] text-text/70">
			A career that spans the courtroom, the stage, and the written page.
		</p>
	</div>
</section>

<!-- Landmark Cases -->
<section class="bg-white py-section">
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
<section class="py-section">
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
<section id="books" class="bg-white py-section">
	<div class="mx-auto max-w-[var(--width-content)] px-6">
		<SectionHeading title="Books" />
		<div class="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
			<BookCard title="Discovering the Club" year="2024" href="#" />
			<BookCard title="Crossing Together" year="2017" href="#" />
			<BookCard title="Doodles the American Poodle" href="#" />
			<BookCard title="Doodles the American Hero" href="#" />
		</div>
	</div>
</section>

<!-- CTA -->
<section class="py-section">
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
