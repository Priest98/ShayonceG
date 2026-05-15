import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "SHAYONCE G | Luxury Bridal & Bespoke Silhouette",
  description: "High-end fashion editorial and luxury hair archive. Architectural silhouettes captured in the space between presence and absence.",
  metadataBase: new URL('https://shayonceg.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden selection:bg-white/10 selection:text-white">
        <CustomCursor />
        {children}
        
        {/* Global Film Grain Overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] bg-[url('/image/noise.svg')] mix-blend-overlay pointer-events-none" />
      </body>
    </html>
  );
}
