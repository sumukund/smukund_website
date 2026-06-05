<script lang="ts">
</script>

<svelte:head>
	<title>Sudarsna Mukund</title>
</svelte:head>

<div class="page">

	<main>

		<h1>
			I build systems across choreography,
			machine learning, and immersive media.
		</h1>

		<p>
			My work explores embodiment,
			performance, computer vision,
			and interactive technologies through
			both engineering and artistic practice.
		</p>
        <p>
            Represented by Meredith Agency and Wehmann Agency
        </p>

	</main>

</div>

<style>

	:global(body) {
		margin: 0;
		background: #f6f3ee;
		color: #111;
		font-family: 'IBM Plex Mono', monospace;
	}

	.page {
		padding: 3rem;
		max-width: 1200px;
		margin: 0 auto;
		min-height: 100vh;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 8rem;
	}

	.name {
		font-family: 'Texturina', serif;
		font-size: 1.5rem;
	}

	nav {
		display: flex;
		gap: 2rem;
	}

	button {
		background: none;
		border: none;
		font: inherit;
		cursor: pointer;
		padding: 0;
		opacity: 0.7;
		transition: opacity 0.2s ease;
	}

	button:hover {
		opacity: 1;
	}

	h1 {
		font-family: 'Texturina', serif;
		font-size: clamp(2.5rem, 6vw, 5rem);
		font-weight: 300;
		line-height: 1.1;
		max-width: 900px;
		margin-bottom: 2rem;
	}

	p {
		max-width: 600px;
		line-height: 1.8;
		font-size: 0.95rem;
	}

</style>