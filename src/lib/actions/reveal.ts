/**
 * Svelte action: scroll-reveal via IntersectionObserver.
 *
 * Usage:
 *   <section use:reveal>…</section>
 *   <section use:reveal={{ delay: 150 }}>…</section>
 *   <section use:reveal={{ distance: 10, duration: 600 }}>…</section>
 *
 * Options:
 *   delay      — ms before the reveal plays (default 0)
 *   distance   — translateY distance in px (default 16, matches CSS fallback)
 *   duration   — transition length in ms (overrides CSS default of 700ms)
 *   once       — if true (default), unobserve after first reveal
 *   rootMargin — passed to IntersectionObserver (default '-80px')
 */
export interface RevealOptions {
	delay?: number;
	distance?: number;
	duration?: number;
	once?: boolean;
	rootMargin?: string;
}

export function reveal(
	node: HTMLElement,
	{
		delay = 0,
		distance,
		duration,
		once = true,
		rootMargin = '-80px'
	}: RevealOptions = {}
) {
	// Don't hide elements that are already visible in the viewport on page
	// load — doing so causes a flash/jitter when JS hydrates after SSR.
	// Only elements that start below the fold need the hidden initial state.
	const rect = node.getBoundingClientRect();
	const alreadyInView = rect.top < window.innerHeight && rect.bottom > 0;

	if (!alreadyInView) {
		// Inject per-element CSS custom properties before adding the class
		// so the transition picks up the correct values immediately.
		if (distance !== undefined) {
			node.style.setProperty('--reveal-y', `${distance}px`);
		}
		if (duration !== undefined) {
			node.style.setProperty('--reveal-duration', `${duration}ms`);
		}
		if (delay > 0) {
			node.style.setProperty('--reveal-delay', `${delay}ms`);
		}

		node.classList.add('reveal-init');
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					// Use a microtask to batch with the observer callback,
					// then apply the visible class. The CSS transition-delay
					// property handles the actual timing, so we don't need
					// a setTimeout for the delay — the CSS does it for us.
					node.classList.add('reveal-visible');
					node.classList.remove('reveal-init');
					if (once) observer.unobserve(node);
				}
			});
		},
		{ rootMargin }
	);

	// Wait for the page to fully settle before observing, so elements just
	// below the fold don't animate aggressively on initial load.
	// Use the 'load' event if the page hasn't finished loading yet;
	// otherwise observe on the next idle callback (or rAF fallback).
	let cleanedUp = false;

	function startObserving() {
		if (cleanedUp) return;
		observer.observe(node);
	}

	if (document.readyState === 'complete') {
		// Page already settled — observe on next animation frame to let
		// layout stabilize after hydration.
		const rafId = requestAnimationFrame(startObserving);
		var cleanup = () => cancelAnimationFrame(rafId);
	} else {
		// Page still loading — wait for the load event.
		const onLoad = () => startObserving();
		window.addEventListener('load', onLoad, { once: true });
		var cleanup = () => window.removeEventListener('load', onLoad);
	}

	return {
		destroy() {
			cleanedUp = true;
			cleanup();
			observer.unobserve(node);
		}
	};
}
