<script lang="ts">
	import GoogleCalendarBooking from '$lib/components/GoogleCalendarBooking.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { teachingExperience, teachingIntro, teachingOfferings } from '$lib/data/teaching';
</script>

<svelte:head>
	<title>Teaching | Sudarsna Mukund</title>
</svelte:head>

<div class="page">
	<header class="hero" use:reveal>
		<p class="eyebrow">Instruction & Mentorship</p>
		<h1>{teachingIntro.title}</h1>
		<p class="lead">{teachingIntro.lead}</p>
	</header>

	<section class="offerings">
		<h2 use:reveal>Offerings</h2>
		<div class="offering-grid">
			{#each teachingOfferings as offering, i}
				<article class="offering-card" use:reveal={{ delay: i * 80 }}>
					<h3>{offering.title}</h3>
					<p>{offering.description}</p>
				</article>
			{/each}
		</div>
	</section>

	<section class="experience">
		<h2 use:reveal>Experience</h2>
		{#each teachingExperience as entry, i}
			<div class="experience-entry" use:reveal={{ delay: i * 80 }}>
				<span class="years">{entry.years}</span>
				<div>
					<h3>{entry.role}</h3>
					<p class="organization">{entry.organization}</p>
					<p>{entry.description}</p>
				</div>
			</div>
		{/each}
	</section>

	<GoogleCalendarBooking />
</div>

<style>
	.page {
		max-width: 900px;
		margin: 0 auto;
		padding-bottom: 4rem;
	}

	.hero {
		margin-bottom: 5rem;
		padding-bottom: 3rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.06);
	}

	.eyebrow {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.16rem;
		opacity: 0.5;
		margin: 0 0 1rem;
	}

	h1 {
		font-family: 'Texturina', serif;
		font-size: clamp(2.5rem, 5vw, 3.5rem);
		font-weight: 300;
		margin: 0 0 1.5rem;
		line-height: 1.1;
	}

	.lead {
		font-size: 1.05rem;
		line-height: 1.8;
		color: #333;
		max-width: 640px;
		margin: 0;
	}

	section {
		margin-bottom: 4rem;
	}

	h2 {
		font-family: 'Texturina', serif;
		font-size: 1.5rem;
		font-weight: 400;
		margin: 0 0 2rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.06);
	}

	.offering-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 1.5rem;
	}

	.offering-card {
		background: #fff;
		padding: 1.5rem;
		border-radius: 6px;
		border: 1px solid rgba(0, 0, 0, 0.04);
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.02);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.offering-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
	}

	.offering-card h3 {
		font-family: 'Texturina', serif;
		font-size: 1.2rem;
		font-weight: 400;
		margin: 0 0 0.75rem;
	}

	.offering-card p {
		margin: 0;
		line-height: 1.7;
		font-size: 0.95rem;
		color: #444;
	}

	.experience-entry {
		display: grid;
		grid-template-columns: 120px 1fr;
		gap: 2rem;
		padding: 2rem 0;
		border-top: 1px solid rgba(0, 0, 0, 0.06);
	}

	.years {
		font-size: 0.85rem;
		font-weight: 600;
		opacity: 0.5;
	}

	.experience-entry h3 {
		font-family: 'Texturina', serif;
		font-size: 1.35rem;
		font-weight: 400;
		margin: 0;
	}

	.organization {
		margin: 0.35rem 0 0.75rem;
		opacity: 0.6;
		font-weight: 500;
	}

	.experience-entry p:last-child {
		margin: 0;
		line-height: 1.7;
		color: #333;
	}

	@media (max-width: 768px) {
		.experience-entry {
			grid-template-columns: 1fr;
			gap: 0.75rem;
		}
	}
</style>
