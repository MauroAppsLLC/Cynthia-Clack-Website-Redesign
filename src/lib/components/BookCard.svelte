<script lang="ts">
	import ImagePlaceholder from './ImagePlaceholder.svelte';

	interface Props {
		title: string;
		year?: string;
		href?: string;
		coverSrc?: string;
		coverAlt?: string;
	}

	let { title, year, href, coverSrc, coverAlt }: Props = $props();
</script>

<div class="group mx-auto w-full max-w-[240px] text-center">
	<div class="overflow-hidden rounded-[var(--radius-card)]">
		{#if coverSrc}
			<img
				src={coverSrc}
				alt={coverAlt ?? `${title} book cover`}
				class="aspect-[3/4] w-full object-cover transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
				loading="lazy"
			/>
		{:else}
			<ImagePlaceholder label="Book Cover" aspect="3/4" class="transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" />
		{/if}
	</div>
	<h4 class="mt-4 font-headline text-base font-medium">{title}</h4>
	{#if year}
		<p class="mt-1 text-sm text-text/50">{year}</p>
	{/if}
	{#if href}
		<a {href} class="mt-2 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
			View Book <span aria-hidden="true">&rsaquo;</span>
		</a>
	{/if}
</div>
