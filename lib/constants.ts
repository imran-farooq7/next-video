import { StoryOption, StyleOption } from "./types";

export const storyOptions: StoryOption[] = [
    { type: "preset", label: "Adventure Story" },
    { type: "preset", label: "Funny Story" },
    { type: "preset", label: "Scary Story" },
    { type: "preset", label: "Inspirational Story" },
    { type: "preset", label: "Romantic Story" },
    { type: "preset", label: "Sci-Fi Story" },
    { type: "preset", label: "Thriller Story" },
    { type: "custom", label: "Custom Prompt" },
   ];

   export const styleOptions: StyleOption[] = [
    { name: "Artistic", image: "/images/artistic.jpg" },
    { name: "Realistic", image: "/images/realistic.jpg" },
    { name: "Fantasy", image: "/images/fantasy.jpg" },
    { name: "Dark", image: "/images/dark.jpg" },
    { name: "Water color", image: "/images/watercolor.jpg" },
    { name: "GTA", image: "/images/gta.jpg" },
    { name: "comic", image: "/images/comic.jpg" },
    { name: "Paint", image: "/images/paint.jpg" },
   ];
   
   