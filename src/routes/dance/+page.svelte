<script lang="ts">
	import { artisticWorks } from '$lib/data/dance';
	import { reveal } from '$lib/actions/reveal';
</script>

<svelte:head>
	<title>Artistic Practice | Sudarsna Mukund</title>
</svelte:head>

<header class="page-header" use:reveal>
	<p class="eyebrow">Portfolio</p>
	<h1>Artistic CV</h1>
</header>

<section class="gallery">
	{#each artisticWorks as work, i}
		<a
			class="card {work.size}"
			href={work.link}
			target="_blank"
			rel="noopener noreferrer"
			use:reveal={{ delay: (i % 3) * 60 }}
		>
			<div class="image-frame">
				<img src={work.image} alt={work.title} loading="lazy" />
			</div>

			<div class="meta">
				<h2>{work.title}</h2>
				<p>{work.category}</p>
				<div class="details">
					<span>{work.organization}</span>
					<span>{work.year}</span>
				</div>
			</div>
		</a>
	{/each}
</section>

<style>
	.page-header {
		max-width: 1200px;
		margin: 0 auto 3rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.06);
	}

	.eyebrow {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.16rem;
		opacity: 0.5;
		margin: 0 0 0.75rem;
	}

	h1 {
		font-family: 'Texturina', serif;
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 300;
		margin: 0;
	}

	.gallery {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 2rem;
		align-items: start;
		max-width: 1200px;
		margin: 0 auto;
	}

	.card {
		text-decoration: none;
		color: inherit;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		transition: transform 0.35s ease;
	}

	.card:hover {
		transform: translateY(-3px);
	}

	.small {
		grid-column: span 2;
	}

	.medium {
		grid-column: span 4;
	}

	.large {
		grid-column: span 6;
	}

	.wide {
		grid-column: span 6;
	}

	.image-frame {
		width: 100%;
		background: #ebe7e0;
		border-radius: 4px;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 2px 16px rgba(0, 0, 0, 0.04);
		transition: box-shadow 0.35s ease;
	}

	.card:hover .image-frame {
		box-shadow: 0 8px 28px rgba(0, 0, 0, 0.08);
	}

	.image-frame img {
		width: 100%;
		height: auto;
		display: block;
		object-fit: contain;
	}

	.meta {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.meta h2 {
		font-family: 'Texturina', serif;
		font-size: 1.4rem;
		font-weight: 400;
		margin: 0;
	}

	.meta p {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.08rem;
		opacity: 0.7;
		margin: 0;
	}

	.details {
		display: flex;
		justify-content: space-between;
		font-size: 0.75rem;
		opacity: 0.5;
		letter-spacing: 0.04rem;
	}

	@media (max-width: 900px) {
		.gallery {
			grid-template-columns: 1fr;
		}

		.small,
		.medium,
		.large,
		.wide {
			grid-column: span 1;
		}
	}
</style>
