export const LUXURY_EASE = [0.22, 1, 0.36, 1];

export const MOTION_SECTION = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.8, ease: LUXURY_EASE },
};

export const VIDEOS = [
  "/video/hero.mp4",
  "https://player.vimeo.com/external/371433846.hd.mp4?s=228a6358486049286d9d1be6a2469493922eb734&profile_id=170&oauth2_token_id=57447761",
  "https://player.vimeo.com/external/368700244.hd.mp4?s=7fcc180840428bd308253a63ec40081bfec2110c&profile_id=170&oauth2_token_id=57447761",
  "https://player.vimeo.com/external/554160416.hd.mp4?s=e7f34c264a2754630560b216c527f311c1d76378&profile_id=175&oauth2_token_id=57447761",
];

export const TARI_VIDEOS = [
  "/video/tari/tari1.mp4",
  "/video/tari/tari2.mp4",
  "/video/tari/tari3.mp4",
];

export const TARI_PRODUCTS = [
  { id: 'tari-1', title: "Tari Signature Set", price: 85000, src: "/video/tari/tari1.mp4", isVideo: true, desc: "A masterclass in silhouette, designed for absolute presence." },
  { id: 'tari-2', title: "Tari Luxe Edition", price: 120000, src: "/video/tari/tari2.mp4", isVideo: true, desc: "Premium tailoring meet architectural drape." },
  { id: 'tari-3', title: "Tari Evening Set", price: 95000, src: "/video/tari/tari3.mp4", isVideo: true, desc: "Fluid motion captured in the stillness of night." },
  { id: 'tari-4', title: "Tari Bridal Set", price: 150000, src: "/video/tari/tari1.mp4", isVideo: true, desc: "The ultimate transformation for the modern bride." },
];

export const HAIR_COLLECTION = [
  { id: 1, src: "/image/hair1.png", title: "Bone Straight", category: "The Silk Edit" },
  { id: 2, src: "/image/hair2.png", title: "Deep Wave", category: "Liquid Motion" },
  { id: 3, src: "/image/hair3.png", title: "Burgundy Unit", category: "The Archive" },
  { id: 4, src: "https://player.vimeo.com/external/371433846.hd.mp4?s=228a6358486049286d9d1be6a2469493922eb734&profile_id=170&oauth2_token_id=57447761", title: "Bridal Install", category: "Eternal Silhouette", isVideo: true },
];

export const HAIR_PRODUCTS = [
  { id: 'hair-1', title: "Bone Straight 24”", price: 350000, src: "/image/hair1.png", desc: "Sleek, liquid-like texture with mirror-shine finish." },
  { id: 'hair-2', title: "Deep Wave 26”", price: 420000, src: "/image/hair2.png", desc: "Luxurious volume with defined, flowing waves." },
  { id: 'hair-3', title: "Curly Volume 22”", price: 380000, src: "/image/hair3.png", desc: "Bold, textured curls for an ethereal silhouette." },
  { id: 'hair-4', title: "Burgundy Unit 24”", price: 450000, src: "/image/hair3.png", desc: "Rich, editorial color with signature frontal finish." },
];
