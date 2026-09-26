import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WorkoutProvider } from "@/context/WorkoutContext";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "Train hard, log honest.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#08080a] text-zinc-100 antialiased">
        <WorkoutProvider>
          <Navbar />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#121820",
                color: "#f4f4f5",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "14px",
                fontSize: "13px",
                fontWeight: "600",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
              },
              success: {
                iconTheme: {
                  primary: "#ccff00",
                  secondary: "#000000",
                },
              },
              error: {
                iconTheme: {
                  primary: "#f87171",
                  secondary: "#000000",
                },
              },
            }}
          />
        </WorkoutProvider>
      </body>
    </html>
  );
}


