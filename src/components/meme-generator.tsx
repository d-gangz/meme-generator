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
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Meme Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={generateMeme} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter meme text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full"
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate Meme"}
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
