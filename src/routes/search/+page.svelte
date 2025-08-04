<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { SearchBar } from '$lib';

	let query = '';
	let movies = [];
	let loading = false;
	let error = '';

	$: query = $page.url.searchParams.get('q') ?? '';

	onMount(() => {
		if (query) fetchResults();
	});

	async function fetchResults() {
		if (!query) return;
		loading = true;
		error = '';
		try {
			const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
			const data = await res.json();
			if (data.Response === 'True') {
				movies = data.Search;
			} else {
				movies = [];
				error = data.Error;
			}
		} catch {
			error = 'Something went wrong.';
		} finally {
			loading = false;
		}
	}

	let searchBox = query;

	function handleSearch(e) {
		e.preventDefault();
		if (searchBox.trim()) {
			window.location.href = `/search?q=${encodeURIComponent(searchBox.trim())}`;
			movies = [];
		}
	}
</script>

{#if !query}
	<!-- Centered search bar if no query -->
	<div class="centered">
		<h1>Search for a Movie</h1>
		<SearchBar class="centered" />
	</div>
{:else}
	<h2 class="centered">Search results for: <em>{query}</em></h2>

	{#if loading}
		<p>Loading...</p>
	{:else if error}
		<p style="color: red;">{error}</p>
	{:else if movies.length > 0}
		<div class="grid">
			{#each movies as movie}
				<div class="card">
					<a href={`/movies/${movie.imdbID}`}>
						<img
							src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300'}
							alt={movie.Title}
						/>
						<h3>{movie.Title}</h3>
						<p>{movie.Year}</p>
					</a>
				</div>
			{/each}
		</div>
	{:else}
		<p>No movies found.</p>
	{/if}
{/if}

<style>
	.centered {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 4rem;
	}

	h2 {
		margin: 2rem 0 1rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1.5rem;
		padding-left: 2rem;
		padding-right: 2rem;
	}

	.card {
		background: #1e293b;
		border-radius: 12px;
		overflow: hidden;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		color: white;
		text-align: center;
	}

	.card:hover {
		transform: translateY(-6px);
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
	}

	.card img {
		width: 100%;
		height: auto;
		object-fit: cover;
		transition: transform 0.3s;
	}

	.card:hover img {
		transform: scale(1.05);
	}

	.card h3 {
		font-size: 1rem;
		margin: 0.8rem 0 0.2rem;
	}

	.card p {
		margin-bottom: 1rem;
		font-size: 0.9rem;
		color: #cbd5e1;
	}

	a {
		text-decoration: none;
		color: inherit;
	}
</style>
