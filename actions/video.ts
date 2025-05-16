"use server";
import prisma from "@/prisma/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Video } from "@prisma/client";

export const saveVideo = async (video: any) => {
  const user = await currentUser();
  const newVideo = {
    ...video,
    userName: user?.fullName!,
    userEmail: user?.emailAddresses[0].emailAddress!,
  };
  try {
    await prisma.video.create({
      data: newVideo,
    });
    return {
      success: true,
      message: "Video saved successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error saving video",
    };
  }
};
