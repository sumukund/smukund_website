const imageModules = import.meta.glob(
  "$lib/assets/images/*.{png,jpg,jpeg,svg,webp}",
  { eager: true }
);

export const images = Object.entries(imageModules).reduce(
  (acc, [path, module]) => {
    const fileName = path.split("/").pop()?.split(".")[0];
    if (fileName) {
      acc[fileName] = (module as { default: string }).default;
    }
    return acc;
  },
  {} as Record<string, string>
);

export const artisticWorks = [
  {
    title: "for i am in range",
    category: "Performance / Choreography",
    organization: "Mixed Blood Theater",
    year: "2025",
    location: "Minneapolis, MN",
    description:
      "Short dance work presented in the Rejects Cohort exposition featuring works previously rejected or unfinished.",
    image: images.range, // Changed from hardcoded string
    link: "https://www.youtube.com/watch?v=13JmvOMBKlw",
    featured: true,
    size: "small",
  },
  {
    title: "aathiram, or rage",
    category: "Performance / Choreography",
    organization: "Mixed Blood Theater",
    year: "2026",
    location: "Minneapolis, MN",
    description: "An exploration of feminine rage",
    image: images.aathiram, // Changed from hardcoded string
    link: "https://www.youtube.com/watch?v=YTdPrk7j_fw",
    featured: true,
    size: "small",
  },
  {
    title: "Rhinoceros",
    category: "Theater / Movement Direction",
    organization: "Pangea World Theater",
    year: "2025",
    location: "Minneapolis, MN",
    description:
      "Movement Captain, Influencer, and Ensemble Member in Rhinoceros directed by Dipankar Mukherjee.",
    image: images.rhinoceros, // Changed from hardcoded string
    link: "https://www.pangeaworldtheater.org/events/rhinoceros-2025-04-12-19-30",
    featured: true,
    size: "small",
  },
  {
    title: "The Mind Has a Hundred Thousand Gates",
    category: "Theater",
    organization: "Pangea World Theater",
    year: "2026",
    location: "Minneapolis, MN",
    description:
      "An exploration of Kabir, a 15th century poet from India for the stage through poetry, spoken word, music, and movement.",
    image: images.mind, // Changed from hardcoded string
    link: "https://www.pangeaworldtheater.org/events/the-mind-has-a-hundred-thousand-gates-2026-04-10-19-30",
    featured: true,
    size: "small",
  },
  {
    title: "Doma Dance Theater Chyza Microresidency",
    category: "Residency / Research",
    organization: "Doma Dance Theater",
    year: "2025",
    location: "Minneapolis, MN",
    description:
      "Work-in-progress residency exploring movement research and choreographic experimentation.",
    image: images.doma, // Changed from hardcoded string
    size: "small",
  },
  {
    title: "Hecuba",
    category: "Theater Performance",
    organization: "Pangea World Theater",
    year: "2024",
    location: "Minneapolis, MN",
    description: "Servant and Boy, Production Intern.",
    image: images.hecuba, // Changed from hardcoded string
    link: "https://minnesotaplaylist.com/show/2024/hecuba-marina-carr",
    featured: true,
    size: "small",
  },
  {
    title: "Ragamala Dance Company",
    category: "Dance Company / Teaching",
    organization: "Ragamala Dance Company",
    year: "2021–2023",
    location: "Minneapolis, MN",
    description:
      "Performed in outreach events and festivals including Soorya Dance Festival in Kerala, India. Taught Bharatanatyam to K–7 students.",
    image: images.ragamala, // Changed from hardcoded string
    link: "https://youtu.be/Swowxx4W4_w",
    featured: true,
    size: "small",
  },
  {
    title: "And the Breath In Between",
    category: "Contemporary Dance",
    organization: "Nikaio Thomashow",
    year: "2021",
    location: "Vermont",
    description:
      "Stage manager and interpretive performer in a collaborative contemporary dance work exploring breath, embodiment, and improvisation.",
    image: images.breath, // Changed from hardcoded string
    link: "https://www.nikaio.com/breath",
    size: "small",
  },
  {
    title: "Brown Girl Magazine",
    category: "Interview / Writing",
    organization: "Brown Girl Magazine",
    year: "2019",
    description:
      "Interview discussing diversity and inclusion within ballet and performance spaces.",
    image: images.bgm, // Changed from hardcoded string
    link: "https://browngirlmagazine.com/ballerina-sudarsna-mukund-importance-of-diversity-inclusion-ballet-world/",
    size: "small",
  },
  {
    title: "The Indian Edit",
    category: "Podcast",
    organization: "The Indian Edit",
    year: "2019",
    description:
      "Podcast feature discussing ballet, identity, and artistic life.",
    image: images["indian-edit"], // Changed from hardcoded string (hyphens require bracket notation)
    link: "https://www.theindianedit.com/home/2019/12/6/kick-off-the-holiday-season-with-a-back-stage-pass-into-ballerina-sudarsna-mukunds-life",
    size: "small",
  },
  {
    title: "State Opera Plovdiv",
    category: "Ballet",
    organization: "State Opera Plovdiv, Bulgaria",
    year: "2018-2019",
    description:
      "Professional ballet dancer for the State Opera Plovdiv for the European Capital of Culture 2019. ",
    image: images.plovdiv, // Changed from hardcoded string
    size: "small",
  },
];
