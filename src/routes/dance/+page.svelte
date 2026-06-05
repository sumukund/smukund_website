<script lang="ts">
	import { artisticWorks }
		from '$lib/data/dance';
</script>

<section class="gallery">
	{#each artisticWorks as work}
		<a
			class={`card ${work.size}`}
			href={work.link}
			target="_blank"
		>

			<img
				src={work.image}
				alt={work.title}
			/>

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
.details {

	display: flex;

	justify-content: space-between;

	font-size: 0.75rem;

	opacity: 0.5;

	letter-spacing: 0.04rem;
}
.gallery {

	display: grid;

	grid-template-columns:
		repeat(6, 1fr);

	gap: 2rem;

	align-items: start;
}

.card {

	text-decoration: none;
	color: inherit;

	display: flex;
	flex-direction: column;

	gap: 1rem;
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
	grid-column: span 8;
}
.small img {

	aspect-ratio: 4 / 5;
}

.medium img {

	aspect-ratio: 4 / 5;
}

.large img {

	aspect-ratio: 3 / 2;
}

.wide img {

	aspect-ratio: 16 / 9;
}
.card img {

	width: 100%;
	height: auto;

	object-fit: cover;

	transition:
		transform 0.5s ease,
		opacity 0.5s ease;
}

.card:hover img {

	transform: scale(1.01);

	opacity: 0.96;
}

.meta {

	display: flex;
	flex-direction:column;
	gap: 1rem;
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

.meta span {

	font-size: 0.8rem;

	opacity: 0.5;
}
</style>
