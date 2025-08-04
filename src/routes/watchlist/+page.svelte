<script>
	import { watchlist } from '$lib/stores/watchlist.js';
</script>

<h1>Your Watchlist</h1>

{#if $watchlist.length === 0}
	<p>You haven't added any movies yet.</p>
{:else}
	<ul class="watchlist">
		{#each $watchlist as movie}
			<li class="watchlist-item">
				<img
					src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/60x90'}
					alt={movie.Title}
				/>
				<div>
					<strong>{movie.Title}</strong> ({movie.Year})<br />
					<small>{movie.Type}</small>
				</div>
			</li>
		{/each}
	</ul>
{/if}

<style>
	h1 {
		margin-bottom: 1rem;
	}

	.watchlist {
		list-style: none;
		padding: 0;
	}

	.watchlist-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;
		padding: 0.75rem;
		border: 1px solid #ccc;
		border-radius: 6px;
		background: #f9f9f9;
	}

	.watchlist-item img {
		width: 60px;
		height: auto;
		border-radius: 4px;
	}
</style>
