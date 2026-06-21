<script lang="ts">
  import { reveal } from "$lib/actions/reveal";
  import {
    intersectionCapstone,
    performanceImages,
    processImages,
  } from "$lib/data/intersection";
</script>

<div class="page">
  <main>
    <!-- Academic Header Block -->
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

    <!-- General Info Key-Value Row -->
    <section class="metadata-grid" use:reveal={{ delay: 80 }}>
      <div><strong>Year:</strong> 2026</div>
      <div>
        <strong>Medium:</strong> movement and data driven audio and visual interactive
        performance
      </div>
      <div>
        <strong>Duration:</strong> 15 minutes
      </div>
    </section>

    <hr class="divider" />

    <!-- Main Hero Image Area -->
    <div class="hero-image-wrapper" use:reveal>
      <img
        src={intersectionCapstone[0].image}
        alt={intersectionCapstone[0].title}
      />
      <p class="caption">Figure 1: {intersectionCapstone[0].description}</p>
    </div>

    <section class="context-box" use:reveal>
      <p>
In December 2025, Operation Metro Surge began in
            Minneapolis. Immigration enforcement actions escalated with
            deployment of 4,000 ICE agents to the Twin Cities and rural
            Minnesota. ICE occupation in the Twin Cities has affected both
            documented and undocumented people. This activity culminated in the
            death of two residents of Minneapolis, Renee Nicole Good and Alex
            Pretti.
      </p>
    </section>

    <div class="hero-image-wrapper" use:reveal>
      <img
        src={intersectionCapstone[1].image}
        alt={intersectionCapstone[1].title}
      />
      <p class="caption">Figure 1: {intersectionCapstone[1].description}</p>
    </div>

    <section class="section-container resources" use:reveal>
      <h2>Supporting Material</h2>
      <div class="resource-links">
        <a href="#images" class="resource-card">Images</a>

        <a href="#audio" class="resource-card">Audio Composition</a>
        <a href="#dance" class="resource-card">Movement Composition</a>
        <a href="#video" class="resource-card">Performance Video</a>
      </div>
      <div id="images" class="image-grid">
        <h2>
          January 2026 - June 2026: Development of Movements, System Design, and
          Process
        </h2>
        {#each processImages as process_img, i}
          <div class="card" use:reveal={{ delay: (i % 3) * 60 }}>
            <img src={process_img.image} alt={process_img.title} />
            <div class="card-details">
              <span class="card-title">{process_img.title}</span>
              <p class="card-desc">{process_img.description}</p>
            </div>
          </div>
        {/each}
      </div>
      <div id="images" class="image-grid">
        <h2>May 13, 2026: VirtuART; Regis Center for Art West, UMN, Minneapolis, MN</h2>
        {#each performanceImages as perf_img, i}
          <div class="card" use:reveal={{ delay: (i % 3) * 60 }}>
            <img src={perf_img.image} alt={perf_img.title} />
            <div class="card-details">
              <span class="card-title">{perf_img.title}</span>
              <p class="card-desc">{perf_img.description}</p>
            </div>
          </div>
        {/each}
      </div>
      <div id="audio"></div>
      <div id="dance"></div>
      <div id="video" class="hero-image-wrapper">
        <h2>May 13, 2026: VirtuART; Regis Center for Art West, UMN, Minneapolis, MN</h2>
        <h3>Performance Video</h3>
        <p class="summary-note"> In-process showing of the system and the performance. </p>
        <iframe
          src="https://www.youtube.com/embed/Pe3TKUT6NIk?si=eDWRGkOi3ld9Slgi"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </section>
    <!-- <section class="section-container" use:reveal>
      <h2>Description & Motivation</h2>
      <div class="two-column">
        <div class="col">
          <p>
            Embodied Geography is a contemporary dance and sound performance
            exploring emotional responses to Operation Metro Surge using ideas
            of data embodiment. We explored our personal recollection of the
            experience of being a Minneapolis resident during the 2025-2026 ICE
            occupation. This performance originated out of a desire to share the
            emotional data from this experience ethically and with respect to
            the affected. As an alternative to passive observation, we embody
            our experiences as data into a performance that audiences can
            connect with viscerally.
          </p>
          <p>
          This performance is a student-led artistic effort. We approached the
            creation of this work from our background studying computer science
            and visualization, but also from our artistic experience. Allowing
            students with a mixed technological and art background to speak from
            firsthand experience, with the support of our lab, amplifies that
            perspective both on campus and to other students in the wider
            visualization space.
          </p>
        </div>
        <div class="col">
          <p>
 This performance authentically gives a voice to
            students within our community, those grounded squarely in the center
            of this occupation, and allows others to witness our resilience. As
            both witnesses to and subjects of the brutality and emotional
            devastation that ICE caused in Minneapolis, we sought to amplify our
            experiences with the design, artistic creativity, and interactivity
            of our data visualization. Using music and dance, mediums deeply
            intertwined with emotions, to represent and share our emotional
            reaction to the events of the ICE occupation challenges the
            assumption that data visualization needs to be inherently objective
            in order to be impactful.
          </p>
        </div>
      </div>
    </section>

    <section class="section-container technical" use:reveal>
      <h2>Information Taxonomy, Design Process</h2>
      <p>
        Using our collected data, we used traditional methods for parsing and
        displaying data to drive our interaction design. We used the information
        taxonomy model outlined in Ben Schneiderman’s “The Eyes Have It” to
        create our data interaction model to uncover layers of information:
      </p>
      <ul>
        <li>
          Dancer position in the room maps to overview - seeing the whole
          dataset at once
        </li>
        <li>
          Dancer position into the defined light circles maps to zoom and
          filter- a smaller subset of the data
        </li>
        <li>
          Dancer hand gesture and distance maps to details on demand - one
          datapoint, with representative movement through gesture, pulls up a
          specific detail
        </li>
        <li>
          Dancer position maps to filtering- irrelevant areas of the space are
          not revealed to the dancer because they are outside the interaction
          threshold
        </li>
      </ul>
      <p class="summary-note">
          Working from an artistic approach informed our design process to
          classify collected data into layers of emotion that correspond with
          existing information taxonomy models. In order for a dancer to
          successfully interact with the system, data had to be processed into
          layers that could be revealed through gesture. Using dance movements
          as the main interaction method provides a different dimension to
          experience data by using the expressivity of the human body as a tool
          for data understanding. This ensured that technology was involved in
          the dramaturgy of the performance piece.
      </p>
    </section> -->

    <section class="section-container technical" use:reveal>
      <h2>Technical Requirements</h2>
      <p></p>
      <blockquote>
        <strong>Required Infrastructure:</strong> Tripod, ZED Stereo 2i Depth Camera,
        Stereo Speakers, 2 to 3 Stage Lights.
      </blockquote>
    </section>

  </main>
</div>

<style>
  :global(body) {
    margin: 0;
    background: #f6f3ee;
    color: #111;
    font-family: "IBM Plex Mono", monospace;
  }

  .page {
    padding: 4rem 2rem;
    max-width: 1000px;
    margin: 0 auto;
    min-height: 100vh;
  }

  .project-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .venue-tag {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #666;
    margin-bottom: 1rem;
  }

  h1 {
    font-family: "Texturina", serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 400;
    line-height: 1.1;
    margin: 0 0 2rem 0;
  }

  .authors {
    display: flex;
    justify-content: center;
    gap: 3rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }

  .author-group {
    display: flex;
    flex-direction: column;
  }

  .author-name {
    font-size: 1.1rem;
    font-weight: 600;
  }

  .author-role {
    font-size: 0.85rem;
    color: #555;
    margin-top: 0.2rem;
  }

  .metadata-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    font-size: 0.9rem;
    padding: 0 1rem;
    color: #333;
  }

  .divider {
    border: none;
    border-top: 1px solid #ccc;
    margin: 3rem 0;
  }

  .hero-image-wrapper {
    margin-bottom: 4rem;
    text-align: center;
  }

  .hero-image-wrapper img {
    width: 100%;
    max-height: none;
    height: auto;
    object-fit: contain;
    border-radius: 4px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  }

  .hero-image-wrapper iframe {
    width: 100%;
    height: 650px;
    border-radius: 4px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  }

  .caption {
    font-size: 0.85rem;
    color: #555;
    margin-top: 0.8rem;
    font-style: italic;
  }

  .context-box {
    background-color: rgba(0, 0, 0, 0.03);
    padding: 2rem;
    border-left: 3px solid #111;
    margin-bottom: 4rem;
  }

  .context-box p {
    margin: 0;
    max-width: 100%;
    font-size: 1rem;
    line-height: 1.7;
  }

  .section-container {
    margin-bottom: 4rem;
  }

  h2 {
    font-family: "Texturina", serif;
    font-size: 1.75rem;
    border-bottom: 1px solid #ddd;
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .two-column {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
  }

  @media (max-width: 768px) {
    .two-column {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }

  p {
    line-height: 1.7;
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
    text-align: justify;
  }

  /* Contributions and Technical Styling */
  ul {
    padding-left: 1.2rem;
    margin-bottom: 1.5rem;
  }

  li {
    font-size: 0.95rem;
    line-height: 1.7;
    margin-bottom: 1rem;
    text-align: justify;
  }

  blockquote {
    margin: 1.5rem 0;
    padding: 1rem 1.5rem;
    background: #ebe7e0;
    border-radius: 4px;
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .summary-note {
    margin-top: 2rem;
    font-style: italic;
    color: #444;
  }

  .resource-links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .resource-card {
    display: block;
    padding: 1.2rem;
    background: #fff;
    border: 1px solid #ddd;
    text-align: center;
    text-decoration: none;
    color: #111;
    font-weight: 600;
    font-size: 0.9rem;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .resource-card:hover {
    background: #111;
    color: #fff;
    border-color: #111;
  }

  .image-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 2rem;
    align-items: start;
  }

  .card {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    background: #fff;
    padding: 1rem;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }

  /* This limits how big the image area can get */
  .image-container {
    width: 100%;
    height: 180px; /* Adjust this number to make the thumbnails smaller or larger */
    background: #f0ebe1; /* Optional: adds a subtle background for transparent/letterboxed images */
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    overflow: hidden;
  }

  .card img {
    width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
    border-radius: 2px;
    background: #f0ebe1;
  }

  .card-title {
    font-weight: 600;
    font-size: 0.9rem;
  }

  .card-desc {
    font-size: 0.8rem;
    color: #555;
    margin: 0;
    text-align: left;
    line-height: 1.4;
  }

  @media (max-width: 768px) {
    .image-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
