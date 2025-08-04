<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { SearchBar } from '$lib';
	import { watchlist } from '$lib/stores/watchlist.js';
	let query = '';

	function handleSearch(e) {
		e.preventDefault();
		if (query.trim()) {
			goto(`/search?q=${encodeURIComponent(query)}`);
			query = '';
		}
	}
</script>

<nav>
	<a href="/" class:active={$page.url.pathname === '/'}>
		<div class="logo">🎬 OMDbApp</div>
	</a>

	<div class="search">
		<SearchBar />
	</div>

	<a href="/watchlist" class="watchlist-link">
		Watchlist
		{#if $watchlist.length > 0}
			<span class="watchlist-badge">{$watchlist.length}</span>
		{/if}
	</a>
</nav>

<slot />

<style>
	:global(body) {
		margin: 0;
		background: #0e1a2b; /* Dark blue background */
		font-family: system-ui, sans-serif;
		color: white;
		min-height: 100vh;
	}

	nav {
		position: sticky;
		top: 1rem;
		margin: 1rem;
		padding: 1rem 2rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		background: rgba(22, 34, 56, 0.8); /* dark translucent */
		border-radius: 16px;
		backdrop-filter: blur(16px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		z-index: 100;
	}

	.logo {
		font-size: 1.25rem;
		font-weight: bold;
		letter-spacing: 0.5px;
		text-decoration: none;
		
	}

	.links {
		display: flex;
		gap: 1.5rem;
	}

	.watchlist-link {
		color: white;
		text-decoration: none;
		font-size: 0.95rem;
		position: relative;
		transition: opacity 0.2s;
	}

	.watchlist-link:hover {
		opacity: 0.8;
	}

	.links a.active {
		text-decoration: underline;
		text-underline-offset: 4px;
	}

	.watchlist-badge {
		position: absolute;
		top: -6px;
		right: -12px;
		background: crimson;
		color: white;
		font-size: 0.7rem;
		padding: 0.2rem 0.45rem;
		border-radius: 999px;
		box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
	}

	/* Make sure slot content doesn’t touch the edges */
	:global(main),
	:global(#svelte) {
		padding: 2rem;
	}

	.search {
		align-self: center;
	}
</style>
