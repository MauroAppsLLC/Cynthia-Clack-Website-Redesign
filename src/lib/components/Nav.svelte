<script lang="ts">
	import { page } from '$app/state';

	let mobileOpen = $state(false);

	const links = [
		{ href: '/about', label: 'About' },
		{ href: '/work', label: 'Work' },
		{ href: '/speaking', label: 'Speaking' },
		{ href: '/contact', label: 'Contact' }
	];

	function closeMobile() {
		mobileOpen = false;
	}
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape') mobileOpen = false;
	}}
/>

<header class="fixed top-0 left-0 right-0 z-50">
	<div class="h-px bg-secondary"></div>
	<div class="bg-bg/90 backdrop-blur-md border-b border-secondary">
		<nav class="mx-auto flex max-w-[var(--width-content)] items-center px-6 py-5">
			<a href="/" class="font-headline text-xl tracking-wide text-text" onclick={closeMobile}>
				Cynthia Clack
			</a>

			<!-- Desktop nav — centered -->
			<ul class="hidden flex-1 items-center justify-center gap-10 md:flex">
				{#each links as { href, label }}
					<li>
						<a
							{href}
							class="text-[13px] font-medium tracking-widest uppercase transition-colors hover:text-accent
								{page.url.pathname === href ? 'text-accent' : 'text-text/60'}"
						>
							{label}
						</a>
					</li>
				{/each}
			</ul>

			<!-- Spacer to balance the logo on desktop -->
			<div class="hidden w-[140px] md:block"></div>

			<!-- Mobile hamburger -->
			<button
				class="ml-auto flex flex-col gap-1.5 md:hidden"
				onclick={() => (mobileOpen = !mobileOpen)}
				aria-label="Toggle menu"
				aria-expanded={mobileOpen}
			>
				<span
					class="block h-0.5 w-6 bg-text transition-transform {mobileOpen
						? 'translate-y-2 rotate-45'
						: ''}"
				></span>
				<span class="block h-0.5 w-6 bg-text transition-opacity {mobileOpen ? 'opacity-0' : ''}"></span>
				<span
					class="block h-0.5 w-6 bg-text transition-transform {mobileOpen
						? '-translate-y-2 -rotate-45'
						: ''}"
				></span>
			</button>
		</nav>
	</div>

	<!-- Mobile menu -->
	{#if mobileOpen}
		<div class="border-b border-secondary bg-bg px-6 pb-6 md:hidden">
			<ul class="flex flex-col gap-4 pt-4">
				{#each links as { href, label }}
					<li>
						<a
							{href}
							class="block text-[13px] font-medium tracking-widest uppercase transition-colors hover:text-accent
								{page.url.pathname === href ? 'text-accent' : 'text-text/60'}"
							onclick={closeMobile}
						>
							{label}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</header>
