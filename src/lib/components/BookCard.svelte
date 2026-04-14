<script lang="ts">
	import ImagePlaceholder from './ImagePlaceholder.svelte';

	interface Props {
		title: string;
		year?: string;
		href?: string;
	}

	let { title, year, href }: Props = $props();
</script>

<div class="group text-center">
	<div class="overflow-hidden rounded-[var(--radius-card)]">
		<ImagePlaceholder label="Book Cover" aspect="3/4" class="transition-transform duration-300 group-hover:scale-105" />
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
