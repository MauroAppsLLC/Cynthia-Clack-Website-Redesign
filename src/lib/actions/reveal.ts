/**
 * Svelte action: scroll-reveal via IntersectionObserver.
 *
 * Usage:
 *   <section use:reveal>…</section>
 *   <section use:reveal={{ delay: 150 }}>…</section>
 *
 * Options:
 *   delay   — ms before the reveal plays (default 0)
 *   once    — if true (default), unobserve after first reveal
 *   rootMargin — passed to IntersectionObserver (default '-60px')
 */
export interface RevealOptions {
	delay?: number;
	once?: boolean;
	rootMargin?: string;
}

export function reveal(
	node: HTMLElement,
	{ delay = 0, once = true, rootMargin = '-60px' }: RevealOptions = {}
) {
	// Don't hide elements that are already visible in the viewport on page
	// load — doing so causes a flash/jitter when JS hydrates after SSR.
	// Only elements that start below the fold need the hidden initial state.
	const rect = node.getBoundingClientRect();
	const alreadyInView = rect.top < window.innerHeight && rect.bottom > 0;

	if (!alreadyInView) {
		node.classList.add('reveal-init');
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setTimeout(() => {
						node.classList.add('reveal-visible');
						node.classList.remove('reveal-init');
					}, delay);
					if (once) observer.unobserve(node);
				}
			});
		},
		{ rootMargin }
	);

	// Delay observation by 200ms so the page fully settles before any
	// scroll animations can fire. Without this, elements just below the
	// fold animate immediately on page load, which looks aggressive.
	let observeTimer: ReturnType<typeof setTimeout>;
	observeTimer = setTimeout(() => observer.observe(node), 200);

	return {
		destroy() {
			clearTimeout(observeTimer);
			observer.unobserve(node);
		}
	};
}
