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
    title: "performance 1",
    year: "2026",
    location: "Minneapolis, MN",
    description: "dancer low to the ground",
    image: images.perf_1, 
    size: "small",
  },
  {
    title: "performance 2",
    year: "2026",
    location: "Minneapolis, MN",
    description: "dancer level high, with leg out",
    image: images.perf_2, 
    size: "small",
  },
  {
    title: "performance 3",
    year: "2026",
    location: "Minneapolis, MN",
    description: "aarush instrumenting the stereo sound",
    image: images.perf_3, 
    size: "small",
  },
  {
    title: "performance 4",
    year: "2026",
    location: "Minneapolis, MN",
    description: "performance 4",
    image: images.perf_4, 
    size: "small",
  },
  {
    title: "performance 5",
    year: "2026",
    location: "Minneapolis, MN",
    description: "performance 5",
    image: images.perf_5, 
    size: "small",
  }
];

export const processImages = [
  {
    title: "performance 1",
    year: "2026",
    location: "Minneapolis, MN",
    description: "performance 1",
    image: images.process_3, 
    size: "small",
  },
  {
    title: "performance 2",
    year: "2026",
    location: "Minneapolis, MN",
    description: "performance 2",
    image: images.process_4, 
    size: "small",
  },
  {
    title: "performance 3",
    year: "2026",
    location: "Minneapolis, MN",
    description: "performance 3",
    image: images.process_5, 
    size: "small",
  },
  {
    title: "Room Setup",
    year: "2026",
    location: "Minneapolis, MN",
    description: "performance 4",
    image: images.room_setup, 
    size: "small",
  }
];