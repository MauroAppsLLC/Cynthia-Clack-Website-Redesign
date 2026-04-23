<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href?: string;
		variant?: 'primary' | 'outline';
		children: Snippet;
	}

	let { href, variant = 'primary', children }: Props = $props();

	const base =
		'inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer';
	const variants = {
		primary: 'bg-accent text-white hover:bg-accent-hover shadow-card',
		outline: 'border border-accent text-accent hover:bg-accent hover:text-white'
	};
</script>

{#if href}
	<a {href} class="{base} {variants[variant]}">
		{@render children()}
	</a>
{:else}
	<button class="{base} {variants[variant]}">
		{@render children()}
	</button>
{/if}
