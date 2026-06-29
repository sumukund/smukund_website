<script lang="ts">
  import { onMount } from "svelte";
  import { reveal } from "$lib/actions/reveal";
  import IntersectionMap from "$lib/components/IntersectionMap.svelte";
  import {
    audioLocations,
    imageGallerySteps,
    mapGeoJson,
    programNotes,
    storySteps
  } from "$lib/data/intersection";

  let activeIndex = $state(0);
  let scrollyStepsEl = $state<HTMLElement | undefined>();
  let videoSectionEl = $state<HTMLElement | undefined>();
  let stepProgress = $state(0);
  let isAudioPlaying = $state(false);
  let activePlaybackImageIndex = $state(0);
  let playingAudioStepId = $state<string | null>(null);
  let hoveredMapFeatureId = $state<number | null>(null);

  const activeStep = $derived(storySteps[activeIndex]);
  const scrollyStorySteps = $derived(
    storySteps.filter((step) => step.section !== "video")
  );
  const videoStep = $derived(storySteps.find((step) => step.section === "video"));
  const videoStepIndex = $derived(
    storySteps.findIndex((step) => step.section === "video")
  );
  const activeAudioLocation = $derived(
    activeStep.audioLocationSlug
      ? audioLocations.find((loc) => loc.slug === activeStep.audioLocationSlug)
      : undefined
  );
  const activeAudioLocations = $derived(
    activeStep.audioLocationSlugs
      ? activeStep.audioLocationSlugs
          .map((slug) => audioLocations.find((loc) => loc.slug === slug))
          .filter((loc): loc is (typeof audioLocations)[number] => loc !== undefined)
      : activeAudioLocation
        ? [activeAudioLocation]
        : []
  );
  const galleryItems = $derived(
    imageGallerySteps.map((step) => ({
      id: step.id,
      image: step.image!,
      imageAlt: step.imageAlt ?? step.title,
      title: step.title,
      caption: step.caption,
    }))
  );
  const activePlaybackImage = $derived(
    galleryItems[activePlaybackImageIndex % Math.max(galleryItems.length, 1)]
  );
  const activeProgramNoteImage = $derived(
    activeStep.section === "program-notes"
      ? (programNotes.images[activeStep.programNoteImageIndex ?? 0] ?? null)
      : null
  );
  const showPlaybackImage = $derived(
    !!(
      activeStep.section === "geography" &&
      activeStep.id === playingAudioStepId &&
      isAudioPlaying &&
      activePlaybackImage
    )
  );
  const activeHoverPoint = $derived(
    activeStep.mapPoints?.find((point) => point.featureId === hoveredMapFeatureId) ??
      null
  );
  const activeMapFeatureId = $derived(
    activeStep.id === "geography-remaining-points"
      ? (hoveredMapFeatureId ?? null)
      : (activeStep.mapFeatureId ?? null)
  );

  // Derived animation values from stepProgress
  // Caption fades out in the first half of scroll (0→0.5 maps to opacity 1→0)
  const captionOpacity = $derived(
    activeStep.section === "background" && activeStep.poem
      ? Math.max(0, 1 - stepProgress * 2.2)
      : 1
  );

    // image size increases during second half
  const imageSize = $derived(
    activeStep.section === "background" && activeStep.image
      ? Math.max(0, Math.min(1, (stepProgress - 0.3) * 2.5))
      : 0
  );

  $effect(() => {
    if (
      activeStep.section !== "geography" ||
      activeStep.id !== playingAudioStepId
    ) {
      isAudioPlaying = false;
      playingAudioStepId = null;
    }

    if (activeStep.id !== "geography-remaining-points") {
      hoveredMapFeatureId = null;
    }
  });

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
              stepProgress = 0; // reset progress on step change

            }
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    stepElements.forEach((el) => observer.observe(el));
    if (videoSectionEl) observer.observe(videoSectionEl);

    const updateStepProgress = () => {
      if (!scrollyStepsEl) return;
      const activeEl = scrollyStepsEl.querySelector<HTMLElement>(
        `[data-step-index="${activeIndex}"]`
      );
      if (!activeEl) return;

      // Only animate progress for background steps with poems
      const step = storySteps[activeIndex];
      if (step.section !== "background" || !step.poem) {
        stepProgress = 0;
        return;
      }

      const rect = activeEl.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when element top is at bottom of viewport, 1 when element bottom is at top
      const raw = (vh - rect.top) / (rect.height + vh);
      stepProgress = Math.max(0, Math.min(1, raw));
    };

    window.addEventListener("scroll", updateStepProgress, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateStepProgress);
    };
  });

  function scrollToSection(section: string) {
    if (section === "video") {
      videoSectionEl?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    const index = storySteps.findIndex((s) => s.section === section);
    if (index < 0 || !scrollyStepsEl) return;
    const target = scrollyStepsEl.querySelector<HTMLElement>(
      `[data-step-index="${index}"]`
    );
    target?.scrollIntoView({ behavior: "smooth" });
  }

  function handleAudioPlay(event: Event, trackIndex: number, locationSlug: string) {
    if (!galleryItems.length) return;

    const audio = event.currentTarget as HTMLAudioElement;
    document.querySelectorAll<HTMLAudioElement>("audio").forEach((el) => {
      if (el !== audio) el.pause();
    });

    const locationIndex = audioLocations.findIndex(
      (location) => location.slug === locationSlug
    );
    const baseIndex = Math.max(locationIndex, 0) * 4;
    activePlaybackImageIndex = (baseIndex + trackIndex) % galleryItems.length;
    playingAudioStepId = activeStep.id;
    isAudioPlaying = true;
  }

  function handleAudioPause(event: Event) {
    const audio = event.currentTarget as HTMLAudioElement;
    if (audio.currentTime < audio.duration) return;
    isAudioPlaying = false;
    playingAudioStepId = null;
  }
</script>

<svelte:head>
  <title>Embodied Geography</title>
</svelte:head>

<div class="page">
  <header class="project-header" use:reveal>
    <h1>
      Embodied Geography: Processing Operation Metro Surge through Gesture and
      Sound
    </h1>

    <div class="authors">
      <div class="author-group">
        <span class="author-name">Sudarsna Mukund, University of Minnesota</span>
        <span class="author-role">Dancer, Technician</span>
      </div>
      <div class="author-group">
        <span class="author-name">Aarush Bothra, University of Minnesota</span>
        <span class="author-role">Musician, Composer, Technician</span>
      </div>
    </div>
  </header>

  <section class="metadata-grid" use:reveal={{ delay: 80 }}>
    <div><strong>Year:</strong> 2026</div>
    <div>
      <strong>Medium:</strong> movement and sound
      interactive performance
    </div>
    <div><strong>Duration:</strong> 15 minutes</div>
    <div><a href="https://ivlab.cs.umn.edu/">University of Minnesota, Interactive Visualization Lab </a></div>
  </section>
    <section class="acknowledgements" use:reveal={{ delay: 80 }}>
    <div><strong>Acknowledgements:</strong> Thank you to Dr. Daniel Keefe and members of the Interactive Visualization Lab at the University of Minnesota, the University of Minnesota ArTeS Collaborative Studio and Diane Willow for the use of ArTeS Studio for development,  Dr. Qianwen Wang,  Professor jess pretty and the University of Minnesota Theater and Dance Department for the guidance on gesture and movement.</div>
    <div>
      
    </div>
  </section>

  <nav class="story-nav" aria-label="Story sections">
    {#each ["Background", "Program Notes", "Geography", "Video"] as label, i}
      {@const sectionIds = [
        "background",
        "program-notes",
        "geography",
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
        {#key `${activeStep.id}-${showPlaybackImage ? activePlaybackImage?.id : "map"}`}
          <div class="graphic-panel">
            {#if showPlaybackImage && activePlaybackImage}
              <figure class="visual-figure playback-figure">
                <img
                  src={activePlaybackImage.image}
                  alt={activePlaybackImage.imageAlt}
                />
                <figcaption>
                  {activePlaybackImage.title}
                  {#if activePlaybackImage.caption}
                    <span>{activePlaybackImage.caption}</span>
                  {/if}
                </figcaption>
              </figure>
            {:else if activeStep.visual === "map"}
              <IntersectionMap
                geojson={mapGeoJson}
                activeFeatureId={activeMapFeatureId}
                hoverPreview={activeStep.id === "geography-remaining-points" ? activeHoverPoint : null}
              />
            {:else if activeStep.visual === "program-notes"}
              {#if activeStep.reverseLayout}
                <div class="program-note-poem">
                  <h2>{activeStep.title}</h2>
                  <p>{activeStep.poem}</p>
                </div>
              {:else}
                <figure class="program-note-image">
                  {#if activeProgramNoteImage}
                    <img
                      src={activeProgramNoteImage.image}
                      alt={activeProgramNoteImage.alt}
                    />
                    {#if activeProgramNoteImage.caption}
                      <figcaption>{activeProgramNoteImage.caption}</figcaption>
                    {/if}
                  {:else}
                    <div class="program-note-placeholder">
                      <span>Image space</span>
                    </div>
                  {/if}
                </figure>
              {/if}
            {:else if activeStep.image}
              <figure class="visual-figure">
                <div class="image-poem-wrapper">
                  <img
                    src={activeStep.image}
                    style:width={`${80 + imageSize * 20}%`}
                    alt={activeStep.imageAlt ?? ""}
                  />

                  {#if activeStep.caption}
                    <figcaption
                      class="caption-animated"
                      style:opacity={captionOpacity}
                    >
                      {activeStep.caption}
                    </figcaption>
                  {/if}
                </div>
              </figure>
            {/if}
          </div>
        {/key}
      </div>
    </div>

    <div class="scrolly-steps" bind:this={scrollyStepsEl}>
      {#each scrollyStorySteps as step (step.id)}
        {@const index = storySteps.findIndex((storyStep) => storyStep.id === step.id)}
        <article
          class="step"
          class:active={activeIndex === index}
          data-step-index={index}
          id={step.section === "background" && index === 0
            ? "background"
            : step.section === "program-notes" && step.sectionLabel
              ? "program-notes"
              : step.section === "geography" && step.sectionLabel
                ? "geography"
                  : step.section === "video"
                    ? "video"
                    : undefined}
        >

          {#if step.section === "program-notes"}
            <div
              class="program-note-side"
              class:image-side={step.reverseLayout}
            >
              {#if step.reverseLayout}
                {@const noteImage = programNotes.images[step.programNoteImageIndex ?? 0] ?? null}
                <figure class="program-note-image">
                  {#if noteImage}
                    <img src={noteImage.image} alt={noteImage.alt} />
                    {#if noteImage.caption}
                      <figcaption>{noteImage.caption}</figcaption>
                    {/if}
                  {:else}
                    <div class="program-note-placeholder">
                      <span>Image space</span>
                    </div>
                  {/if}
                </figure>
              {:else}
                <div class="program-note-poem">
                  <h2>{step.title}</h2>
                  <p>{step.poem}</p>
                </div>
              {/if}
            </div>
          {:else}
            <h2>{step.title}</h2>
            <p class="step-content">{step.content}</p>
          {/if}
          
          {#if step.id === "geography-remaining-points" && step.mapPoints}
            <div class="map-point-explorer">
            <h3>Hover over the points to view the locations.</h3>
              <div class="map-point-list">
                {#each step.mapPoints as point}
                  <button
                    type="button"
                    class:active={activeHoverPoint?.featureId === point.featureId}
                    onmouseenter={() => (hoveredMapFeatureId = point.featureId)}
                    onmouseleave={() => (hoveredMapFeatureId = null)}
                    onfocus={() => (hoveredMapFeatureId = point.featureId)}
                    onblur={() => (hoveredMapFeatureId = null)}
                  >
                    <span>{point.title}</span>
                    {#if point.content}
                      <small>{point.content}</small>
                    {/if}
                  </button>
                {/each}
              </div>
            </div>
          {/if}
          {#if step.audioLocationSlugs && activeAudioLocations.length && activeIndex === index}
            <div class="audio-tracks">
              {#each activeAudioLocations as location}
                <div class="audio-location">
                  <h3>{location.name}</h3>
                  <p>{location.context}</p>
                  {#each location.tracks as track, trackIndex}
                    <div class="audio-track">
                      <div class="track-header">
                        <span class="track-label">{track.label}</span>
                        <p class="track-desc">{track.description}</p>
                      </div>
                      <audio
                        controls
                        preload="none"
                        src={track.file}
                        onplay={(event) =>
                          handleAudioPlay(event, trackIndex, location.slug)}
                        onended={() => {
                          isAudioPlaying = false;
                          playingAudioStepId = null;
                        }}
                        onpause={handleAudioPause}
                      >
                        <a href={track.file}>Download {track.label} audio</a>
                      </audio>
                    </div>
                  {/each}
                </div>
              {/each}
            </div>
          {/if}

        </article>
      {/each}
    </div>
  </section>

  {#if videoStep}
    <section
      class="video-section"
      bind:this={videoSectionEl}
      data-step-index={videoStepIndex}
      id="video"
      use:reveal
    >
      <div class="video-copy">
        <h2>{videoStep.title}</h2>
        <p>{videoStep.content}</p>
      </div>
      <div class="video-frame">
        <iframe
          src="https://www.youtube.com/embed/Pe3TKUT6NIk?si=eDWRGkOi3ld9Slgi"
          title="Embodied Geography performance video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </section>
  {/if}
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
    .acknowledgements {
    display: block;
    font-style: italic;
    gap: 1rem;
    font-size: 0.9rem;
    padding: 0 2rem 2rem;
    color: #333;
    margin-bottom: 1.5rem;
  }

  .story-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    padding: 1rem 2rem 2.5rem;
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

  .program-note-poem {
    width: 100%;
    overflow: none;
    padding: 1.5rem;
    border-left: 1px solid #cfc8ba;
    background: rgba(255, 255, 255, 0.38);
  }

  .program-note-poem h2 {
    margin-bottom: 1.25rem;
  }

  .program-note-poem p {
    margin: 0;
    white-space: pre-wrap;
    font-family: "Texturina", Georgia, serif;
    font-size: clamp(0.82rem, 1vw, 1rem);
    line-height: 1.65;
    text-align: left;
  }

  .program-note-image {
    margin: 0;
    width: 100%;
  }

  .program-note-image img {
    width: 100%;
    height: auto;
    max-height: calc(100vh - 12rem);
    object-fit: contain;
    display: block;
    border-radius: 4px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  }

  .program-note-image figcaption {
    font-size: 0.85rem;
    color: #555;
    margin-top: 0.75rem;
    font-style: italic;
    text-align: center;
  }

  .program-note-placeholder {
    min-height: min(520px, calc(100vh - 12rem));
    border: 1px dashed #bcb4a6;
    border-radius: 4px;
    background:
      linear-gradient(135deg, rgba(255, 255, 255, 0.45), rgba(232, 228, 220, 0.4)),
      #eee9df;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .program-note-placeholder span {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #766f64;
  }

  .program-note-side {
    width: 100%;
  }

  .playback-figure img {
    max-height: calc(100vh - 14rem);
  }

  .playback-figure figcaption {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .playback-figure figcaption span {
    font-size: 0.78rem;
    color: #666;
  }

  /* --- Image + poem wrapper: positions overlays relative to the image --- */
  .image-poem-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  /* Caption fades out as the step scrolls — driven by captionOpacity derived value */
  .caption-animated {
    font-size: 0.85rem;
    color: #555;
    margin-top: 0.75rem;
    font-style: italic;
    text-align: center;
  }

  /* Poem sits centred over the image, hidden until scroll brings it in */
  .poem-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: right;
    justify-content: right;
    padding: 1rem 2.5rem;
    border-radius: 4px;
    /* Subtle dark gradient so text is always legible over the photo */
    background: linear-gradient(
      160deg,
      rgba(0, 0, 0, 0.08) 0%,
      rgba(0, 0, 0, 0.42) 100%
    );
    pointer-events: none;
  }

  .poem-text {
    font-family: "Texturina", Georgia, serif;
    font-size: clamp(0.6rem, 1.1vw, 0.8rem);
    line-height: 1.23;
    text-align: left;
    white-space: pre-wrap;
    color: hsl(0, 0%, 100%);
    text-shadow:
      0 1px 3px rgba(0, 0, 0, 0.55),
      0 0 12px rgba(0, 0, 0, 0.25);
    margin: 0;
    letter-spacing: 0.02em;
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

  .audio-location {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.85rem;
  }

  .audio-location + .audio-location {
    margin-top: 1rem;
    padding-top: 1.25rem;
    border-top: 1px solid #d8d0c3;
  }

  .audio-location h3 {
    font-family: "Texturina", serif;
    font-size: 1.1rem;
    font-weight: 400;
    margin: 0;
  }

  .audio-location > p {
    font-size: 0.86rem;
    line-height: 1.5;
    color: #555;
    margin: -0.35rem 0 0;
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

  .map-point-explorer {
    display: grid;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .map-point-list {
    display: grid;
        grid-template-columns: repeat(5, 1fr);

    gap: 0.65rem;
  }

  .map-point-list button {
    display: grid;
    border: 1px solid #d8d0c3;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.72);
    padding: 0.85rem 1rem;
    text-align: left;
    font: inherit;
    cursor: pointer;
    transition:
      background 0.2s,
      border-color 0.2s,
      transform 0.2s;
  }

  .map-point-list button:hover,
  .map-point-list button:focus,
  .map-point-list button.active {
    background: #fff;
    border-color: #111;
    outline: none;
    transform: translateX(4px);
  }

  .map-point-list span {
    display: grid;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }

  .map-point-list small {
    display: grid;
    color: #555;
    font-size: 0.78rem;
    line-height: 1.4;
  }

  .map-point-preview {
    margin: 0;
  }

  .map-point-preview img {
    width: 100%;
    max-height: 80px;
    object-fit: cover;
    display: block;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  }

  .video-section {
    width: calc(100% - 4rem);
    max-width: 1200px;
    margin: 4rem auto 0;
    scroll-margin-top: 8rem;
  }

  .video-copy {
    max-width: 680px;
    margin-bottom: 1.25rem;
  }

  .video-copy p {
    line-height: 1.7;
    font-size: 0.95rem;
    margin: 0;
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
    .poem-overlay {
      padding: 1.25rem 1.5rem;
    }

    .poem-text {
      font-size: 0.85rem;
      line-height: 1.7;
    }

    .program-note-poem,
    .program-note-image img,
    .program-note-placeholder {
      max-height: none;
    }

    .program-note-placeholder {
      min-height: 320px;
    }

    .video-section {
      width: calc(100% - 2rem);
      margin-top: 2rem;
      scroll-margin-top: 7rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .poem-overlay,
    .caption-animated {
      /* Still show/hide, but without the movement */
      transition: opacity 0.5s ease;
    }
  }
</style>
