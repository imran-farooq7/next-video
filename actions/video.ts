"use server";
import prisma from "@/prisma/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const saveVideo = async (video: any) => {
  const user = await currentUser();
  const userCredits = await prisma.credit.findFirst({
    where: {
      userEmail: user?.emailAddresses[0].emailAddress!,
    },
    select: {
      credits: true,
    },
  });
  if (!userCredits || userCredits.credits <= 1) {
    return {
      success: false,
      message: "You do not have enough credits to save a video",
    };
  } else {
    userCredits.credits -= 1;
    const credits = await prisma.credit.update({
      where: {
        userEmail: user?.emailAddresses[0].emailAddress!,
      },
      data: {
        credits: userCredits.credits,
      },
    });
  }

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
      credits: userCredits.credits,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error saving video",
    };
  }
};
export const getUserVideos = async () => {
  const user = await currentUser();
  try {
    const videos = await prisma.video.findMany({
      where: {
        userEmail: user?.emailAddresses[0].emailAddress!,
      },
    });
    return {
      status: "success",
      data: videos,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Error fetching videos",
    };
  }
};
