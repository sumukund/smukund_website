<script lang="ts">
	import { homepage } from '$lib/data/homepage';
	import { reveal } from '$lib/actions/reveal';
</script>

<svelte:head>
    <title>About | Sudarsna Mukund</title>
</svelte:head>

<div class="page">
    <main class="about-grid">
        <!-- Left Column: Biography Narrative -->
        <section class="bio-column" use:reveal>
            <h1 class="title">About</h1>
            <p class="bio-text">
                Sudarsna Mukund (she/they) is a Tamil multidisciplinary performing artist and computer vision engineer. 
                She has performed internationally in <em>Maria de Buenos Aires</em> and <em>Orpheus and Eurydice</em> 
                with State Opera Plovdiv, as well as <em>Giselle</em>, <em>Swan Lake</em>, <em>Cinderella</em>, and <em>Carmen</em>. 
                She has also performed in Ragamala Dance’s <em>Fires of Varanasi</em> in Kerala, India, City Ballet Boston’s 
                <em>Urban Nutcracker</em>, and theatrical productions including <em>Hecuba</em> and <em>Rhinoceros</em> with 
                Pangea World Theater.
            </p>
            <p class="bio-text">
                Her choreographic work explores Tamil futurism and a desire to root oneself in place through data 
                physicalization. Her practice combines Bharathanatyam, contemporary dance, and aerial arts with 
                data visualization drawn from her background in engineering to investigate the myriad experiences 
                of being through performing art.
            </p>
        </section>

        <!-- Right Column: Media & Engagement -->
        <section class="media-column">
            <div class="image-wrapper">
                <img src={homepage[1].image} alt={homepage[1].title} />
            </div>

            <div class="contact-card">
                <h2>Get in touch</h2>
                <p>For all inquiries, collaborations, or project ideas, please reach out via email or social modules:</p>
                
                <div class="actions">
                    <a href="mailto:mukun017@gmail.com" class="btn primary">
                        Contact Me
                    </a>
                    <a href="https://instagram.com/sudarsnak/" target="_blank" rel="noopener noreferrer" class="btn secondary">
                        Instagram ↗
                    </a>
                </div>
            </div>
        </section>
    </main>
</div>

<style>
    :global(body) {
        margin: 0;
        background: #f6f3ee;
        color: #111;
        font-family: 'IBM Plex Mono', monospace;
    }

    .page {
        padding: 4rem 2rem;
        max-width: 1200px;
        margin: 0 auto;
        min-height: 100vh;
        box-sizing: border-box;
    }

    /* Split Editorial Grid Layout */
    .about-grid {
        display: grid;
        grid-template-columns: 1.2fr 1fr;
        gap: 5rem;
        align-items: start;
    }

    @media (max-width: 900px) {
        .about-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
        }
    }

    /* Typography Definitions */
    .title {
        font-family: 'Texturina', serif;
        font-size: clamp(2.5rem, 5vw, 4rem);
        font-weight: 300;
        margin: 0 0 2.5rem 0;
    }

    .bio-text {
        font-size: 1.05rem;
        line-height: 1.8;
        margin-bottom: 1.8rem;
        text-align: justify;
        color: #222;
    }

    em {
        font-family: 'Texturina', serif;
        font-style: italic;
    }

    /* Media Layout elements */
    .image-wrapper {
        width: 100%;
        margin-bottom: 2rem;
    }

    .image-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 2px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.04);
    }


    /* Contact Card Context Styling */
    .contact-card {
        border-top: 1px solid rgba(0, 0, 0, 0.15);
        padding-top: 2rem;
    }

    .contact-card h2 {
        font-family: 'Texturina', serif;
        font-size: 1.6rem;
        font-weight: 400;
        margin: 0 0 1rem 0;
    }

    .contact-card p {
        font-size: 0.9rem;
        line-height: 1.6;
        color: #444;
        margin-bottom: 1.5rem;
    }

    /* Button and Link Architectures */
    .actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .btn {
        display: inline-block;
        text-decoration: none;
        font-family: 'IBM Plex Mono', monospace;
        font-size: 0.9rem;
        font-weight: 500;
        padding: 0.8rem 1.5rem;
        border-radius: 4px;
        transition: all 0.2s ease-in-out;
        text-align: center;
    }

    .btn.primary {
        background: #111;
        color: #f6f3ee;
        border: 1px solid #111;
    }

    .btn.primary:hover {
        background: rgba(17, 17, 17, 0.85);
        transform: translateY(-1px);
    }

    .btn.secondary {
        background: transparent;
        color: #111;
        border: 1px solid rgba(17, 17, 17, 0.3);
    }

    .btn.secondary:hover {
        border-color: #111;
        background: rgba(0, 0, 0, 0.03);
        transform: translateY(-1px);
    }
</style>