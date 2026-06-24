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
  image: images.program_notes,
  creationBlurb:
    "Program notes for our work in progress showing with poems from January through March 2026. We wanted audiences to receive both the context and the raw emotions that shaped our movement and sound choices.",
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
  "";

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
  | "audio"
  | "images"
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
  mapFeatureId?: number | null;
  audioLocationSlug?: string;
};

export const storySteps: StoryStep[] = [
  {
    id: "background-1",
    section: "background",
    sectionLabel: "Background",
    title: "Illuminated averages of protest and memorial",
    content:
      "Minneapolis has been under ICE occupation since November 2025. Residents have been affected in ways that cannot be fully explained through traditional methods of data visualization. We wish to explore what performing art brings to data interaction. Using motion tracking and sound averaging, this movement piece tells a personal and data-supported story about the ICE occupation in Minnesota.",
    visual: "image",
    image: intersectionCapstone[0].image,
    imageAlt: intersectionCapstone[0].title,
    caption: `Figure 1: ${intersectionCapstone[0].description}`,
  },
  {
    id: "background-2",
    section: "background",
    title: "Lives lost in Minneapolis",
    content:
      "This activity culminated in the death of residents of Minneapolis: Killing of Renée Good in Minneapolis on January 7, 2026, Shooting of Julio Cesar Sosa-Celis in North Minneapolis on January 14, 2026, Killing of Alex Pretti in Minneapolis on January 24, 2026. ",
    visual: "image",
    image: intersectionCapstone[1].image,
    imageAlt: intersectionCapstone[1].title,
    caption: `Figure 2: ${intersectionCapstone[1].description}`,
  },
  {
    id: "audio-intro",
    section: "audio",
    sectionLabel: "Audio Composition",
    title: "Geography as sound",
    content: audioCompositionIntro,
    visual: "map",
    mapFeatureId: null,
  },
  {
    id: "audio-time-bomb",
    section: "audio",
    title: "Time Bomb Vintage",
    content:
      "A South Minneapolis storefront and source of community gathering, and resistance during the occupation.",
    visual: "map",
    mapFeatureId: 1,
    audioLocationSlug: "time-bomb-vintage",
  },
  {
    id: "audio-graduate",
    section: "audio",
    title: "The Graduate",
    content: "",
    visual: "map",
    mapFeatureId: 2,
  },
  {
    id: "audio-home",
    section: "audio",
    title: "Sudarsna's Home",
    content:
      "Home, but during the ICE occupation. On January 17th, 2026, Sudarsna saw someone being abducted from her street corner. ",
    visual: "map",
    mapFeatureId: 3,
  },
  {
    id: "audio-memorial",
    section: "audio",
    title: "Alex Pretti Memorial",
    content:
      "At 18th Ave and Nicollet Ave, a memorial for Alex Pretti became a gathering point. The illuminated average of this site captures how collective mourning leaves a visible trace on the urban landscape.",
    visual: "map",
    mapFeatureId: 4,
  },
  {
    id: "audio-river",
    section: "audio",
    title: "River",
    content:
      "The Mississippi River runs through Minneapolis as both boundary and connector. Its ambient sound—water, wind, distant traffic—offers a sonic counterpoint to the intensity of street-level field recordings.",
    visual: "map",
    mapFeatureId: 5,
  },
  {
    id: "audio-west-bank",
    section: "audio",
    title: "Aarush's Home and West Bank",
    content:
      "The West Bank neighborhood holds layered histories of immigration, art, and activism. Recordings here blend domestic space with the public life of a community that has long organized against displacement.",
    visual: "map",
    mapFeatureId: 6,
  },
  {
    id: "audio-government",
    section: "audio",
    title: "Government Plaza",
    content:
      "A downtown civic site mapped onto the stage as the second geographic anchor, contrasting neighborhood and institutional space. The architecture of government amplifies the anxiety signal embedded in these recordings.",
    visual: "map",
    mapFeatureId: 7,
    audioLocationSlug: "hennepin-county-government-center",
  },
  {
    id: "audio-bridge",
    section: "audio",
    title: "Stone Arch Bridge",
    content:
      "One of Minneapolis's most iconic structures, the Stone Arch Bridge spans the river between past industry and present city. Its open acoustic space allows field material to breathe before compression into the performance system.",
    visual: "map",
    mapFeatureId: 8,
  },
  ...processImages.map((img, i) => ({
    id: `process-${i}`,
    section: "images" as const,
    sectionLabel: i === 0 ? "Images" : undefined,
    title: img.title,
    content:
      img.description ||
      "January through June 2026- developing movements, system design, and sound onto the stage.",
    visual: "image" as const,
    image: img.image,
    imageAlt: img.title,
    caption: img.description || undefined,
  })),
  ...performanceImages.map((img, i) => ({
    id: `performance-${i}`,
    section: "images" as const,
    sectionLabel: i === 0 ? "VirtuART, May 13, 2026" : undefined,
    title: img.title,
    content:
      img.description ||
      "In-process showing at VirtuART at the Regis Center for Art West, UMN.",
    visual: "image" as const,
    image: img.image,
    imageAlt: img.title,
    caption: img.description || undefined,
  })),
  {
    id: "program-notes",
    section: "program-notes",
    sectionLabel: "Program Notes",
    title: "Context and raw emotion",
    content: programNotes.creationBlurb,
    visual: "program-notes",
    caption:
      "Program distributed at VirtuART, May 13, 2026 Regis Center for Art West, UMN",
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
