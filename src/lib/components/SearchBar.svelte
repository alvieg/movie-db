<script>
	import { goto } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';

	let query = '';
	let results = [];
	let loading = false;
	let showDropdown = false;
	let debounceTimeout;

	$: if (query.length >= 2) {
		clearTimeout(debounceTimeout);
		debounceTimeout = setTimeout(searchMovies, 300);
		showDropdown = true;
	} else {
		results = [];
		showDropdown = false;
	}

	async function searchMovies() {
		loading = true;
		try {
			const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
			const data = await res.json();
			results = data?.Search?.slice(0, 7) || [];
		} catch {
			results = [];
		} finally {
			loading = false;
		}
	}

	function handleSearch(e) {
		e.preventDefault();
		if (query.trim()) {
			goto(`/search?q=${encodeURIComponent(query.trim())}`);
			showDropdown = false;
		}
	}

	function goToMovie(id) {
		goto(`/movies/${id}`);
		showDropdown = false;
		query = '';
		results = [];
	}

	function handleClickOutside(event) {
		const wrapper = document.getElementById('search-wrapper');
		if (wrapper && !event.composedPath().includes(wrapper)) {
			showDropdown = false;
			results = [];
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	onDestroy(() => {
		clearTimeout(debounceTimeout);
	});
</script>

<div id="search-wrapper" style="position: relative; width: 250px;">
	<form class="form" on:submit={handleSearch} autocomplete="off">
		<input
			type="text"
			placeholder="Enter movie title..."
			bind:value={query}
			aria-autocomplete="list"
			aria-expanded={showDropdown ? 'true' : 'false'}
			aria-controls="dropdown-list"
		/>
		<button type="submit" aria-label="Search movies">Search</button>
	</form>

	{#if showDropdown && results.length > 0}
		<ul id="dropdown-list" class="dropdown" role="listbox">
			{#each results as movie}
				<li
					role="option"
					tabindex="0"
					on:click={() => goToMovie(movie.imdbID)}
					aria-selected="false"
				>
					<span class="movie-icon">
						<img
							src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/36x36'}
							alt={movie.Title}
							loading="lazy"
						/>
					</span>
					<span>{movie.Title} ({movie.Year})</span>
				</li>
			{/each}
		</ul>
	{/if}

	{#if loading}
		<div class="loading">Loading...</div>
	{/if}
</div>

<style>
	.form {
		display: flex;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	input {
		padding: 0.6rem;
		flex: 1;
		border-radius: 8px;
		border: 1px solid #475569;
		background-color: #0f172a;
		color: white;
		font-size: 1rem;
		outline: none;
		transition: border-color 0.2s;
	}

	input:focus {
		border-color: #3b82f6;
	}

	button {
		padding: 0.6rem 1.2rem;
		border-radius: 8px;
		background-color: #3b82f6;
		color: white;
		border: none;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	button:hover {
		background-color: #2563eb;
	}

	.dropdown {
		list-style: none;
		padding: 0;
		margin: 0;
		background: #1e293b;
		border: 1px solid #334155;
		border-radius: 8px;
		max-height: 280px;
		overflow-y: auto;
		width: 100%;
		min-width: 250px;
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
		position: absolute;
		z-index: 1000;
		top: 100%;
		left: 0;
		color: white;
		backdrop-filter: blur(8px);

		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.dropdown::-webkit-scrollbar {
		display: none;
	}

	.dropdown li {
		padding: 0.65rem 1rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		transition: background-color 0.2s ease;
		border-radius: 8px;
	}

	.dropdown li:hover,
	.dropdown li:focus {
		background-color: #475569;
		outline: none;
	}

	.movie-icon {
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	img {
		height: 36px;
		width: 36px;
		border-radius: 6px;
		object-fit: cover;
		box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
	}

	.loading {
		position: absolute;
		top: calc(100% + 0.5rem);
		left: 0;
		color: #94a3b8;
		font-size: 0.9rem;
		font-style: italic;
	}
</style>
