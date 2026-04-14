<script lang="ts">
	interface Props {
		title: string;
		subtitle?: string;
	}

	let { title, subtitle }: Props = $props();
</script>

<div class="mb-10 text-center">
	<h2 class="text-h2 leading-[var(--text-h2--line-height)]">{title}</h2>
	{#if subtitle}
		<p class="mt-3 text-text/60">{subtitle}</p>
	{/if}
	<div class="mx-auto mt-4 h-px w-16 bg-accent/30"></div>
</div>
