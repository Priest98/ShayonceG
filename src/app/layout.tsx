import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "SHAYONCE G | Official",
  description: "The Architecture of Silhouette. Luxury fashion and hair atelier.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-onyx text-white/80 antialiased font-sans overflow-x-hidden selection:bg-white/20 selection:text-white">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
