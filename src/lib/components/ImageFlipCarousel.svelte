<script lang="ts">
  type GalleryItem = {
    id: string;
    image: string;
    imageAlt: string;
    title: string;
    caption?: string;
  };

  let {
    items,
    activeIndex = 0,
    onSelect,
  }: {
    items: GalleryItem[];
    activeIndex?: number;
    onSelect?: (index: number) => void;
  } = $props();

  let cardEl = $state<HTMLDivElement | undefined>();
  let displayedIndex = $state(activeIndex);
  let flipDirection = $state<"next" | "prev" | null>(null);
  let targetIndex = $state(activeIndex);
  let instantReset = $state(false);
console.log(displayedIndex)
console.log(targetIndex)
  const isFlipping = $derived(flipDirection !== null);
  const current = $derived(items[displayedIndex] ?? items[0]);
  const incoming = $derived(items[targetIndex] ?? items[0]);

  function finishFlip() {
    displayedIndex = targetIndex;
    flipDirection = null;

    requestAnimationFrame(() => {
      instantReset = false;
      if (activeIndex !== displayedIndex) {
        // startFlip(activeIndex);
      }
    });
  }

  function startFlip(toIndex: number) {
    if (toIndex === displayedIndex) return;
    targetIndex = toIndex;
    flipDirection = toIndex > displayedIndex ? "next" : "prev";
    console.log(flipDirection)
  }

  $effect(() => {
    if (activeIndex === displayedIndex && !isFlipping) return;

    if (!isFlipping && !instantReset) {
      startFlip(activeIndex);
      console.log("inside effect", isFlipping)

      return;
    }
    if (isFlipping && activeIndex !== targetIndex) {
      targetIndex = activeIndex;
      console.log("inside isflipping active index", isFlipping)

      flipDirection = activeIndex > displayedIndex ? "next" : "prev";
    }
  });

  function handleTransitionEnd(event: TransitionEvent) {
    if (event.propertyName !== "transform" || !flipDirection) return;
    finishFlip();
  }
</script>

<div class="carousel">
  <div class="card-scene">
    <div
      class="card"
      class:flip-next={flipDirection === "next"}
      class:flip-prev={flipDirection === "prev"}
      class:instant={instantReset}
      bind:this={cardEl}
      ontransitionend={handleTransitionEnd}
    >
      <div class="card-face card-front">
        <img src={current.image} alt={current.imageAlt} />
        <div class="card-meta">
          <span class="card-title">{current.title}</span>
          {#if current.caption}
            <span class="card-caption">{current.caption}</span>
          {/if}
        </div>
      </div>

      {#if isFlipping}
        <div class="card-face card-back">
          <img src={incoming.image} alt={incoming.imageAlt} />
          <div class="card-meta">
            <span class="card-title">{incoming.title}</span>
            {#if incoming.caption}
              <span class="card-caption">{incoming.caption}</span>
            {/if}
          </div>
        </div>
      {/if}
    </div>
  </div>

  <div class="dots" role="tablist" aria-label="Image gallery">
    {#each items as item, index (item.id)}
      <button
        type="button"
        role="tab"
        class="dot"
        class:active={index === activeIndex}
        aria-selected={index === activeIndex}
        aria-label={`View image ${index + 1}: ${item.title}`}
        onclick={() => onSelect?.(index)}
      ></button>
    {/each}
  </div>

  <p class="counter">{activeIndex + 1} / {items.length}</p>
</div>

<style>
  .carousel {
    width: 100%;
    max-width: 560px;
    margin: 0 auto;
  }

  .card-scene {
    perspective: 1400px;
    margin-bottom: 1.25rem;
  }

  .card {
    position: relative;
    width: 100%;
    min-height: 420px;
    transform-style: preserve-3d;
    transition: transform 0.65s cubic-bezier(0.6, -0.28, 0.735, 0.045);
    border-radius: 6px;
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.1);
    background: #fff;
  }

  .card.instant {
       visibility: hidden;

    transition: none;
  }

  .card.flip-next {
   visibility: hidden;
   transform: rotateY(15deg);
  }

  .card.flip-prev {
    visibility: hidden;
    transform: rotateY(-15deg);
  }

  .card-face {

    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border-radius: 6px;
    overflow: hidden;
    background: #fff;
  }

  .card-front {
    position: relative;
    width: 100%;
  }

  .card-back {
    position: absolute;
    inset: 0;
    transform: rotateY(180deg);
    visibility: hidden;

  }

  .card-face img {
    width: 100%;
    height: auto;
    max-height: calc(100vh - 18rem);
    object-fit: contain;
    display: block;
    background: #f0ebe1;
  }

  .card-meta {
    padding: 0.85rem 1rem 1rem;
    border-top: 1px solid #ebe7e0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .card-title {
    font-weight: 600;
    font-size: 0.9rem;
  }

  .card-caption {
    font-size: 0.8rem;
    color: #555;
    font-style: italic;
  }

  .dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .dot {
    width: 8px;
    height: 8px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: #ccc;
    cursor: pointer;
    transition:
      transform 0.2s ease,
      background 0.2s ease;
  }

  .dot:hover {
    transform: scale(1.2);
    background: #888;
  }

  .dot.active {
    background: #111;
    transform: scale(1.25);
  }

  .counter {
    margin: 0.65rem 0 0;
    text-align: center;
    font-size: 0.75rem;
    color: #666;
    letter-spacing: 0.04em;
  }

  @media (max-width: 960px) {
    .card {
      min-height: 280px;
    }

    .card-face img {
      max-height: 38vh;
    }
  }
</style>
