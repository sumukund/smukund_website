<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let showChoices = $state(false);
	let typedText = $state('');

	const lines = [
		'You arrive at a threshold.',
		'',
		'One path remembers through systems.',
		'One path remembers through movement.',
		'',
	];

	onMount(async () => {
		const fullText = lines.join('\n');

		for (const char of fullText) {
			typedText += char;

			await new Promise((resolve) =>
				setTimeout(resolve, 40)
			);
		}

		showChoices = true;
	});

	function enterArchive() {
		goto('/engineering');
	}

	function enterStage() {
		goto('/dance');
	}

    function enterIntersection() {
		goto('/intersection');
	}
</script>

<svelte:head>
	<title>Sudarsna Mukund</title>

	<link
		rel="preconnect"
		href="https://fonts.googleapis.com"
	/>

	<link
		rel="preconnect"
		href="https://fonts.gstatic.com"
		crossorigin="anonymous"
	/>

	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400&family=Texturina:wght@300;400;500&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="page">

	<!-- ambient gradients -->
	<div class="glow glow-1"></div>
	<div class="glow glow-2"></div>

	<!-- floating tamil fragments -->
	<div class="glyph glyph-1">நினைவு</div>
	<div class="glyph glyph-2">உடல்</div>
	<div class="glyph glyph-3">அரங்கு</div>
	<div class="glyph glyph-4">மூலம்</div>

	<!-- film grain -->
	<div class="grain"></div>

	<section class="portal">

		<div class="topbar">
			<div class="name">
				Sudarsna Mukund
			</div>

			<div class="subtitle">
				performing art / computer science / intersection
			</div>
		</div>

		<div class="content">

			<div class="intro">
				<pre>{typedText}<span class="cursor">█</span></pre>
			</div>

			{#if showChoices}
				<div class="choices">

					<button onclick={enterArchive}>
						explore performing arts
					</button>

					<button onclick={enterStage}>
						explore engineering 
					</button>

                    <button onclick={enterIntersection}>
						explore the intersection
					</button>

				</div>
			{/if}

		</div>

	</section>

</div>

<style>

	:global(body) {
		margin: 0;
		background: #0d0908;
		overflow: hidden;
		color: #f3e7d0;
	}

	.page {
		position: relative;
		width: 100vw;
		height: 100vh;
		background:
			linear-gradient(
				to bottom,
				#120c0b,
				#1c1311,
				#0b0908
			);

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.portal {
		position: relative;
		width: 100%;
		height: 100%;
		padding: 4rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		z-index: 10;
	}

	.topbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.name {
		font-family: 'Texturina', serif;
		font-size: 1.6rem;
		letter-spacing: 0.08rem;
		color: #f8e7c7;
	}

	.subtitle {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.75rem;
		letter-spacing: 0.2rem;
		text-transform: lowercase;
		opacity: 0.5;
	}

	.content {
		max-width: 800px;
		margin-left: 10vw;
		margin-bottom: 10vh;
	}

	pre {
		font-family: 'Texturina', serif;
		font-size: 2.2rem;
		line-height: 1.7;
		font-weight: 300;
		white-space: pre-wrap;
		color: #f5e6c8;
		text-shadow:
			0 0 20px rgba(214, 179, 138, 0.15);
	}

	.cursor {
		animation: blink 1s infinite;
		color: #d6b38a;
	}

	.choices {
		margin-top: 4rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	button {
		background: transparent;
		border: none;
		color: #d8c3a5;

		font-family: 'IBM Plex Mono', monospace;
		font-size: 1rem;

		letter-spacing: 0.15rem;
		text-transform: lowercase;

		cursor: pointer;

		text-align: left;

		transition:
			transform 0.4s ease,
			opacity 0.4s ease,
			text-shadow 0.4s ease;

		padding: 0;

		opacity: 0.7;
	}

	button:hover {
		transform: translateX(16px);
		opacity: 1;

		text-shadow:
			0 0 20px rgba(244, 228, 193, 0.5);
	}

	.glow {
		position: absolute;
		border-radius: 50%;
		filter: blur(100px);
		opacity: 0.2;
	}

	.glow-1 {
		width: 500px;
		height: 500px;
		background: #a35d3d;

		top: -10%;
		left: -5%;

		animation: drift1 14s ease-in-out infinite;
	}

	.glow-2 {
		width: 400px;
		height: 400px;
		background: #6f3d2d;

		bottom: -10%;
		right: -5%;

		animation: drift2 18s ease-in-out infinite;
	}

	.glyph {
		position: absolute;

		font-family: 'Texturina', serif;
		font-size: 5rem;

		color: rgba(244, 228, 193, 0.05);

		pointer-events: none;

		animation: float 12s ease-in-out infinite;
	}

	.glyph-1 {
		top: 10%;
		left: 8%;
	}

	.glyph-2 {
		top: 30%;
		right: 10%;
	}

	.glyph-3 {
		bottom: 20%;
		left: 15%;
	}

	.glyph-4 {
		bottom: 10%;
		right: 20%;
	}

	.grain {
		position: absolute;
		inset: 0;

		background-image:
			url("https://www.transparenttextures.com/patterns/asfalt-dark.png");

		opacity: 0.08;

		mix-blend-mode: soft-light;

		pointer-events: none;
	}

	@keyframes blink {
		0%, 50% {
			opacity: 1;
		}

		51%, 100% {
			opacity: 0;
		}
	}

	@keyframes float {
		0% {
			transform: translateY(0px);
		}

		50% {
			transform: translateY(-20px);
		}

		100% {
			transform: translateY(0px);
		}
	}

	@keyframes drift1 {
		0% {
			transform: translate(0px, 0px);
		}

		50% {
			transform: translate(40px, 20px);
		}

		100% {
			transform: translate(0px, 0px);
		}
	}

	@keyframes drift2 {
		0% {
			transform: translate(0px, 0px);
		}

		50% {
			transform: translate(-30px, -20px);
		}

		100% {
			transform: translate(0px, 0px);
		}
	}

	@media (max-width: 768px) {

		.portal {
			padding: 2rem;
		}

		.content {
			margin-left: 0;
			margin-bottom: 6vh;
		}

		pre {
			font-size: 1.5rem;
			line-height: 1.6;
		}

		.glyph {
			font-size: 3rem;
		}

		.topbar {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}
	}

</style>