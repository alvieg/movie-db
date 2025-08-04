<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let movie = null;
	let error = '';
	let loading = true;

	let id = '';
	$: id = $page.params.id;

	onMount(fetchMovie);

	async function fetchMovie() {
		try {
			const res = await fetch(`/api/detail?id=${id}`);
			const data = await res.json();
			if (data.Response === 'True') {
				movie = data;
			} else {
				error = data.Error || 'Movie not found.';
			}
		} catch {
			error = 'Something went wrong.';
		} finally {
			loading = false;
		}
	}
</script>

{#if loading}
	<div class="center"><p>Loading...</p></div>
{:else if error}
	<div class="center error"><p>{error}</p></div>
{:else}
	<div class="movie-container">
		<img
			class="poster"
			src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
			alt={movie.Title}
		/>
		<div class="details">
			<h1>{movie.Title} <span class="year">({movie.Year})</span></h1>
			<p><strong>Genre:</strong> {movie.Genre}</p>
			<p><strong>Director:</strong> {movie.Director}</p>
			<p class="plot">{movie.Plot}</p>
		</div>
	</div>
{/if}

<style>
	.center {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60vh;
		font-size: 1.2rem;
		color: #94a3b8;
	}

	.error {
		color: #f87171;
	}

	.movie-container {
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
		padding: 2rem;
		background-color: #0f172a;
		color: white;
		border-radius: 12px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
		max-width: 900px;
		margin: 2rem auto;
	}

	.poster {
		width: 300px;
		border-radius: 12px;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
	}

	.details {
		flex: 1;
		min-width: 250px;
	}

	h1 {
		font-size: 2rem;
		margin-bottom: 1rem;
	}

	.year {
		font-weight: 400;
		color: #94a3b8;
	}

	p {
		margin-bottom: 1rem;
		font-size: 1rem;
		line-height: 1.6;
	}

	.plot {
		margin-top: 1.5rem;
		font-style: italic;
	}
</style>
