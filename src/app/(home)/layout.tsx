import "@/app/globals.css";
import Navbar from "@/components/common/Navbar";
import { TailwindIndicator } from "@/components/common/TailwindIndicator";
import { BannerCarousel } from "@/components/home/BannerCarousel";
import type { Metadata } from "next";
import { Inter, Urbanist } from "next/font/google";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  weight: ["300", "400", "500", "600", "700"], // Light, Regular, Medium, Semibold, Bold
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"], // Light, Regular, Medium, Semibold, Bold
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kitchen Rack",
  description: "The healthy treasure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${urbanist.variable} ${inter.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <TailwindIndicator /> {/* for development only */}
        <Navbar />
        <main className="container max-w-7xl mx-auto px-4 ">
          <BannerCarousel />
          {children}
        </main>
      </body>
    </html>
  );
}
