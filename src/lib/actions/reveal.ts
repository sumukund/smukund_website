type RevealOptions = {
	threshold?: number;
	rootMargin?: string;
	delay?: number;
};

export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	const { threshold = 0.12, rootMargin = '0px 0px -8% 0px', delay = 0 } = options;

	node.classList.add('scroll-reveal');
	if (delay > 0) {
		node.style.setProperty('--reveal-delay', `${delay}ms`);
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					entry.target.classList.add('revealed');
					observer.unobserve(entry.target);
				}
			}
		},
		{ threshold, rootMargin }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
