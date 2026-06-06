<script lang="ts">
    import { goto } from '$app/navigation';
    import { homepage } from '$lib/data/homepage';
</script>

<svelte:head>
    <title>Sudarsna Mukund</title>
</svelte:head>

<!-- Full-screen background wrapper -->
<div class="bg-container">
    <img
        src={homepage[0].image}
        alt={homepage[0].title}
        class="bg-image"
    />
</div>

<div class="page">
    <main>
        <h1>
            I am a 
            <button class="interactive-word" on:click={() => goto('/dance')}>
                performing artist
            </button>
            ,
            <button class="interactive-word" on:click={() => goto('/engineering')}>
                a computer scientist
            </button>
            ,
            and a
            <button class="interactive-word" on:click={() => goto('/intersection')}>
                researcher.
            </button>
        </h1>

        <p class="description">
            My work explores performance, embodiment of data, computer vision,
            and interactive technologies through both a rigorous artistic practice and strong fundamentals in computer science.
        </p>
    </main>

    <footer>
        <p class="agency-credit">
            Represented by Meredith Agency and Wehmann Agency
        </p>
    </footer>
</div>

<style>
    :global(body) {
        margin: 0;
        background: #f6f3ee;
        color: #111;
        font-family: 'IBM Plex Mono', monospace;
        overflow-x: hidden;
    }

    /* Background image setup */
    .bg-container {
        position: fixed;
        top: 2;
        left: 3;
        width: 100vw;
        height: 100vh;
        z-index: 1;
        overflow: hidden;
        pointer-events: none; 
    }

    .bg-image {
        width: 100%;
        object-fit: cover;
        opacity: 0.25; /* Medium-low opacity ensures text remains fully readable */
        filter: grayscale(15%) contrast(95%); /* Gives it an editorial, integrated feel */
    }

    /* Content Layout wrapper */
    .page {
        position: relative;
        z-index: 2; /* Sits cleanly above the background photo */
        padding: 1rem 2rem;
        max-width: 800px;
        margin: 0 auto;
        min-height: 0vh;
        display: flex;
        flex-direction: column;
        justify-content: center; 
        box-sizing: border-box;
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 4rem;
    }

    h1 {
        font-family: 'Texturina', serif;
        font-size: clamp(2rem, 5vw, 4rem);
        font-weight: 300;
        line-height: 1.25;
        max-width: 1050px;
        margin-bottom: 3rem;
    }

    /* Interactive Hover Typography */
    .interactive-word {
        display: inline-block; /* Crucial for transform scales to track accurately */
        background: none;
        border: none;
        font: inherit;
        color: #111;
        cursor: pointer;
        padding: 0 0.2rem;
        opacity: 0.9;
        text-decoration: underline dotted 2px rgba(17, 17, 17, 0.3);
        text-underline-offset: 6px;
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), 
                    opacity 0.2s ease, 
                    text-decoration-color 0.2s ease;
    }

    .interactive-word:hover {
        opacity: 1;
        text-decoration: underline solid 2px rgba(17, 17, 17, 1);
        transform: scale(1.08); /* Magnifies the word cleanly on hover */
    }

    .description {
        max-width: 550px;
        line-height: 1.8;
        font-size: 1.05rem;
        color: #222;
    }

    /* Minimalist Footer */
    footer {
        margin-top: auto;
    }

    .agency-credit {
        font-size: 0.85rem;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        color: #555;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        padding-top: 1.5rem;
        display: inline-block;
    }
</style>