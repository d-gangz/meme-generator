"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generateMemeAction } from "@/actions/meme-actions";
import { toast } from "sonner";

export function MemeGeneratorComponent() {
  const [inputText, setInputText] = useState("");
  const [memeUrl, setMemeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateMeme = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText) return;

    setIsLoading(true);
    try {
      const result = await generateMemeAction(inputText);

      if (result.isSuccess && result.data) {
        setMemeUrl(result.data.url);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to generate meme");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-stone-900 border-none">
      <CardHeader>
        <CardTitle className="text-4xl text-center font-bold text-white py-4">
          🔥 prompt-to-meme 🔥
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={generateMeme} className="space-y-4">
          <Input
            type="text"
            placeholder="e.g. $goat will be the currency for ai agents"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full"
          />
          <Button
            type="submit"
            className="w-full bg-lime-500 text-stone-900 font-semibold text-lg hover:bg-lime-600"
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "generate meme"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        {memeUrl && (
          <Image
            src={memeUrl}
            alt="Generated Meme"
            width={500}
            height={500}
            className="max-w-full h-auto rounded-lg"
          />
        )}
      </CardFooter>
    </Card>
  );
}
