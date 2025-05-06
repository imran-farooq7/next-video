"use server";
import { GoogleGenAI, Modality } from "@google/genai";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const defaultMessage =
  "Create a 30 second long ADVENTURE STORY video script. Include AI imageprompts in FANTASY FORMAT for each scene in realistic format. Provide the result in JSON format with 'image' and 'text' fields.";
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY! });

export async function createVideo(message: string = defaultMessage) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: message,
    });
    const res = response.text;
    const data = res?.replace(/```json|\n```/g, "").trim();
    return {
      status: "success",
      data: data,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error,
    };
  }
  // let jsonData
  // try {
  //     jsonData = JSON.parse(data!)
  //     console.log(jsonData)
  //     return jsonData
  // } catch (error) {
  //     console.log(error)
  //     jsonData = data
  // }
}

export const generateImageAi = async (prompt: string) => {
  try {
    let imageUrl: string = "";

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp-image-generation",
      contents: prompt,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      // Based on the part type, either show the text or save the image
      if (part.text) {
        console.log(part.text);
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData!, "base64");
        const uploadResponse: any = await new Promise((res, rej) => {
          cloudinary.uploader
            .upload_stream({ folder: "ai-images" }, (err, result) => {
              if (err) return rej(err);
              res(result);
            })
            .end(buffer);
        });
        imageUrl = uploadResponse.secure_url;
      }
    }
    console.log(imageUrl);
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error,
    };
  }
};
