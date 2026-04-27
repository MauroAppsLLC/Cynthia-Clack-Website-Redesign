<script lang="ts">
	let { class: className = '' } = $props();
</script>

<span
	class="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-100 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-amber-800 shadow-sm {className}"
	title="This content is a placeholder and has not been verified."
>
	<svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
	</svg>
	Placeholder
</span>
