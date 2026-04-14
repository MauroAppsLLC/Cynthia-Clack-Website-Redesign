<script lang="ts">
	interface Props {
		label?: string;
		aspect?: string;
		class?: string;
	}

	let { label = 'Image', aspect = '3/4', class: className = '' }: Props = $props();
</script>

<div
	class="flex items-center justify-center rounded-[var(--radius-card)] bg-secondary text-sm text-text/40 {className}"
	style="aspect-ratio: {aspect};"
>
	{label}
</div>
