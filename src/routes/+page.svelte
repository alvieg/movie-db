<script>
	import { goto } from '$app/navigation';

	let query = '';
	function handleSubmit(e) {
		e.preventDefault();
		if (query.trim()) {
			goto(`/search?q=${encodeURIComponent(query.trim())}`);
		}
	}
</script>

<div class="home">
	<h1>🎬 Movie Finder</h1>
	<p>Search for movies, shows, and more. Powered by OMDb API.</p>

	<form on:submit={handleSubmit}>
		<input
			bind:value={query}
			placeholder="Search for a movie or show..."
			aria-label="Movie search"
		/>
		<button type="submit">Search</button>
	</form>
</div>

<style>
	.home {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 80vh;
		text-align: center;
		padding: 2rem;
	}

	h1 {
		font-size: 3rem;
		margin-bottom: 1rem;
		color: #3b82f6;
	}

	p {
		color: #94a3b8;
		margin-bottom: 2rem;
		font-size: 1.2rem;
	}

	form {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	input {
		padding: 0.75rem;
		width: 250px;
		border-radius: 8px;
		border: 1px solid #475569;
		background-color: #0f172a;
		color: white;
		font-size: 1rem;
		outline: none;
	}

	button {
		padding: 0.75rem 1.5rem;
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
</style>
