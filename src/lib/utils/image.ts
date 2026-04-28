import { dev, building } from '$app/environment';

/**
 * Optimizes an image URL using Netlify Image CDN when in production.
 * @param src The source URL of the image
 * @param width Optional width to resize the image to
 * @returns The optimized image URL, or the original URL if in development or not a local image
 */
export function optimizeImage(src: string | undefined | null, width?: number): string | undefined {
	if (!src) return undefined;
	
	// Skip during dev and during SSR prerendering (/.netlify/images only exists at runtime)
	if (dev || building) return src;

	if (!src.startsWith('/')) return src;

	let url = `/.netlify/images?url=${encodeURIComponent(src)}&fm=webp`;
	if (width) {
		url += `&w=${width}`;
	}
	return url;
}
