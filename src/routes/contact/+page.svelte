<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { reveal } from '$lib/actions/reveal';

	const SITE_URL = 'https://cynthiaclack.com';
</script>

<svelte:head>
	<title>Contact Cynthia Clack — Family Law Attorney in Odessa, TX | (432) 337-8511</title>
	<meta name="description" content="Contact the Law Offices of Cynthia L. Clack in Odessa, TX. Reach out for family law consultations, speaking inquiries, media requests, or general questions. Call (432) 337-8511." />
	<meta property="og:title" content="Contact Cynthia Clack — Family Law Attorney | Odessa, TX" />
	<meta property="og:description" content="Get in touch with Texas family law attorney Cynthia Clack. Office at 522 N Grant Ave, Odessa, TX. Call (432) 337-8511 or send a message online." />
	<meta property="og:url" content="{SITE_URL}/contact" />

	<!-- LocalBusiness + LegalService JSON-LD — critical for local SEO / Google local pack -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": ["LegalService", "LocalBusiness"],
		"@id": "${SITE_URL}/#organization",
		"name": "Law Offices of Cynthia L. Clack",
		"alternateName": "Cynthia Clack Attorney",
		"description": "Texas Board-Certified Family Law attorney offering legal services in high-conflict custody, complex divorce, and advocacy for families in Odessa, TX and the surrounding Permian Basin region.",
		"url": "${SITE_URL}",
		"telephone": "+14323378511",
		"email": "cynthia.l.clack@gmail.com",
		"address": {
			"@type": "PostalAddress",
			"streetAddress": "522 N Grant Ave",
			"addressLocality": "Odessa",
			"addressRegion": "TX",
			"postalCode": "79761-5121",
			"addressCountry": "US"
		},
		"geo": {
			"@type": "GeoCoordinates",
			"latitude": 31.8457,
			"longitude": -102.3677
		},
		"areaServed": [
			{
				"@type": "City",
				"name": "Odessa",
				"sameAs": "https://en.wikipedia.org/wiki/Odessa,_Texas"
			},
			{
				"@type": "City",
				"name": "Midland"
			},
			{
				"@type": "State",
				"name": "Texas"
			}
		],
		"openingHoursSpecification": [
			{
				"@type": "OpeningHoursSpecification",
				"dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
				"opens": "08:00",
				"closes": "17:00"
			}
		],
		"hasOfferCatalog": {
			"@type": "OfferCatalog",
			"name": "Legal Services",
			"itemListElement": [
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Service",
						"name": "Family Law Representation",
						"description": "High-conflict custody, complex divorce, and family court advocacy"
					}
				},
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Service",
						"name": "Wrongful Conviction Advocacy",
						"description": "Advocacy for clients facing unjust legal outcomes"
					}
				},
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Service",
						"name": "International Child Custody",
						"description": "Cross-border custody disputes and international family law"
					}
				}
			]
		},
		"founder": {
			"@id": "${SITE_URL}/#person"
		},
		"sameAs": [
			"${SITE_URL}"
		]
	}
	<\/script>`}
</svelte:head>


<!-- Hero -->
<section class="py-section">
	<div class="mx-auto max-w-[var(--width-content)] px-6 text-center">
		<h1 class="font-headline text-h1 leading-[var(--text-h1--line-height)]">Get in Touch</h1>
		<p class="mx-auto mt-4 max-w-[var(--width-text)] text-text/70">
			For legal consultations, speaking inquiries, media requests, or general questions.
		</p>
	</div>
</section>

<!-- Contact Content -->
<section class="bg-white py-section" use:reveal>
	<div class="mx-auto grid max-w-[var(--width-content)] gap-12 px-6 md:grid-cols-[1fr_1.5fr]">
		<!-- Info -->
		<div>
			<h2 class="font-headline text-h3 leading-[var(--text-h3--line-height)]">Contact Information</h2>
			<div class="mt-6 space-y-6">
				<div>
					<p class="text-sm font-semibold uppercase tracking-wide text-text/50">Office</p>
					<address class="mt-2 space-y-1 not-italic text-text/70">
						<p>Law Offices of Cynthia L. Clack</p>
						<p>522 N Grant Ave</p>
						<p>Odessa, TX 79761-5121</p>
					</address>
				</div>
				<div>
					<p class="text-sm font-semibold uppercase tracking-wide text-text/50">Email</p>
					<a href="mailto:cynthia.l.clack@gmail.com" class="mt-2 block text-accent hover:underline">
						cynthia.l.clack@gmail.com
					</a>
				</div>
				<div>
					<p class="text-sm font-semibold uppercase tracking-wide text-text/50">Phone</p>
					<a href="tel:+14323378511" class="mt-2 block text-accent hover:underline">
						(432) 337-8511
					</a>
				</div>
			</div>
		</div>

		<!-- Form -->
		<div>
			<h2 class="font-headline text-h3 leading-[var(--text-h3--line-height)]">Send a Message</h2>
			<form
				class="mt-6 space-y-5"
				method="POST"
				action="/contact?success=true"
				data-netlify="true"
				name="contact"
			>
				<input type="hidden" name="form-name" value="contact" />

				<div class="grid gap-5 sm:grid-cols-2">
					<div>
						<label for="name" class="block text-sm font-medium text-text/70">Name</label>
						<input
							type="text"
							id="name"
							name="name"
							required
							class="mt-1 w-full rounded-2xl border border-secondary bg-bg px-5 py-3 text-sm outline-none transition-colors focus:border-accent/40 focus:ring-1 focus:ring-accent/20"
						/>
					</div>
					<div>
						<label for="email" class="block text-sm font-medium text-text/70">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							required
							class="mt-1 w-full rounded-2xl border border-secondary bg-bg px-5 py-3 text-sm outline-none transition-colors focus:border-accent/40 focus:ring-1 focus:ring-accent/20"
						/>
					</div>
				</div>

				<div>
					<label for="subject" class="block text-sm font-medium text-text/70">Subject</label>
					<select
						id="subject"
						name="subject"
						class="mt-1 w-full rounded-2xl border border-secondary bg-bg px-5 py-3 text-sm outline-none transition-colors focus:border-accent/40 focus:ring-1 focus:ring-accent/20"
					>
						<option value="">Select a topic</option>
						<option value="legal">Legal Consultation</option>
						<option value="speaking">Speaking Inquiry</option>
						<option value="media">Media Request</option>
						<option value="general">General Question</option>
					</select>
				</div>

				<div>
					<label for="message" class="block text-sm font-medium text-text/70">Message</label>
					<textarea
						id="message"
						name="message"
						rows="6"
						required
						class="mt-1 w-full rounded-2xl border border-secondary bg-bg px-5 py-3 text-sm outline-none transition-colors focus:border-accent/40 focus:ring-1 focus:ring-accent/20 resize-none"
					></textarea>
				</div>

				<div>
					<Button>Send Message</Button>
				</div>
			</form>
		</div>
	</div>
</section>
