<script lang="ts">
</script>

<svelte:head>
	<title>Sudarsna Mukund</title>
</svelte:head>

<div class="page">

	<main>

		<p>
			Sudarsna Mukund (she/they) is a Tamil multidisciplinary performing artist and computer vision engineer. She has performed internationally in Maria de Buenos Aires and Orpheus and
Eurydice with State Opera Plovdiv, as well as Giselle, Swan Lake, Cinderella, and Carmen. She
has also performed in Ragamala Dance’s Fires of Varanasi in Kerala, India, City Ballet Boston’s
Urban Nutcracker, and theatrical productions including Hecuba and Rhinoceros with Pangea World
Theater. Her choreographic work explores Tamil futurism and a desire to root oneself in place through data physicalization. Her practice combines Bharathanatyam, contemporary dance, and aerial arts with
data visualization drawn from her background in engineering to investigate the myriad experiences
of being through performing art.
		</p>

		<div>
				<h2>Get in touch!</h2>
				<p>For all inquiries or project ideas, please email me below:</p>
				<p><a href="mailto:mukun017@gmail.com">Contact Me</a></p>
				<p><a href="instagram.com/sudarsnak/">Instagram</a></p>
			</div>
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