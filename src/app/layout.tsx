import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "LuxeWash | Professional Linen Care & Commercial Laundry Solutions",
  description:
    "Commercial laundry excellence for hotels, restaurants, spas, and healthcare. Fresh linen, fewer worries, better business with bespoke care protocols.",
  keywords: [
    "commercial laundry",
    "linen service",
    "hospitality linen",
    "hotel laundry service",
    "restaurant linen",
    "medical laundry",
    "LuxeWash",
    "Lesako laundry",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#faf8f5] text-[#191024] antialiased selection:bg-[#2e094d] selection:text-white">
        {children}
      </body>
    </html>
  );
}
