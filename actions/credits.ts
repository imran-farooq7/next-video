"use server";

import prisma from "@/prisma/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const saveCredits = async (amount: number, credits: number) => {
  try {
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;
    const existingCredit = await prisma.credit.findFirst({
      where: {
        userEmail: userEmail!,
      },
    });
    if (existingCredit) {
      existingCredit.amount += amount;
      existingCredit.credits += credits;
      await prisma.credit.update({
        where: { userEmail: existingCredit.userEmail },
        data: existingCredit,
      });
      return {
        success: true,
        message: "Credits updated successfully",
      };
    } else {
      await prisma.credit.create({
        data: {
          userEmail: userEmail!,
          amount,
          credits,
        },
      });
      return {
        success: true,
        message: "Credits saved successfully",
      };
    }
  } catch (error) {
    console.error(error);
  }
};
export const getUserCredits = async () => {
  try {
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;
    const credits = await prisma.credit.findFirst({
      where: {
        userEmail: userEmail!,
      },
      select: {
        credits: true,
      },
    });
    return credits;
  } catch (error) {
    console.error(error);
    return { amount: 0, credits: 0 };
  }
};
