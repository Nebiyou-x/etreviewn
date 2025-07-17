import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter font
import "./globals.css";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] }); // Initialize Inter

export const metadata: Metadata = {
  title: "EthioFlix",
  description: "Discover and review Ethiopian movies.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased text-gray-200`}>
        <div className="min-h-screen w-full relative bg-black">
          {/* Copper Forge Background with Top Glow */}
          <div
            className="absolute inset-0 z-0 pointer-events-none" // pointer-events-none
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(249, 115, 22, 0.25), transparent 70%), #000000",
            }}
          />
          {/* Main Content Layer */}
          <main className="relative z-10">
            {children}
          </main>
        </div>
        <Toaster position="top-center" richColors/>
      </body>
    </html>
  );
}
