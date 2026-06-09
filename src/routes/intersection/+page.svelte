<script lang="ts">
  import { goto } from "$app/navigation";
  import {
    intersectionCapstone,
    performanceImages,
    processImages
  } from "$lib/data/intersection";
</script>

<div class="page">
  <main>
    <!-- Academic Header Block -->
    <header class="project-header">
      <h1>
        Geographic Memories: Processing Operation Metro Surge through Gesture
        and Sound
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
    <section class="metadata-grid">
      <div><strong>Year:</strong> 2026</div>
      <div>
        <strong>Medium:</strong> Multimedia and performance art presentation
      </div>
      <div>
        <strong>Dimensions:</strong> 20ft × 25ft × 8ft minimum room dimensions
      </div>
    </section>

    <hr class="divider" />

    <!-- Main Hero Image Area -->
    <div class="hero-image-wrapper">
      <img
        src={intersectionCapstone[0].image}
        alt={intersectionCapstone[0].title}
      />
      <p class="caption">Figure 1: {intersectionCapstone[0].description}</p>
    </div>

    <!-- Abstract / Overview Context Section -->
    <section class="context-box">
      <p>
        In December 2025, Operation Metro Surge began in earnest in Minneapolis.
        Immigration enforcement actions escalated with the deployment of 4,000
        ICE agents to the Twin Cities and rural Minnesota. ICE occupation in the
        Twin Cities has affected both documented and undocumented people.
        Innocent civilians have been detained by ICE agents and subjected to
        unlawful and unconstitutional actions.
      </p>
    </section>

    <!-- Main Hero Image Area -->
    <div class="hero-image-wrapper">
      <img
        src={intersectionCapstone[1].image}
        alt={intersectionCapstone[1].title}
      />
      <p class="caption">Figure 1: {intersectionCapstone[1].description}</p>
    </div>

    <!-- Two-Column Description Section -->
    <section class="section-container">
      <h2>Description & Motivation</h2>
      <div class="two-column">
        <div class="col">
          <p>
            Understanding data is a difficult undertaking. Reading numbers and
            looking at charts can only divulge so much. Interactive data
            experiences employ creative methods to connect viewers with data on
            a more emotional level. Interactive data experiences are found in
            visual arts through forms like data sculptures and virtual reality
            data visualizations.
          </p>
          <p>
            However, we can also think about interacting with data through
            dance. How does using dance as an interaction tool impact the
            understanding of data? How would we use performing art to embody and
            experience a complicated, emotional situation? More specifically,
            what does dance bring to data interaction?
          </p>
          <p>
            Minneapolis has been under ICE occupation since November 2025 and
            residents have been affected in ways that cannot be fully explained
            through traditional methods of data visualization. We wish to
            explore what dance movement brings to data interaction. Using motion
            tracking and sound averaging, this movement piece tells a personal
            and data-supported story about the ICE occupation in Minnesota.
          </p>
        </div>
        <div class="col">
          <p>
            This movement piece features locations from Minneapolis’s city map
            placed throughout the stage. The dancer interacts with the points
            through gestures to explore the emotional impact of this experience.
            The expressive nature of dance allows us to convey emotional
            interpretations of data in ways that standard data interaction
            systems cannot fully capture.
          </p>
          <p>
            In this paper, we explain the design process of creating the system,
            narrative, and compositions that comprise this piece. This work
            contributes to a growing collaboration between performing artists
            and data visualization researchers and explores ways we can interact
            with data creatively.
          </p>
        </div>
      </div>
    </section>

    <section class="section-container technical">
      <h2>Reflections and Contributions</h2>
      <ul>
        <li>
          Providing the dancer with the ability to embody computer data through
          performing art. This approach leverages the human ability to
          understand and process emotional events through gesture and movement.
        </li>
        <li>
          Creating a design process to classify collected data into layers of
          emotion that correspond with existing information taxonomy models. In
          order to successfully interact with the system, data had to be
          processed into layers that could be revealed through gesture. Our
          motivation for splitting data into emotional layers was to ensure that
          technology was involved in the dramaturgy of the performance piece.
        </li>
      </ul>
      <p class="summary-note">
        Although data embodiment is not a new field, we have successfully
        integrated motion tracking and sound averaging into a working system
        that enables an artistic user interface. We hope that our system
        encourages future explorations with dance interaction with data. None of
        the techniques we have used are particularly novel, but the way we have
        combined them is to be in service to performing artists.
      </p>
    </section>

    <section class="section-container technical">
      <h2>Technical Requirements</h2>
      <p>
        This work is designed to be presented physically within the gallery
        space, while remaining adaptable for a virtual art exhibition layout.
        The installation requires a minimum spatial footprint of 20ft × 25ft ×
        8ft to accommodate motion tracking sensors and physical performance
        elements.
      </p>
      <blockquote>
        <strong>Required Infrastructure:</strong> Tripod, ZED Stereo 2i Depth Camera,
        Stereo Speakers, 2 to 3 Stage Lights.
      </blockquote>
    </section>

    <section class="section-container resources">
      <h2>Supporting Material</h2>
      <div class="resource-links">
        <a href="#images" class="resource-card">Images</a>

        <a href="#audio" class="resource-card">Audio Composition</a>
        <a href="#dance" class="resource-card">Movement Composition</a>
        <a href="#video" class="resource-card">Performance Video</a>
      </div>
<div id="images" class="image-grid">
<h2>January 2026 - June 2026: Development of Movements, System Design, and Process </h2>
  {#each processImages as process_img}
    <div class="card">
      <img src={process_img.image} alt={process_img.title} />
      <div class="card-details">
        <span class="card-title">{process_img.title}</span>
        <p class="card-desc">{process_img.description}</p>
      </div>
    </div>
  {/each}
</div>
<div id="images" class="image-grid">
<h2>May 13, 2026: VirtuART; Regis Center for Art West</h2>
  {#each performanceImages as perf_img}
    <div class="card">
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
      <h2>May 13, 2026: VirtuART; Regis Center for Art West</h2>
      <h3>Performance Video</h3>
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
    max-height: 550px;
    object-fit: cover;
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
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
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

  /* This forces the image to scale DOWN into the box without cropping */
  .card img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain; /* Ensures the whole image stays visible */
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
