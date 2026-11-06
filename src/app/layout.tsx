import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07090e",
};

export const metadata: Metadata = {
  title: "LUXEWASH — Precision Laundry & Molecular Garment Engineering",
  description:
    "Next-generation luxury laundry & commercial linen care. Zero-phosphate ozone infusion, cold-water hydro-inversion, and 24-hour on-demand door-to-door delivery.",
  keywords: [
    "Luxewash",
    "luxury laundry",
    "commercial laundry",
    "ozone linen care",
    "hotel laundry service",
    "couture dry cleaning",
    "delicate garment washing",
  ],
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#07090e] text-[#f1f5f9] antialiased selection:bg-[#0284c7] selection:text-white">
        {children}
      </body>
    </html>
  );
}
