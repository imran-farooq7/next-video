"use server";
export const createAudio = async (text: string) => {
  const data = {
    text,
    voiceId: "en-US-natalie",
    // encodeAsBase64: true,
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
  console.log(audio);
};
