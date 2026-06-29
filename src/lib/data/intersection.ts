import mapGeoJsonRaw from "../assets/images/intersection_images/map.geojson?raw";
import type { FeatureCollection } from "geojson";

export const mapGeoJson = JSON.parse(mapGeoJsonRaw) as FeatureCollection;

const imageModules = import.meta.glob(
  "$lib/assets/images/intersection_images/*.{png,jpg,jpeg,svg,webp,JPG}",
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

export const intersectionCapstone = [
  {
    title: "illuminated averages 3",
    year: "2026",
    location: "Minneapolis, MN",
    description:
      "Illuminated average of ICE protest posters from South Minneapolis",
    image: images.avg_3, 
    size: "small",
  },
  {
    title: "illuminated averages 4",
    year: "2026",
    location: "Minneapolis, MN",
    image: images.avg_4,
    description:
      "Illuminated average of Alex Pretti's Memorial from 18th Ave and Nicollet Ave",
    
    size: "small",
  },
  {
    title: "illuminated averages 5",
    year: "2026",
    location: "Minneapolis, MN",
    image: images.avg_5, 
    size: "small",
  },
];

export const performanceImages = [
  {
    title: "beginning the piece",
    year: "2026",
    location: "Minneapolis, MN",
    description: "dancer low to the ground",
    image: images.perf_1, 
    size: "small",
  },
  {
    title: "developing tension with the audience",
    year: "2026",
    location: "Minneapolis, MN",
    description: "dancer level high, with leg out",
    image: images.perf_2, 
    size: "small",
  },
  {
    title: "implementing the sound system",
    year: "2026",
    location: "Minneapolis, MN",
    description: "aarush instrumenting the stereo sound",
    image: images.perf_3, 
    size: "small",
  },
  {
    title: "performance",
    year: "2026",
    location: "Minneapolis, MN",
    description: "images captured from the performance",
    image: images.perf_4, 
    size: "small",
  },
  {
    title: "scenes",
    year: "2026",
    location: "Minneapolis, MN",
    description: "different gestures",
    image: images.perf_5, 
    size: "small",
  }
];

export const processImages = [
  {
    title: "in process",
    year: "2026",
    location: "Minneapolis, MN",
    description: "",
    image: images.process_3,
    size: "small",
  },
  {
    title: "developing gestures",
    year: "2026",
    location: "Minneapolis, MN",
    description: "",
    image: images.process_4,
    size: "small",
  },
  {
    title: "finding meaning through gesture",
    year: "2026",
    location: "Minneapolis, MN",
    description: "",
    image: images.process_5,
    size: "small",
  },
  {
    title: "Room Setup",
    year: "2026",
    location: "Minneapolis, MN",
    description: "lighting configuration at ArTeS studio, UMN",
    image: images.room_setup,
    size: "small",
  },
];

const AUDIO_BASE =
  "https://raw.githubusercontent.com/aarushbothra/geographic-memories-AV/main/geographic_memories/media";

export const programNotes = {
  images: [
    {
      image: images.program_notes_1,
      alt: "Alex Pretti's Memorial",
      caption: "Program distributed at VirtuART, May 13, 2026.",
    },
    {
      image: images.program_notes_2,
      alt: "",
      caption: "Program distributed at VirtuART, May 13, 2026.",
    },
    {
      image: images.program_notes_3,
      alt: "Program notes for Embodied Geography",
      caption: "Program distributed at VirtuART, May 13, 2026.",
    },
    null,
  ],
};

export type AudioTrack = {
  label: string;
  file: string;
  description: string;
};

export type AudioLocation = {
  name: string;
  slug: string;
  context: string;
  tracks: AudioTrack[];
};

export const audioCompositionIntro =
  "The creators collected sound, visual, and numerical data from these locations. Rather than directly conveying the data they collected and letting the audience decide how to feel about it, the sound and the movement present in the piece are imbued with the emotions of the creators. Adding a deliberate “bias” is not necessarily an accepted idea in the world of data visualization, and visualizations often disregard emotional data in favor of objectivity.";

  export const backgroundPoem = [
    {
      name: "january 24, 2026",
      poem: `you wake up to the news. alex pretti murdered.

you watch the video even though you know it will disturb you because your observance is the only அர்ச்சனை you can offer

you pace the house, thinking through the steps in your head. what has to happen first? you don’t take a shower. a death has occurred.

you walked every day on the 18 line where his blood hit the city pavement

you meet up with friends and listen halfway like the radio tuning in and out. he was 37 and supposed to work on Monday. we have to work on Monday. did he leave his laundry strewn over the couch, not knowing he would never return to fold it?

you see the armoured tanks standing like அரக்கர்கள் flashing their glowing eyes

you walk slowly down lake seeing the candles stuck in the snow. someone has left extra.

you pick one up, light it, your personal ஆர்த்தி, finally the tears come.

you suddenly don’t feel real anymore. this is supposed to be a ஹோமம், where is the camphor? instead of bells ringing in auspicious times you hear screaming and whistles

you wake up to the news`,
    },
    {
      name: "Jan 27, 2026",
      poem: `
remembering a time when my phone ringing didn't fill me with dread

apparently ICE is on campus. be careful

         i heard ICE was at MWIC are they okay

Girl what the fuck is happening in this country 

ICE passed by my house about an hour ago

        I saw ICE abduct someone today //

Holy shit that’s so scary //

        They just put him in the car

I’m here if you want to talk 

It’s okay to take a day off 

         Let it out bb //

Its not ok //

         It’s not //`,
    },
    {
      name: "march 1, 2026",
      poem: `Hastily made paper signs stuck to doors
             telling people to knock and they’d let them
              in. Signal chats flooded with information,
           food drives, donations and Venmo requests for
              MIRAC and MONCARCA. And in all of this, an
             overwhelming sadness for the innocence that
           we had lost. An unshakeable belief in justice
                rotted to the core, beaten, bruised, and
                                                   shot.`,
    },
  ];


export const audioLocations: AudioLocation[] = [
  {
    name: "Time Bomb Vintage",
    slug: "time-bomb-vintage",
    context:
      "A South Minneapolis storefront.",
    tracks: [
      {
        label: "Field recording",
        file: `${AUDIO_BASE}/Time%20Bomb%20Vintage_field%20recording.wav`,
        description:
          "Raw ambient capture.",
      },
      {
        label: "Emotional Dimension 1-isolation",
        file: `${AUDIO_BASE}/Time%20Bomb%20Vintage_Isolated.wav`,
        description:
          "Individual textures separated from the field recording for selective playback.",
      },
      {
        label: "Anxiety",
        file: `${AUDIO_BASE}/Time%20Bomb%20Vintage_Anxiety.wav`,
        description:
          "Sound composed by Aarush Bothra based on our field recordings.",
      },
      {
        label: "Averaged",
        file: `${AUDIO_BASE}/Time%20Bomb%20Vintage_Averaged.wav`,
        description:
          "Using Marc Evanstein's Reverberated Averages to create an audio thumbprint of the site.",
      },
    ],
  },
  {
    name: "Hennepin County Government Center",
    slug: "hennepin-county-government-center",
    context:
      "A downtown civic site mapped onto the stage as the second geographic anchor, contrasting neighborhood and institutional space.",
    tracks: [
      {
        label: "Field recording",
        file: `${AUDIO_BASE}/hennepin%20county%20governement%20center_field%20recording.wav`,
        description:
          "Raw ambient capture from the location, used as the sonic ground for all further processing.",
      },
      {
        label: "Isolated",
        file: `${AUDIO_BASE}/hennepin%20county%20governement%20center_isolated.wav`,
        description:
          "Individual events and textures separated from the field recording for selective playback and spatialization.",
      },
      {
        label: "Anxiety",
        file: `${AUDIO_BASE}/hennepin%20county%20governement%20center_anxiety.wav`,
        description:
          "A processed layer derived from the recording, mapped to tension and emotional response at the site.",
      },
      {
        label: "Averaged",
        file: `${AUDIO_BASE}/hennepin%20county%20governement%20center_averaged.wav`,
        description:
          "The combined performance stem—field material, isolated elements, and anxiety merged into a single layer.",
      },
    ],
  },
];

export type StorySection =
  | "background"
| "geography"
  | "program-notes"
  | "video";

export type StoryStep = {
  id: string;
  section: StorySection;
  sectionLabel?: string;
  title: string;
  content: string;
  visual: "image" | "map" | "video" | "program-notes";
  image?: string;
  imageAlt?: string;
  caption?: string;
  poem?: string;
  poemName?: string;
  programNoteImageIndex?: number;
  reverseLayout?: boolean;
  mapFeatureId?: number | null;
  audioLocationSlug?: string;
  audioLocationSlugs?: string[];
  mapPoints?: {
    featureId: number;
    title: string;
    content: string;
    image: string;
    imageAlt: string;
    caption?: string;
  }[];
};

export const storySteps: StoryStep[] = [
  {
    id: "background-1",
    section: "background",
    sectionLabel: "Background",
    title: "Minneapolis has been under ICE occupation since November 2025.",
    content:
      "Residents have been affected in ways that cannot be fully explained through traditional methods of data visualization. We wish to explore what performing art brings to data interaction. Using motion tracking and sound averaging, Embodied Geography tells a personal and data-supported story about the ICE occupation in Minnesota. This performance originated out of a desire to share the emotional data from this experience ethically and with respect to the affected. As an alternative to passive observation, we embody our experiences into a performance that audiences can connect with viscerally. ",
    visual: "image",
    image: intersectionCapstone[0].image,
    imageAlt: intersectionCapstone[0].title,
    caption: `Figure 1: ${intersectionCapstone[0].description}`,
  },
  {
    id: "background-2",
    section: "background",
    title: "",
    content: `This performance is a student-led effort approached from our background studying computer science and our performing arts experience. 
    As both witnesses to and subjects of the brutality and emotional devastation that ICE caused in Minneapolis, we sought to amplify our experiences with the design, artistic creativity, and interactivity of our visualization.
    Using music and dance, mediums deeply intertwined with emotions, to represent and share our emotional reaction to the events of the ICE occupation challenges the assumption that data visualization needs to be inherently objective in order to be impactful.`,
    visual: "image",
    image: intersectionCapstone[1].image,
    imageAlt: intersectionCapstone[1].title,
    caption: `Figure 2: ${intersectionCapstone[1].description}`,
  },
  ...backgroundPoem.map((item, i) => ({
    id: `program-note-${i}`,
    section: "program-notes" as const,
    sectionLabel: i === 0 ? "Program Notes" : undefined,
    title: item.name,
    content: "",
    visual: "program-notes" as const,
    poem: item.poem,
    poemName: item.name,
    programNoteImageIndex: i,
  })),
  {
    id: "geography-remaining-points",
    section: "geography",
    title: "Composition and Data Collection",
    content: audioCompositionIntro,
    visual: "map",
    mapFeatureId: null,
    mapPoints: [
      {
        featureId: 3,
        title: "Sudarsna's Home",
        content:
          "Home, but during the ICE occupation. On January 17th, 2026, Sudarsna saw someone being abducted from her street corner.",
        image: processImages[0].image,
        imageAlt: processImages[0].title,
        caption: processImages[0].description || processImages[0].title,
      },
      {
        featureId: 4,
        title: "Alex Pretti Memorial",
        content: "At 18th Ave and Nicollet Ave.",
        image: intersectionCapstone[1].image,
        imageAlt: intersectionCapstone[1].title,
        caption: intersectionCapstone[1].description,
      },
      {
        featureId: 5,
        title: "River",
        content:
          "The Mississippi River is a central feature of both Minneapolis and the University campus.",
        image: processImages[1].image,
        imageAlt: processImages[1].title,
        caption: processImages[1].description || processImages[1].title,
      },
      {
        featureId: 6,
        title: "Aarush's Home and West Bank",
        content:
          "The West Bank neighborhood, home to a diverse immigrant community. ",
        image: processImages[2].image,
        imageAlt: processImages[2].title,
        caption: processImages[2].description || processImages[2].title,
      },
      {
        featureId: 7,
        title: "Stone Arch Bridge",
        content: "",
        image: performanceImages[0].image,
        imageAlt: performanceImages[0].title,
        caption: performanceImages[0].description,
      },
    ],
  },
  {
    id: "geography-sound-sites",
    section: "geography",
    title: "Sound sites",
    content:
      "The first two locations hold the source recordings and composed sound materials. Play the recordings to bring process and performance images into the left side.",
    visual: "map",
    mapFeatureId: null,
    audioLocationSlugs: [
      "time-bomb-vintage",
      "hennepin-county-government-center",
    ],
  },
  {
    id: "video",
    section: "video",
    sectionLabel: "Performance Video",
    title: "VirtuART showing",
    content: "In-process showing of the system and the performance.",
    visual: "video",
  },
];

export const imageGallerySteps = [...processImages, ...performanceImages].map(
  (img, i) => ({
    id: `playback-image-${i}`,
    section: "geography" as const,
    title: img.title,
    content: img.description,
    visual: "image" as const,
    image: img.image,
    imageAlt: img.title,
    caption: img.description || undefined,
  })
);
