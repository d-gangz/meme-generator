import { MemeGeneratorComponent } from "@/components/meme-generator";

export default function Home() {
  // ok this is good
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <MemeGeneratorComponent />
    </main>
  );
}
