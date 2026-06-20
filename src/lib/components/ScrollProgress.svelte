<script lang="ts">
	import { onMount } from 'svelte';

	let progress = $state(0);

	onMount(() => {
		const updateProgress = () => {
			const scrollTop = window.scrollY;
			const docHeight = document.documentElement.scrollHeight - window.innerHeight;
			progress = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
		};

		updateProgress();
		window.addEventListener('scroll', updateProgress, { passive: true });
		window.addEventListener('resize', updateProgress);

		return () => {
			window.removeEventListener('scroll', updateProgress);
			window.removeEventListener('resize', updateProgress);
		};
	});
</script>

<div class="scroll-progress" aria-hidden="true">
	<div class="scroll-progress-bar" style:width="{progress}%"></div>
</div>

<style>
	.scroll-progress {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		z-index: 200;
		background: rgba(0, 0, 0, 0.04);
		pointer-events: none;
	}

	.scroll-progress-bar {
		height: 100%;
		background: #111;
		transition: width 0.08s linear;
	}
</style>
