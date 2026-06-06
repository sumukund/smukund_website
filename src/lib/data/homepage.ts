const imageModules = import.meta.glob(
  "$lib/assets/images/homepage_images/*.{png,jpg,jpeg,svg,webp}",
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

export const homepage = [
  {
    title: "Meredith Agency Photoshoot",
    year: "2026",
    location: "Minneapolis, MN",
    image: images.casual, // Changed from hardcoded string
    size: "small",
  },
  {
    title: "headshot",
    year: "2026",
    location: "Minneapolis, MN",
    image: images.Sudarsna_Mukund,
    description:
      "headshot",
    // Changed from hardcoded string
    size: "small",
  }
];
