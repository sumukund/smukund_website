<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import ScrollProgress from '$lib/components/ScrollProgress.svelte';
	import '$lib/styles/global.css';

	const navItems = [
		{ href: '/dance', label: 'Artistic Practice' },
		{ href: '/engineering', label: 'Engineering' },
		{ href: '/intersection', label: 'Research' },
		{ href: '/teaching', label: 'Teaching' },
		{ href: '/about', label: 'About' }
	];
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400&family=Texturina:wght@300;400;500&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<ScrollProgress />

<div class="site">
	<header>
		<button class="name" onclick={() => goto('/')}>Sudarsna Mukund</button>

		<nav>
			{#each navItems as item}
				<button
					class:active={page.url.pathname === item.href}
					onclick={() => goto(item.href)}
				>
					{item.label}
				</button>
			{/each}
		</nav>
	</header>

	<main class:home={page.url.pathname === '/'}>
		<slot />
	</main>
</div>

<style>
	:global(body) {
		margin: 0;
		background: #f6f3ee;
		color: #111;
		font-family: 'IBM Plex Mono', monospace;
	}

	:global(html) {
		scroll-behavior: smooth;
	}

	.site {
		min-height: 100vh;
	}

	header {
		position: sticky;
		top: 0;
		z-index: 100;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2rem 3rem;
		background: rgba(246, 243, 238, 0.9);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid rgba(0, 0, 0, 0.04);
	}

	.name {
		border: none;
		background: none;
		padding: 0;
		cursor: pointer;
		font-family: 'Texturina', serif;
		font-size: 1.4rem;
		color: inherit;
	}

	nav {
		display: flex;
		gap: 2rem;
	}

	nav button {
		border: none;
		background: none;
		padding: 0;
		cursor: pointer;
		font: inherit;
		font-size: 0.8rem;
		letter-spacing: 0.08rem;
		text-transform: uppercase;
		opacity: 0.5;
		transition: opacity 0.2s ease;
		position: relative;
	}

	nav button::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: -0.35rem;
		width: 0;
		height: 1px;
		background: #111;
		transition: width 0.25s ease;
	}

	nav button:hover,
	nav button.active {
		opacity: 1;
	}

	nav button.active::after {
		width: 100%;
	}

	main {
		padding: 2rem 3rem 6rem;
	}

	main.home {
		padding: 0;
	}

	@media (max-width: 768px) {
		header {
			flex-direction: column;
			align-items: flex-start;
			gap: 1.5rem;
		}

		nav {
			flex-wrap: wrap;
			gap: 1rem;
		}

		main {
			padding: 1.5rem 1.5rem 4rem;
		}

		main.home {
			padding: 0;
		}
	}
</style>
