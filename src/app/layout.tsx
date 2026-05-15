import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "SENGANEWO OFFICIAL",
  description: "Luxury Bridal & Bespoke. Crafted in Lagos.",
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
