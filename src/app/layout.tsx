import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EthioFlix",
  description: "Discover and review Ethiopian movies.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased text-secondary`}>
        <div className="min-h-screen w-full relative bg-primary">
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
