<script lang="ts">
  import { engineeringExperience } from '$lib/data/engineering';
  import { reveal } from '$lib/actions/reveal';
  import { onMount } from 'svelte';

  let activeSection = $state('');

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeSection = entry.target.id;
          }
        }
      },
      { threshold: 0.2, rootMargin: '-10% 0px -70% 0px' }
    );

    document.querySelectorAll('.cv-section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  });
</script>

<section class="cv">
  <header class="nav-header">
    <nav class="section-nav">
      <a href="#education" class:active={activeSection === 'education'}>Education</a>
      <a href="#research" class:active={activeSection === 'research'}>Lab</a>
      <a href="#industry" class:active={activeSection === 'industry'}>Industry Experience</a>
    </nav>
  </header>

  <div class="quote reveal" use:reveal>
    <p>
      “A rising star who has spent the last several years
      building advanced ML, computer vision, and 3D capabilities.
      Sudarsna also brings strong front-end experience and a
      track record of diving deep into complex technical challenges.”
    </p>
    <span>— Todd Hagen, Principal Engineer</span>
  </div>

  {#each engineeringExperience as section}
    <section class="cv-section" id={section.id}>
      <h2 class="reveal" use:reveal>{section.section}</h2>

      {#each section.entries as entry}
        <div class="entry reveal" use:reveal>
          <div class="meta">
            <span class="year-badge">{entry.years}</span>
          </div>

          <div class="content" use:reveal>
            <h3>{entry.title}</h3>
            <p class="organization">{entry.organization}</p>

            {#if entry.link}
              <a href={entry.link} target="_blank" class="research-link" use:reveal>
                Explore Lab Work <span class="arrow">→</span>
              </a>
            {/if}

            {#if entry.description}
              <ul class="styled-list" use:reveal>
                {#each entry.description as item}
                  <li>{item}</li>
                {/each}
              </ul>
            {/if}

            {#if entry.relevant_coursework}
              <div class="coursework-section" use:reveal>
                <h4>Relevant Coursework</h4>
                <div class="tag-container">
                  {#each entry.relevant_coursework as item}
                    <span class="course-tag">{item}</span>
                  {/each}
                </div>
              </div>
            {/if}

            {#if entry.projects}
              <div class="projects" use:reveal>
                <h4>Selected Projects</h4>
                <div class="project-grid">
                  {#each entry.projects as project}
                    <div class="project-card">
                      <a href={project.link} target="_blank" class="project-title-link">
                        {project.name} <span class="arrow">↗</span>
                      </a>
                      <p>{project.description}</p>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </section>
  {/each}
</section>

<style>
  /* Base setup with smooth scrolling enabled */
  :global(html) {
    scroll-behavior: smooth;
  }

  .cv {
    margin: 0 auto;
  }

  /* --- STICKY NAVIGATION UPGRADES --- */
  .nav-header {
    position: sticky;
    top: 0;
    background: rgba(246, 243, 238, 0.9); /* Matches your project body background */
    backdrop-filter: blur(12px);
    z-index: 100;
    margin-bottom: 6rem;
  }

  .section-nav {
    display: flex;
    flex-wrap: nowrap;
    gap: 2.5rem;
    padding: 2rem 0 1.5rem 0;
    border-bottom: 1px solid rgba(0,0,0,0.06);
  }

  .section-nav a {
    text-decoration: none;
    color: inherit;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.15rem;
    opacity: 0.4;
    font-weight: 500;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    padding-bottom: 0.5rem;
  }

  /* Animated underline indicator for active item */
  .section-nav a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #111;
    transition: width 0.3s ease;
  }

  .section-nav a:hover, .section-nav a.active {
    opacity: 1;
    color: #000;
  }

  .section-nav a.active::after {
    width: 100%;
  }

  /* --- SCROLL REVEAL ANIMATIONS --- */
  .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.8s cubic-bezier(0.215, 0.61, 0.355, 1), 
                transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  :global(.reveal.revealed) {
    opacity: 1;
    transform: translateY(0);
  }

  .quote {
    margin-bottom: 5rem;
    padding-bottom: 2rem;
  }

  .quote p {
    font-family: 'Texturina', serif;
    font-size: clamp(1.3rem, 2.5vw, 2.2rem);
    line-height: 1.5;
    font-weight: 300;
    max-width: 900px;
    margin: 0 0 2rem;
    color: #222;
  }

  .quote span {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.12rem;
    opacity: 0.6;
  }

  .cv-section {
    margin-bottom: 5rem;
  }

  .cv-section h2 {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.16rem;
    font-weight: 600;
    opacity: 0.4;
    margin-bottom: 1rem;
  }

  .entry {
    display: grid;
    grid-template-columns: 180px 1fr;
    gap: 3.5rem;
    padding: 3.5rem 0;
    border-top: 1px solid rgba(0,0,0,0.06);
  }

  .year-badge {
    font-size: 0.85rem;
    font-weight: 600;
    opacity: 0.5;
    background: rgba(0,0,0,0.03);
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    display: inline-block;
  }

  .content h3 {
    font-family: 'Texturina', serif;
    font-size: 1.85rem;
    font-weight: 400;
    margin: 0;
    color: #111;
  }

  .organization {
    margin: 0.5rem 0 1.5rem;
    font-size: 1rem;
    opacity: 0.6;
    font-weight: 500;
  }

  /* Micro-interactions on links */
  .research-link {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    color: #111;
    font-weight: 600;
    font-size: 0.9rem;
    text-decoration: none;
    margin-bottom: 1.5rem;
  }

  .research-link .arrow {
    transition: transform 0.2s ease;
  }

  .research-link:hover .arrow {
    transform: translateX(4px);
  }

  .styled-list {
    margin: 0 0 2rem 0;
    padding-left: 1.2rem;
  }

  .styled-list li {
    margin-bottom: 0.75rem;
    line-height: 1.7;
    font-size: 1rem;
    color: #333;
  }

  /* --- COURSEWORK CHIPS/TAGS --- */
  .coursework-section {
    margin-top: 2rem;
  }

  .coursework-section h4, .projects h4 {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    opacity: 0.5;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  .tag-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .course-tag {
    font-size: 0.8rem;
    background: #fff;
    padding: 0.4rem 0.8rem;
    border: 1px solid rgba(0,0,0,0.06);
    border-radius: 4px;
    color: #444;
  }

  /* --- SELECTED PROJECTS CARDS --- */
  .project-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .project-card {
    background: #fff;
    padding: 1.5rem;
    border-radius: 6px;
    border: 1px solid rgba(0,0,0,0.04);
    box-shadow: 0 2px 12px rgba(0,0,0,0.01);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .project-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.04);
  }

  .project-title-link {
    font-weight: 600;
    color: #111;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 1rem;
  }

  .project-title-link .arrow {
    font-size: 0.8rem;
    opacity: 0.5;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .project-card:hover .project-title-link .arrow {
    transform: translate(2px, -2px);
    opacity: 1;
  }

  .project-card p {
    margin: 0.5rem 0 0;
    line-height: 1.6;
    font-size: 0.9rem;
    color: #555;
  }

  /* Responsive view adjustments */
  @media (max-width: 768px) {
    .entry {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      padding: 2rem 0;
    }

    .nav-header {
      margin-bottom: 3rem;
    }

    .section-nav {
      gap: 1.25rem;
      overflow-x: auto;
      white-space: nowrap;
      padding: 1.5rem 0 1rem 0;
    }

    .quote {
      margin-bottom: 4rem;
    }
  }
</style>