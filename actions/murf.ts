"use server";
import cloudinary from "@/lib/utils";

export const createAudio = async (text: string) => {
  const data = {
    text,
    voiceId: "en-US-miles",
    format: "MP3",
    encodeAsBase64: true,
  };
  const res = await fetch("https://api.murf.ai/v1/speech/generate", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      "api-key": process.env.MURF_API_KEY!,
    }),
    body: JSON.stringify(data),
  });
  const audio = await res.json();
  const base64Audio = audio.encodedAudio;

  // Convert base64Audio to .mp3 file
  const audioBuffer = Buffer.from(base64Audio, "base64");
  // const filePath = `output_${Date.now()}.mp3`;
  const uploadResponse: any = await new Promise((res, rej) => {
    cloudinary.uploader
      .upload_stream(
        { resource_type: "video", folder: "ai-audios" },
        (err: any, result: any) => {
          if (err) return rej(err);
          res(result);
        }
      )
      .end(audioBuffer);
  });
  return uploadResponse.secure_url;
};
