<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { onMount, tick } from 'svelte';
	import { slide } from 'svelte/transition';

	let mobileOpen = $state(false);
	let scrolled = $state(false);
	let menuButton: HTMLButtonElement | undefined = $state();
	let menuPanel: HTMLElement | undefined = $state();

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/work', label: 'Works' },
		{ href: '/speaking', label: "Speaking's" },
		{ href: '/contact', label: 'Contact' }
	];

	const focusRing =
		'rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent/45 focus-visible:ring-offset-2 focus-visible:ring-offset-bg';

	function closeMobile() {
		const wasOpen = mobileOpen;
		mobileOpen = false;
		if (wasOpen) {
			void tick().then(() => menuButton?.focus());
		}
	}

	function toggleMobile() {
		mobileOpen = !mobileOpen;
	}

	function handleDocumentKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			closeMobile();
			return;
		}
		if (!mobileOpen || e.key !== 'Tab' || !menuPanel) return;
		if (!menuPanel.contains(document.activeElement)) return;
		const nodes = [...menuPanel.querySelectorAll<HTMLElement>('a[href]')];
		if (nodes.length === 0) return;
		const first = nodes[0];
		const last = nodes[nodes.length - 1];
		if (e.shiftKey && document.activeElement === first) {
			e.preventDefault();
			last.focus();
		} else if (!e.shiftKey && document.activeElement === last) {
			e.preventDefault();
			first.focus();
		}
	}

	$effect(() => {
		if (!browser) return;
		document.body.style.overflow = mobileOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	});

	$effect(() => {
		if (!browser || !mobileOpen) return;
		void tick().then(() => {
			menuPanel?.querySelector<HTMLElement>('a[href]')?.focus();
		});
	});

	onMount(() => {
		if (!browser) return;
		scrolled = window.scrollY > 16;
	});
</script>

<svelte:window
	onscroll={() => {
		if (!browser) return;
		scrolled = window.scrollY > 16;
	}}
	onkeydown={handleDocumentKeydown}
/>

{#if mobileOpen}
	<button
		type="button"
		class="fixed inset-0 z-40 bg-text/20 backdrop-blur-[1px] md:hidden"
		aria-label="Close menu"
		onclick={closeMobile}
	></button>
{/if}

<header class="fixed top-0 left-0 right-0 z-50">
	<div class="h-px bg-secondary"></div>
	<div
		class="border-b border-secondary bg-bg/90 backdrop-blur-md transition-[padding,box-shadow,backdrop-filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] {scrolled
			? 'py-3 shadow-card backdrop-blur-lg'
			: 'py-5 backdrop-blur-md'}"
	>
		<nav class="mx-auto flex max-w-[var(--width-content)] items-center px-6">
			<a
				href="/"
				class="font-headline text-xl tracking-wide text-text {focusRing}"
				onclick={closeMobile}
			>
				Cynthia L. Clack
			</a>

			<!-- Desktop nav — centered -->
			<ul class="hidden flex-1 items-center justify-center gap-10 md:flex">
				{#each links as { href, label }}
					{@const active = page.url.pathname === href}
					<li>
						<a
							{href}
							class={`inline-block border-b-2 pb-1 text-[13px] font-medium tracking-widest uppercase transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${focusRing} ${
								active
									? 'border-accent text-accent'
									: 'border-transparent text-text/60 hover:border-accent/30 hover:text-accent'
							}`}
						>
							{label}
						</a>
					</li>
				{/each}
			</ul>

			<!-- Spacer to balance the logo on desktop -->
			<div class="hidden w-[120px] md:block"></div>

			<!-- Mobile hamburger -->
			<button
				bind:this={menuButton}
				type="button"
				class={`ml-auto flex flex-col gap-1.5 md:hidden ${focusRing}`}
				onclick={toggleMobile}
				aria-label="Toggle menu"
				aria-expanded={mobileOpen}
				aria-controls="mobile-nav-panel"
			>
				<span
					class="block h-0.5 w-6 bg-text transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] {mobileOpen
						? 'translate-y-2 rotate-45'
						: ''}"
				></span>
				<span
					class="block h-0.5 w-6 bg-text transition-opacity duration-200 {mobileOpen ? 'opacity-0' : ''}"
				></span>
				<span
					class="block h-0.5 w-6 bg-text transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] {mobileOpen
						? '-translate-y-2 -rotate-45'
						: ''}"
				></span>
			</button>
		</nav>

		<!-- Mobile menu -->
		{#if mobileOpen}
			<nav
				id="mobile-nav-panel"
				bind:this={menuPanel}
				class="border-b border-secondary bg-bg px-6 pb-6 md:hidden"
				aria-label="Mobile navigation"
				transition:slide={{ duration: 220, axis: 'y' }}
			>
				<ul class="flex flex-col gap-1 pt-2">
					{#each links as { href, label }}
						{@const active = page.url.pathname === href}
						<li>
							<a
								{href}
								class={`block border-l-4 py-2 pl-4 text-[13px] font-medium tracking-widest uppercase transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${focusRing} ${
									active
										? 'border-accent text-accent'
										: 'border-transparent text-text/60 hover:border-accent/30 hover:text-accent'
								}`}
								onclick={closeMobile}
							>
								{label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		{/if}
	</div>
</header>
