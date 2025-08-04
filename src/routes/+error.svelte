<script>
	export let error;
	export let status;

	let message;

	if (status >= 500) {
		message = "Oops! Something went wrong on our end.";
	} else if (status === 404) {
		message = "The page you're looking for doesn't exist.";
	} else if (status >= 400) {
		message = "There was a problem with your request.";
	} else {
		message = error?.message ?? "An unknown error occurred.";
	}
</script>

<style>
	.error-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		text-align: center;
		background-color: #0f172a;
		color: white;
		padding: 2rem;
	}

	h1 {
		font-size: 4rem;
		margin-bottom: 1rem;
		color: #ef4444;
	}

	p {
		font-size: 1.2rem;
		color: #cbd5e1;
		margin-bottom: 2rem;
	}

	a {
		color: #3b82f6;
		text-decoration: underline;
		transition: color 0.2s;
	}

	a:hover {
		color: #60a5fa;
	}
</style>

<div class="error-page">
	<h1>{status}</h1>
	<p>{message}</p>
	<a href="/">Go back home</a>
</div>
