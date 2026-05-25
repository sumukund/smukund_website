<script lang="ts">
const artisticWorks = [

	{
		title: 'Synergize Optimize Strategize',
		category: 'Performance / Theater',
		organization: 'Corpus Dance Works',
		year: '2025',
		location: 'Minneapolis, MN',
		description:
			"A dance and theater work exploring the tension between chaos and control, innocence and responsibility through movement, social ritual, and collapse.",
		image: '/images/sos.jpg',
		link: 'https://www.startribune.com/things-to-do/events-calendar/show/details/corpus-dance-works-presents-s-o-s/15769465/2025-06-21t19',
		featured: true
	},

	{
		title: 'for i am in range',
		category: 'Performance / Choreography',
		organization: 'Mixed Blood Theater',
		year: '2025',
		location: 'Minneapolis, MN',
		description:
			"Short dance work presented in the Rejects Cohort exposition featuring works previously rejected or unfinished.",
		image: images[0],
		link: 'https://www.youtube.com/watch?v=13JmvOMBKlw',
		featured: true,
        size: "wide"
	},

	{
		title: 'Rhinoceros',
		category: 'Theater / Movement Direction',
		organization: 'Pangea World Theater',
		year: '2025',
		location: 'Minneapolis, MN',
		description:
			"Movement Captain, Influencer, and Ensemble Member in Rhinoceros directed by Dipankar Mukherjee.",
		image: '/images/rhinoceros.jpg',
		link: 'https://www.pangeaworldtheater.org/events/rhinoceros-2025-04-12-19-30',
		featured: true
	},
    	{
		title: 'The Mind Has a Hundred Thousand Gates',
		category: 'Devised Theater',
		organization: 'Pangea World Theater',
		year: '2026',
		location: 'Minneapolis, MN',
		description:
			"An exploration of Kabir, a 15th century poet from India for the stage through poetry, spoken word, music, and movement.",
		image: '/images/rhinoceros.jpg',
		link: 'https://www.pangeaworldtheater.org/events/the-mind-has-a-hundred-thousand-gates-2026-04-10-19-30',
		featured: true
	},

	{
		title: 'Eagle Song',
		category: 'Collaborative Performance',
		organization: 'Weird Stuff Only',
		year: '2025',
		location: 'Minneapolis, MN',
		description:
			"Collaboration of dance, hand-drawn crankie animation, and live music illustrating the story of a fallen eagle.",
		image: '/images/eagle-song.jpg',
		featured: true
	},

	{
		title: 'Doma Dance Theater Chyza Microresidency',
		category: 'Residency / Research',
		organization: 'Doma Dance Theater',
		year: '2025',
		location: 'Minneapolis, MN',
		description:
			"Work-in-progress residency exploring movement research and choreographic experimentation.",
		image: '/images/doma.jpg',
	},

	{
		title: 'Make:Magnify',
		category: 'Digital Art / Dance',
		organization: 'UMN Barbara Barker Center for Dance',
		year: '2024',
		location: 'Minneapolis, MN',
		description:
			"Collaborative digital art and dance project integrating performance and emerging technologies.",
		image: '/images/magnify.jpg',
		link: 'https://www.youtube.com/watch?v=rDtB1Xjp3kI&feature=youtu.be'
	},

	{
		title: 'Hecuba',
		category: 'Theater Performance',
		organization: 'Pangea World Theater',
		year: '2024–present',
		location: 'Minneapolis, MN',
		description:
			"Servant and Boy 2 speaking role in Hecuba directed by Dipankar Mukherjee. Also served as Production Intern.",
		image: '/images/hecuba.jpg',
		link: 'https://minnesotaplaylist.com/show/2024/hecuba-marina-carr',
		featured: true
	},

	{
		title: 'Ragamala Dance Company',
		category: 'Dance Company / Teaching',
		organization: 'Ragamala Dance Company',
		year: '2021–2023',
		location: 'Minneapolis, MN',
		description:
			"Performed in outreach events and festivals including Soorya Dance Festival in Kerala, India. Taught Bharatanatyam to K–7 students.",
		image: '/images/ragamala.jpg',
		link: 'https://youtu.be/Swowxx4W4_w',
		featured: true
	},

	{
		title: 'And the Breath In Between',
		category: 'Contemporary Dance',
		organization: 'Nikaio Thomashow',
		year: '2021',
		location: 'Vermont',
		description:
			"Stage manager and interpretive performer in a collaborative contemporary dance work exploring breath, embodiment, and improvisation.",
		image: '/images/breath.jpg',
		link: 'https://www.nikaio.com/breath'
	},

	{
		title: 'The Urban Nutcracker',
		category: 'Ballet Performance',
		organization: 'Tony Williams / City Ballet of Boston',
		year: '2019',
		location: 'Boston, MA',
		description:
			"Performed roles including Russian, Chinese, Vaudeville Flower, and Snow.",
		image: '/images/nutcracker.jpg'
	},

	{
		title: 'Brown Girl Magazine',
		category: 'Interview / Writing',
		organization: 'Brown Girl Magazine',
		year: '2019',
		description:
			"Interview discussing diversity and inclusion within ballet and performance spaces.",
		image: '/images/bgm.jpg',
		link: 'https://browngirlmagazine.com/ballerina-sudarsna-mukund-importance-of-diversity-inclusion-ballet-world/'
	},

	{
		title: 'The Indian Edit',
		category: 'Podcast',
		organization: 'The Indian Edit',
		year: '2019',
		description:
			"Podcast feature discussing ballet, identity, and artistic life.",
		image: '/images/indian-edit.jpg',
		link: 'https://www.theindianedit.com/home/2019/12/6/kick-off-the-holiday-season-with-a-back-stage-pass-into-ballerina-sudarsna-mukunds-life'
	},

	{
		title: 'Voice Talent — Web 5000.0',
		category: 'Voice Performance',
		organization: 'Hellavision Television',
		year: '2025',
		description:
			"Voice performance project speculating on future forms of the internet and communication.",
		image: '/images/web5000.jpg',
		link: 'https://www.hellavisiontelevision.com/shorts/web-5000-0-intro'
	},

	{
		title: 'Hyphen',
		category: 'Film / Dance',
		organization: 'Independent Film',
		year: '2018',
		description:
			"Contemporary dancer in the film Hyphen.",
		image: '/images/hyphen.jpg',
		link: 'https://www.imdb.com/title/tt7413762/'
	},

	{
		title: 'Song of Love',
		category: 'Performance',
		organization: 'Rudolf Lingens',
		year: '2018',
		description:
			"Performance collaboration.",
		image: '/images/song-of-love.jpg',
		link: 'https://www.youtube.com/watch?v=z15sc0lkOsc'
	},

	{
		title: 'SundanceX (WIP)',
		category: 'Workshop / Residency',
		organization: 'David Sun',
		year: '2017',
		location: 'Brattleboro, VT',
		description:
			"Work-in-progress residency and collaborative movement exploration.",
		image: '/images/sundancex.jpg'
	},

	{
		title: 'State Opera Plovdiv',
		category: 'Ballet',
		organization: 'State Opera Plovdiv, Bulgaria',
		year: '2017',
		description:
			"Professional ballet dancer for the State Opera Plovdiv for the European Capital of Culture 2019. ",
		image: '/images/plovdiv.jpg'
	},

];

