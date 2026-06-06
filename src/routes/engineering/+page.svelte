<script lang="ts">

	import { engineeringExperience }
		from '$lib/data/engineering';

</script>

<section class="cv">
<nav class="section-nav">

	<a href="#education">
		Education
	</a>

	<a href="#research">
		Lab
	</a>

	<a href="#industry">
		Industry Experience
	</a>

</nav>
	<div class="quote">

		<p>
			“A rising star who has spent the last several years
			building advanced ML, computer vision, and 3D capabilities.
			Sudarsna also brings strong front-end experience and a
			track record of diving deep into complex technical challenges.”
		</p>

		<span>
			— Todd Hagen, Principal Engineer
		</span>

	</div>

	{#each engineeringExperience as section}

		<section class="cv-section" id={section.id}>

			<h2>{section.section}</h2>

			{#each section.entries as entry}

				<div class="entry">

					<div class="meta">

						<span>
							{entry.years}
						</span>

					</div>

					<div class="content">

						<h3>
							{entry.title}
						</h3>

						<p class="organization">
							{entry.organization}
						</p>

						{#if entry.link}

							<a
								href={entry.link}
								target="_blank"
								class="research-link"
							>
								Lab Link →
							</a>

						{/if}

						{#if entry.description}

							<ul>

								{#each entry.description as item}

									<li>{item}</li>

								{/each}

							</ul>

						{/if}

					{#if entry.relevant_coursework}
						<h4>Relevant Coursework</h4>

							<ul>

								{#each entry.relevant_coursework as item}
									<li>{item}</li>

								{/each}

							</ul>

						{/if}

						{#if entry.projects}

							<div class="projects">

								<h4>
									Selected Projects
								</h4>

								{#each entry.projects as project}

									<div class="project">

										<a
											href={project.link}
											target="_blank"
										>
											{project.name}
										</a>

										<p>
											{project.description}
										</p>

									</div>

								{/each}

							</div>

						{/if}

					</div>

				</div>

			{/each}

		</section>

	{/each}

</section>

<style>

	.cv {

		max-width: 1000px;

		margin: 0 auto;

		padding-bottom: 8rem;
	}

	.quote {

		margin-bottom: 8rem;

		padding-bottom: 3rem;

		border-bottom:
			1px solid rgba(0,0,0,0.08);
	}

	.quote p {

		font-family: 'Texturina', serif;

		font-size: clamp(0.7rem, 2vw, 3rem);

		line-height: 1.4;

		font-weight: 300;

		max-width: 900px;

		margin: 0 0 1.5rem;
	}

	.quote span {

		font-size: 0.75rem;

		text-transform: uppercase;

		letter-spacing: 0.12rem;

		opacity: 0.5;
	}

	.cv-section {

		margin-bottom: 3rem;
	}

	.cv-section h2 {

		font-size: 0.8rem;

		text-transform: uppercase;

		letter-spacing: 0.14rem;

		font-weight: 400;

		opacity: 0.5;

		margin-bottom: 2rem;
	}

	.entry {

		display: grid;

		grid-template-columns:
			180px
			1fr;

		gap: 3rem;

		padding:
			2.5rem 0;

		border-top:
			1px solid rgba(0,0,0,0.08);
	}

	.meta {

		font-size: 0.8rem;

		opacity: 0.45;
	}

	.content h3 {

		font-family: 'Texturina', serif;

		font-size: 1.7rem;

		font-weight: 400;

		margin: 0;
	}

	.organization {

		margin:
			0.4rem 0 1.5rem;

		font-size: 0.95rem;

		opacity: 0.65;
	}

	.content ul {

		margin: 0;

		padding-left: 1.2rem;
	}

	.content li {

		margin-bottom: 1rem;

		line-height: 1.8;
	}

	.projects {

		margin-top: 2rem;
	}

	.projects h4 {

		font-size: 0.75rem;

		text-transform: uppercase;

		letter-spacing: 0.12rem;

		opacity: 0.5;

		margin-bottom: 1.5rem;
	}

	.project {

		margin-bottom: 1.5rem;
	}

	.project a,
	.research-link {

		color: inherit;

		text-decoration: none;

		border-bottom:
			1px solid rgba(0,0,0,0.2);

		transition:
			opacity 0.2s ease;
	}

	.project a:hover,
	.research-link:hover {

		opacity: 0.6;
	}

	.project p {

		margin:
			0.5rem 0 0;

		line-height: 1.7;

		opacity: 0.75;
	}

	@media (max-width: 768px) {

		.entry {

			grid-template-columns: 1fr;

			gap: 1.5rem;
		}

		.quote {

			margin-bottom: 5rem;
		}
	}
.section-nav {

	display: flex;

	flex-wrap: nowrap;

	gap: 2rem;

	margin-bottom: 6rem;

	padding-bottom: 1.5rem;

	border-bottom:
		1px solid rgba(0,0,0,0.08);
}

.section-nav a {

	text-decoration: none;

	color: inherit;

	font-size: 1rem;

	text-transform: uppercase;

	letter-spacing: 0.12rem;

	opacity: 0.45;

	transition:
		opacity 0.2s ease;
}

.section-nav a:hover {

	opacity: 1;
}
</style>