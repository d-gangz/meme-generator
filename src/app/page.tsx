import { MemeGeneratorComponent } from "@/components/meme-generator";

export default function Home() {
  return (
    <main
      className="w-full flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("/images/meme-bg.jpg")', // Remove "public" from the path
      }}
    >
      <MemeGeneratorComponent />
    </main>
  );
}
