"use server";
import { AssemblyAI, SpeechModel } from "assemblyai";
const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLY_API_KEY!,
});
type Params = {
  audio: string;
  speech_model: SpeechModel;
};
export const createCaptions = async (audioUrl: string) => {
  const params: Params = {
    audio: audioUrl,
    speech_model: "slam-1",
  };
  try {
    const transcript = await client.transcripts.transcribe(params);
    // console.log(transcript.words, "transcript text");
    if (transcript.status === "completed") return transcript.words;
  } catch (error) {
    console.error("Error during transcription:", error);
    return null;
  }
};
