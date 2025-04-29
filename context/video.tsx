"use client"
import { useState,ReactNode,Dispatch,SetStateAction, createContext, ChangeEvent } from "react"
const intialState = {
    script:"",
    images:[] as string[],
    audio:"",
    captions:[] as object[],
    loading:false,
    selectedStory:"Inspirational Story",
    selectedStyle:"Artistic",
}
interface VideoContextType {
    script:string
    setScript:Dispatch<SetStateAction<string>>
    images:string[]
    setImages:Dispatch<SetStateAction<string[]>>
    audio:string
    setAudio:Dispatch<SetStateAction<string>>
    loading:boolean
    setLoading:Dispatch<SetStateAction<boolean>>
    captions:object[]
    setCaptions:Dispatch<SetStateAction<object[]>>
    selectedStory:string
    selectedStyle:string
    customPrompt:string
    handleSelectedStoryChange:(story:string) => void
    handleSelectedStyleChange:(style:string) => void
    handleCustomPromptChange:(e:ChangeEvent<HTMLInputElement>) => void
    handleSubmit:() => void
}
const VideoContext = createContext<VideoContextType | null>(null)
export const VideoProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(false)
    const [script, setScript] = useState(intialState.script)
    const [images, setImages] = useState(intialState.images)
    const [audio, setAudio] = useState(intialState.audio)
    const [captions, setCaptions] = useState(intialState.captions)
    const [selectedStory, setSelectedStory] = useState(intialState.selectedStory)
    const [selectedStyle, setSelectedStyle] = useState(intialState.selectedStyle)
    const [customPrompt, setCustomPrompt] = useState("")
    const handleStoryChange = (story: string) => {
        setSelectedStory(story)
        if (story !== "Custom Prompt") {
            setCustomPrompt("")
        } 
    }
    const handleStyleChange = (style: string) => {
        setSelectedStyle(style)
    }
    const handleCustomPromptChange = (e:ChangeEvent<HTMLInputElement>) => {
        setCustomPrompt(e.target.value)
    setSelectedStory("Custom Prompt")
    }
    const handleSubmit = async () => {
        const videoData = {
            story: selectedStory || "Custom Prompt",
            style: selectedStyle,
            prompt:  customPrompt || selectedStory,
        }
        console.log(videoData)
    }
    return (
        <VideoContext.Provider value={{audio,images,script,setAudio,setImages,setScript,loading,setLoading,captions,setCaptions,selectedStory,selectedStyle,customPrompt,handleSelectedStoryChange:handleStoryChange,handleSelectedStyleChange:handleStyleChange,handleCustomPromptChange,handleSubmit}}>
            {children}
        </VideoContext.Provider>
    )
}	