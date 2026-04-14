<script lang="ts">
	interface Stat {
		value: string;
		label: string;
	}

	interface Props {
		stats: Stat[];
	}

	let { stats }: Props = $props();
</script>

<div class="border-y border-secondary bg-white/60 py-10">
	<div class="mx-auto flex max-w-[var(--width-content)] flex-col items-center justify-center gap-8 px-6 md:flex-row md:gap-16">
		{#each stats as stat, i}
			{#if i > 0}
				<div class="hidden h-10 w-px bg-secondary md:block"></div>
			{/if}
			<div class="text-center">
				<p class="font-headline text-2xl font-semibold text-accent">{stat.value}</p>
				<p class="mt-1 text-sm text-text/60">{stat.label}</p>
			</div>
		{/each}
	</div>
</div>
