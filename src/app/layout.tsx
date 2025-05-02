import "@/app/globals.css";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { TailwindIndicator } from "@/components/common/TailwindIndicator";
import { AuthProvider } from "@/providers/auth-provider";
import { QueryProvider } from "@/providers/query-provider";
import type { Metadata } from "next";
import { Inter, Urbanist } from "next/font/google";
import { Toaster } from "react-hot-toast";

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
        <QueryProvider>
          <AuthProvider>
            <TailwindIndicator /> {/* for development only */}
            <Navbar />
            <main className="container max-w-screen-2xl mx-auto px-1 md:px-3 lg:px-4">
              {children}
            </main>
            <Footer />
            <Toaster position="top-left" />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
