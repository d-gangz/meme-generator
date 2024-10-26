import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata: Metadata = {
//   title: "🔥 prompt-to-meme 🔥",
//   description: "generate memes from text prompts",
// };

export const metadata: Metadata = {
  title: {
    default: "🔥 prompt-to-meme 🔥",
    // template: `%s | ${siteConfig.name}`,
    template: "🔥 prompt-to-meme 🔥",
  },
  description: "generate memes from text prompts",
  keywords: ["crypto", "memes", "ai", "crypto investing", "crypto trading"],
  // openGraph: {
  //   type: "website",
  //   locale: "en_US",
  //   url: siteConfig.url,
  //   title: siteConfig.name,
  //   description: siteConfig.description,
  //   siteName: siteConfig.name,
  // },
  twitter: {
    card: "summary_large_image",
    title: "🔥 prompt-to-meme 🔥",
    description: "generate memes from text prompts",
    images: ["/images/meme-bg.jpg"],
    creator: "@terrytjw",
  },
  // icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon-16x16.png",
  //   apple: "/apple-touch-icon.png",
  // },
  // manifest: `${siteConfig.url}/site.webmanifest`,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
