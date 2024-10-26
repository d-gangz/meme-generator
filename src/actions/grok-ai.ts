import { config } from "dotenv";
import OpenAI from "openai";
import * as readline from "readline";

config({ path: ".env.local" });

const openai = new OpenAI({
  apiKey: process.env.GROK_API_KEY,
  baseURL: "https://api.x.ai/v1",
});

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const askQuestion = (query: string): Promise<string> => {
    return new Promise((resolve) => rl.question(query, resolve));
  };

  while (true) {
    const userInput = await askQuestion("You: ");
    if (userInput.toLowerCase() === "exit") break;

    const response = await openai.chat.completions.create({
      model: "grok-beta",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userInput },
      ],
    });

    console.log("AI:", response);
  }

  rl.close();
}

main();
