"use client"
import { useState,useEffect,ReactNode,Dispatch,SetStateAction, createContext } from "react"
const intialState = {
    script:"",
    images:[] as string[],
    audio:"",
    captions:[] as object[],
    loading:false,
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
}
const VideoContext = createContext<VideoContextType | null>(null)
export const VideoProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(false)
    const [script, setScript] = useState(intialState.script)
    const [images, setImages] = useState(intialState.images)
    const [audio, setAudio] = useState(intialState.audio)
    const [captions, setCaptions] = useState(intialState.captions)
    return (
        <VideoContext.Provider value={{audio,images,script,setAudio,setImages,setScript,loading,setLoading,captions,setCaptions}}>
            {children}
        </VideoContext.Provider>
    )
}	