<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Cynthia Clack — Attorney. Author. Advocate.</title>
	<meta name="description" content="Cynthia Clack — pioneering Texas attorney, author, and advocate with over four decades of legal experience." />
</svelte:head>

<Nav />
<main class="pt-[72px]">
	{@render children()}
</main>
<Footer />
