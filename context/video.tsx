"use client";
import { createVideo, generateImageAi } from "@/actions/geminiai";
import { createAudio } from "@/actions/murf";
import {
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  createContext,
  ChangeEvent,
} from "react";
const intialState = {
  script: "",
  images: [] as string[],
  audio: "",
  captions: [] as object[],
  loading: false,
  selectedStory: "Inspirational Story",
  selectedStyle: "Artistic",
};
interface VideoContextType {
  script: string;
  setScript: Dispatch<SetStateAction<string>>;
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
  audio: string;
  setAudio: Dispatch<SetStateAction<string>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  captions: object[];
  setCaptions: Dispatch<SetStateAction<object[]>>;
  selectedStory: string;
  selectedStyle: string;
  customPrompt: string;
  handleSelectedStoryChange: (story: string) => void;
  handleSelectedStyleChange: (style: string) => void;
  handleCustomPromptChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  loadingMessage: string;
}
type VideoScript = {
  textContent: string;
  imagePrompt: string;
};
export const VideoContext = createContext<VideoContextType | null>(null);
export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState(intialState.script);
  const [images, setImages] = useState(intialState.images);
  const [audio, setAudio] = useState(intialState.audio);
  const [captions, setCaptions] = useState(intialState.captions);
  const [selectedStory, setSelectedStory] = useState(intialState.selectedStory);
  const [selectedStyle, setSelectedStyle] = useState(intialState.selectedStyle);
  const [customPrompt, setCustomPrompt] = useState("");
  const [loadingMessage, setLoadingMessage] = useState(
    "Generating video script"
  );
  const handleStoryChange = (story: string) => {
    setSelectedStory(story);
    if (story !== "Custom Prompt") {
      setCustomPrompt("");
    }
  };
  const handleStyleChange = (style: string) => {
    setSelectedStyle(style);
  };
  const handleCustomPromptChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomPrompt(e.target.value);
    setSelectedStory("Custom Prompt");
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await createVideo(
        `Create a 30 second long ${
          customPrompt || selectedStory
        } video script. Include AI imagePrompt for each scene in ${selectedStyle} format. Provide the result in JSON format with 'imagePrompt' and 'textContent' fields. don't mention time durtion in the json format`
      );
      if (res.status === "error") {
        setLoading(false);
        setLoadingMessage("Failed to generate video script.");
      }

      setLoadingMessage("Generating video script...");
      if (res.data?.length! >= 1) {
        setLoadingMessage("Generating images from the script");
        const data = JSON.parse(res.data!);
        const imagesPrompt = data.map(async (item: any) => {
          try {
            const imageUrl = await generateImageAi(item.imagePrompt);
            return imageUrl;
          } catch (error) {
            console.log(error);
          }
        });
        const images = await Promise.all(imagesPrompt);
        console.log(images, "images from promise all");
        const validImages = images.filter(
          (image) => image !== null || undefined
        );
        console.log(validImages, "valid images");
        if (validImages.length === 0) {
          setLoading(false);
          setLoadingMessage("Failed to generate images.");
          return;
        }
        setImages(validImages);
        const audioUrl = await generateAudio(data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setLoadingMessage("Failed to generate video script.");
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };
  const generateAudio = async (videoRes: VideoScript[]) => {
    setLoading(true);
    setLoadingMessage("Generating audio from the script...");
    try {
      const scripts = videoRes.map((item) => item.textContent).join(" ");
      const audioUrl = await createAudio(scripts);
      console.log(audioUrl, "audio url");
      setAudio(audioUrl);
      return audioUrl;
    } catch (error) {
      console.log(error);
      setLoading(false);
      setLoadingMessage("Failed to generate audio.");
    }
  };
  return (
    <VideoContext.Provider
      value={{
        audio,
        images,
        script,
        setAudio,
        setImages,
        setScript,
        loading,
        setLoading,
        captions,
        setCaptions,
        selectedStory,
        selectedStyle,
        customPrompt,
        handleSelectedStoryChange: handleStoryChange,
        handleSelectedStyleChange: handleStyleChange,
        handleCustomPromptChange,
        handleSubmit,
        loadingMessage,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
