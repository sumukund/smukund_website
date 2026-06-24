<script lang="ts">
  import { onMount } from "svelte";
  import { reveal } from "$lib/actions/reveal";
  import IntersectionMap from "$lib/components/IntersectionMap.svelte";
  import {
    audioLocations,
    mapGeoJson,
    programNotes,
    storySteps,
  } from "$lib/data/intersection";

  let activeIndex = $state(0);
  let scrollyStepsEl = $state<HTMLElement | undefined>();

  const activeStep = $derived(storySteps[activeIndex]);
  const activeAudioLocation = $derived(
    activeStep.audioLocationSlug
      ? audioLocations.find((loc) => loc.slug === activeStep.audioLocationSlug)
      : undefined
  );

  onMount(() => {
    if (!scrollyStepsEl) return;

    const stepElements = scrollyStepsEl.querySelectorAll<HTMLElement>(
      "[data-step-index]"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(
              (entry.target as HTMLElement).dataset.stepIndex
            );
            if (!Number.isNaN(index)) {
              activeIndex = index;
            }
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    stepElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });

  function scrollToSection(section: string) {
    const index = storySteps.findIndex((s) => s.section === section);
    if (index < 0 || !scrollyStepsEl) return;
    const target = scrollyStepsEl.querySelector<HTMLElement>(
      `[data-step-index="${index}"]`
    );
    target?.scrollIntoView({ behavior: "smooth" });
  }
</script>

<svelte:head>
  <title>Embodied Geography | Sudarsna Mukund</title>
</svelte:head>

<div class="page">
  <header class="project-header" use:reveal>
    <h1>
      Embodied Geography: Processing Operation Metro Surge through Gesture and
      Sound
    </h1>

    <div class="authors">
      <div class="author-group">
        <span class="author-name">Sudarsna Mukund</span>
        <span class="author-role">Dancer, Technician</span>
      </div>
      <div class="author-group">
        <span class="author-name">Aarush Bothra</span>
        <span class="author-role">Musician, Composer, Technician</span>
      </div>
    </div>
  </header>

  <section class="metadata-grid" use:reveal={{ delay: 80 }}>
    <div><strong>Year:</strong> 2026</div>
    <div>
      <strong>Medium:</strong> movement and data driven audio and visual
      interactive performance
    </div>
    <div><strong>Duration:</strong> 15 minutes</div>
  </section>

  <nav class="story-nav" aria-label="Story sections">
    {#each ["Background", "Audio", "Images", "Program Notes", "Video"] as label, i}
      {@const sectionIds = [
        "background",
        "audio",
        "images",
        "program-notes",
        "video",
      ]}
      <button
        class:active={activeStep.section === sectionIds[i]}
        onclick={() => scrollToSection(sectionIds[i])}
      >
        {label}
      </button>
    {/each}
  </nav>

  <section class="scrolly" aria-label="Project story">
    <div class="scrolly-graphic" aria-hidden="true">
      <div class="graphic-inner">
        {#key activeStep.id}
          <div class="graphic-panel">
            {#if activeStep.visual === "map"}
              <IntersectionMap
                geojson={mapGeoJson}
                activeFeatureId={activeStep.mapFeatureId ?? null}
              />
            {:else if activeStep.visual === "video"}
              <div class="video-frame">
                <iframe
                  src="https://www.youtube.com/embed/Pe3TKUT6NIk?si=eDWRGkOi3ld9Slgi"
                  title="Embodied Geography performance video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>
            {:else if activeStep.visual === "program-notes"}
              <figure class="visual-figure">
                <img
                  src={programNotes.image}
                  alt="Program notes for Embodied Geography"
                />
                {#if activeStep.caption}
                  <figcaption>{activeStep.caption}</figcaption>
                {/if}
              </figure>
            {:else if activeStep.image}
              <figure class="visual-figure">
                <img src={activeStep.image} alt={activeStep.imageAlt ?? ""} />
                {#if activeStep.caption}
                  <figcaption>{activeStep.caption}</figcaption>
                {/if}
              </figure>
            {/if}
          </div>
        {/key}
      </div>
    </div>

    <div class="scrolly-steps" bind:this={scrollyStepsEl}>
      {#each storySteps as step, index (step.id)}
        <article
          class="step"
          class:active={activeIndex === index}
          data-step-index={index}
          id={step.section === "background" && index === 0
            ? "background"
            : step.section === "audio" && step.sectionLabel
              ? "audio"
              : step.section === "images" && step.sectionLabel
                ? "images"
                : step.section === "program-notes"
                  ? "program-notes"
                  : step.section === "video"
                    ? "video"
                    : undefined}
        >
          {#if step.sectionLabel}
            <p class="section-label">{step.sectionLabel}</p>
          {/if}

          <h2>{step.title}</h2>
          <p class="step-content">{step.content}</p>

          {#if step.audioLocationSlug && activeAudioLocation && activeIndex === index}
            <div class="audio-tracks">
              {#each activeAudioLocation.tracks as track}
                <div class="audio-track">
                  <div class="track-header">
                    <span class="track-label">{track.label}</span>
                    <p class="track-desc">{track.description}</p>
                  </div>
                  <audio controls preload="none" src={track.file}>
                    <a href={track.file}>Download {track.label} audio</a>
                  </audio>
                </div>
              {/each}
            </div>
          {/if}
        </article>
      {/each}
    </div>
  </section>
</div>

<style>
  .page {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem 0 6rem;
  }

  .project-header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding: 0 2rem;
  }

  h1 {
    font-family: "Texturina", serif;
    font-size: clamp(2rem, 4vw, 3.25rem);
    font-weight: 400;
    line-height: 1.15;
    margin: 0 0 1.5rem;
  }

  .authors {
    display: flex;
    justify-content: center;
    gap: 3rem;
    flex-wrap: wrap;
  }

  .author-group {
    display: flex;
    flex-direction: column;
  }

  .author-name {
    font-size: 1rem;
    font-weight: 600;
  }

  .author-role {
    font-size: 0.85rem;
    color: #555;
    margin-top: 0.2rem;
  }

  .metadata-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
    font-size: 0.9rem;
    padding: 0 2rem 2rem;
    color: #333;
    border-bottom: 1px solid #ccc;
    margin-bottom: 1.5rem;
  }

  .story-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    padding: 0 2rem 2.5rem;
    position: sticky;
    top: 5.5rem;
    z-index: 10;
    background: linear-gradient(
      to bottom,
      #f6f3ee 70%,
      rgba(246, 243, 238, 0)
    );
  }

  .story-nav button {
    border: 1px solid #ccc;
    background: #fff;
    padding: 0.45rem 0.85rem;
    font: inherit;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    cursor: pointer;
    border-radius: 4px;
    transition:
      background 0.2s,
      color 0.2s,
      border-color 0.2s;
  }

  .story-nav button:hover,
  .story-nav button.active {
    background: #111;
    color: #fff;
    border-color: #111;
  }

  .scrolly {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 3rem;
    padding: 0 2rem;
    align-items: start;
  }

  .scrolly-graphic {
    position: sticky;
    top: 9rem;
    height: calc(100vh - 10rem);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .graphic-inner {
    width: 100%;
    max-width: 620px;
  }

  .graphic-panel {
    animation: fadeIn 0.45s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .visual-figure {
    margin: 0;
    text-align: center;
  }

  .visual-figure img {
    width: 100%;
    height: auto;
    max-height: calc(100vh - 12rem);
    object-fit: contain;
    border-radius: 4px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  }

  .visual-figure figcaption {
    font-size: 0.85rem;
    color: #555;
    margin-top: 0.75rem;
    font-style: italic;
    text-align: center;
  }

  .video-frame {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  }

  .video-frame iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }

  .scrolly-steps {
    padding-bottom: 20vh;
  }

  .step {
    min-height: 85vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem 0;
    opacity: 0.35;
    transition: opacity 0.35s ease;
  }

  .step.active {
    opacity: 1;
  }

  .section-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #666;
    margin: 0 0 0.75rem;
  }

  h2 {
    font-family: "Texturina", serif;
    font-size: 1.65rem;
    font-weight: 400;
    margin: 0 0 1rem;
    line-height: 1.25;
  }

  .step-content {
    line-height: 1.75;
    font-size: 0.95rem;
    margin: 0;
    text-align: justify;
  }

  .audio-tracks {
    display: grid;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .audio-track {
    background: #fff;
    padding: 1rem 1.15rem;
    border-radius: 4px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }

  .track-header {
    margin-bottom: 0.65rem;
  }

  .track-label {
    display: block;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }

  .track-desc {
    font-size: 0.82rem;
    color: #555;
    margin: 0;
    text-align: left;
    line-height: 1.45;
  }

  .audio-track audio {
    width: 100%;
    height: 40px;
  }

  @media (max-width: 960px) {
    .scrolly {
      grid-template-columns: 1fr;
      gap: 0;
    }

    .scrolly-graphic {
      position: sticky;
      top: 7rem;
      height: auto;
      min-height: 42vh;
      padding: 1rem 0;
      background: #f6f3ee;
      border-bottom: 1px solid #ddd;
      z-index: 5;
    }

    .scrolly-steps {
      padding-top: 1rem;
    }

    .step {
      min-height: 65vh;
    }

    .story-nav {
      top: 4.5rem;
    }
  }
</style>
