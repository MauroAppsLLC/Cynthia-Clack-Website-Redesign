<script lang="ts">
	import Button from './Button.svelte';
	import PlaceholderBadge from './PlaceholderBadge.svelte';

	interface Props {
		title: string;
		dates: string;
		description: string;
		href?: string;
		isPlaceholder?: boolean;
	}

	let { title, dates, description, href, isPlaceholder }: Props = $props();
</script>

<div
	class="rounded-[var(--radius-card)] border border-secondary bg-white p-8 shadow-card transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0,0,0.2,1)] hover:-translate-y-0.5 relative"
>
	{#if isPlaceholder}
		<div class="mb-3">
			<PlaceholderBadge />
		</div>
	{/if}
	<h3 class="font-headline text-h3 leading-[var(--text-h3--line-height)]">{title}</h3>
	<p class="mt-1 text-sm text-text/50">{dates}</p>
	<p class="mt-4 text-text/70">{description}</p>
	{#if href}
		<div class="mt-6">
			<Button {href} variant="primary">Read Case Story &rsaquo;</Button>
		</div>
	{/if}
</div>
