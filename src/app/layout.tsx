import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "LuxeWash — Premium Laundry & Garment Care",
  description:
    "Fresh organic wash, dry cleaning, and steam pressing with free doorstep pickup and delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black overflow-x-hidden max-w-[100vw]" suppressHydrationWarning>
      <body
        className="min-h-screen bg-black text-white antialiased selection:bg-amber-400 selection:text-purple-950 overflow-x-hidden max-w-[100vw]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