</script>

<section class="gallery">
	{#each artisticWorks as work}

		<a
			class={`card ${work.size}`}
			href={work.link}
			target="_blank"
		>

			<img
				src={work.image}
				alt={work.title}
			/>

			<div class="meta">

				<h2>{work.title}</h2>

				<p>{work.category}</p>

				<span>
					{work.organization},
					{work.year}
				</span>

			</div>

		</a>

	{/each}
</section>

<style>
.gallery {

	display: grid;

	grid-template-columns:
		repeat(6, 0.6fr);

	gap: 2rem;

	padding-bottom: 8rem;
}

.card {

	text-decoration: none;
	color: inherit;

	display: flex;
	flex-direction: column;

	gap: 1rem;
}

.small {
	grid-column: span 4;
}

.medium {
	grid-column: span 6;
}

.large {
	grid-column: span 8;
}

.wide {
	grid-column: span 12;
}
.card img {

	width: 100%;
	height: 100%;

	object-fit: cover;

	background: #ddd;

	transition:
		transform 0.5s ease,
		opacity 0.5s ease;
}

.card:hover img {

	transform: scale(1.01);

	opacity: 0.96;
}

.meta {

	display: flex;
	flex-direction: column;

	gap: 0.3rem;
}

.meta h2 {

	font-family: 'Texturina', serif;

	font-size: 1.4rem;
	font-weight: 400;

	margin: 0;
}

.meta p {

	font-size: 0.8rem;

	text-transform: uppercase;

	letter-spacing: 0.08rem;

	opacity: 0.7;

	margin: 0;
}

.meta span {

	font-size: 0.8rem;

	opacity: 0.5;
}
</style>
