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
	<!-- Top contact bar -->
	<div class="hidden bg-accent text-white md:block">
		<div class="mx-auto flex max-w-[var(--width-content)] items-center justify-between px-6 py-1.5 text-xs">
			<div class="flex items-center gap-5">
				<a href="mailto:cynthia.l.clack@gmail.com" class="flex items-center gap-1.5 transition-opacity hover:opacity-80">
					<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
					cynthia.l.clack@gmail.com
				</a>
				<a href="tel:+14323378511" class="flex items-center gap-1.5 transition-opacity hover:opacity-80">
					<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
					(432) 337-8511
				</a>
			</div>
			<a
				href="https://www.linkedin.com/in/cynthia-clack-56267912/"
				target="_blank"
				rel="noopener noreferrer"
				class="transition-opacity hover:opacity-80"
				aria-label="LinkedIn"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
					<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
				</svg>
			</a>
		</div>
	</div>
	<div
		class="border-b border-secondary bg-bg/90 py-4 backdrop-blur-md transition-[box-shadow,backdrop-filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] {scrolled
			? 'shadow-card backdrop-blur-lg'
			: 'backdrop-blur-md'}"
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
