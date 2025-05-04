"use client";
import { createVideo } from "@/actions/geminiai";
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
export const VideoContext = createContext<VideoContextType | null>(null);
export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
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
        `create a 30 second long ${
          customPrompt || selectedStory
        } video script. included AI imagePrompt for each scene in ${selectedStyle}.Provide the result in JSON format with 'image' and 'text' fields.`
      );
      if (res.status === "error") {
        setLoading(false);
        setLoadingMessage("Failed to generate video script.");
      } else {
        console.log(res.data);
      }

      setLoadingMessage("Generating video script...");
    } catch (error) {
    } finally {
      setLoading(false);
      setLoadingMessage("");
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
