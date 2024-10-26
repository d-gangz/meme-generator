"use server";

import { ActionState } from "@/types";

type MemeResponse = {
  url: string;
  page_url: string;
  template_id: number;
  texts: string[];
};

export async function generateMemeAction(
  text: string // This 'text' parameter comes from the inputText state in the component
): Promise<ActionState<MemeResponse>> {
  try {
    // The fetch function is used to make a POST request to the ImgFlip API
    const response = await fetch("https://api.imgflip.com/ai_meme", {
      method: "POST",
      headers: {
        // This header tells the server that we're sending form-urlencoded data
        // The ImgFlip API expects data in this format for this endpoint
        "Content-Type": "application/x-www-form-urlencoded",
      },
      // URLSearchParams is used to format the data as key-value pairs
      // This creates a string of data in the form-urlencoded format: username=someuser&password=somepass&prefix_text=Hello%20World&model=openai
      body: new URLSearchParams({
        username: process.env.IMGFLIP_USERNAME!,
        password: process.env.IMGFLIP_PASSWORD!,
        prefix_text: text, // The 'text' from the component is used here
        model: "openai",
        no_watermark: "true",
        // These parameters are sent in the body of the POST request, not in the URL
        // This follows the API's requirement as stated in their documentation
      }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error_message || "Failed to generate meme");
    }

    // If successful, we return an ActionState object with the meme data
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
