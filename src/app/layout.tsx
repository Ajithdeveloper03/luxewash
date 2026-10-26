import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://luxewash.com"),
  title: "LUXEWASH | Premium Couture Laundry & Dry Cleaning",
  description:
    "Experience royal garment care with LUXEWASH. White-glove doorstep laundry & dry cleaning, 100% biodegradable hypoallergenic detergents, precision color segregation, and 24-48 hour turnaround.",
  keywords: [
    "luxury laundry",
    "dry cleaning",
    "couture care",
    "doorstep laundry service",
    "hypoallergenic laundry",
    "steam pressing",
    "express laundry",
    "Luxewash",
  ],
  openGraph: {
    title: "LUXEWASH | Royal Laundry & Couture Dry Cleaning",
    description:
      "Doorstep pickup, zero-shrinkage low-heat tumble, harm-free suds, and hand-inspected perfection. Elevate your everyday wardrobe.",
    url: "https://luxewash.com",
    siteName: "LUXEWASH",
    images: [
      {
        url: "/luxewash/images/logo.png",
        width: 1200,
        height: 600,
        alt: "LUXEWASH Luxury Laundry",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/luxewash/images/logo.png", type: "image/png" },
      { url: "/luxewash/icon.png", type: "image/png" },
    ],
    shortcut: "/luxewash/images/logo.png",
    apple: "/luxewash/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Manrope:wght@200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col font-sans bg-[#FAF8FD] text-[#1E0935] antialiased"
      >
        {children}
      </body>
    </html>
  );
}
