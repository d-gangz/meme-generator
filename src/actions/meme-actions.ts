"use server";

import { ActionState } from "@/types";

type MemeResponse = {
  url: string;
  page_url: string;
  template_id: number;
  texts: string[];
};

export async function generateMemeAction(
  text: string
): Promise<ActionState<MemeResponse>> {
  try {
    const response = await fetch("https://api.imgflip.com/ai_meme", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: process.env.IMGFLIP_USERNAME!,
        password: process.env.IMGFLIP_PASSWORD!,
        prefix_text: text,
        model: "openai",
      }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error_message || "Failed to generate meme");
    }

    return {
      isSuccess: true,
      message: "Meme generated successfully",
      data: data.data,
    };
  } catch (error) {
    console.error("Error generating meme:", error);
    return { isSuccess: false, message: "Failed to generate meme" };
  }
}
