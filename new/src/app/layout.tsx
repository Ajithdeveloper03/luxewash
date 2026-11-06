import type { Metadata, Viewport } from "next";
import "./globals.css";
import { getAssetPath } from "@/lib/basePath";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf8ff",
};

export const metadata: Metadata = {
  title: "LUXEWASH — Molecular Linen & Garment Engineering",
  description:
    "Next-generation luxury laundry & commercial linen care. Experience bespoke aqueous ozone fabric preservation.",
  keywords: [
    "Luxewash",
    "luxury laundry",
    "commercial linen care",
    "ozone washing",
    "hotel laundry",
    "couture dry cleaning",
  ],
  icons: {
    icon: getAssetPath("/luxewash-logo.png"),
    shortcut: getAssetPath("/luxewash-logo.png"),
    apple: getAssetPath("/luxewash-logo.png"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-transparent text-slate-900 antialiased selection:bg-purple-200 selection:text-purple-950">
        {children}
      </body>
    </html>
  );
}
