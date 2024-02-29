import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WagmiContext from "@/Providers/WagmiContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rock Paper Scissor Lizard Spock",
  description: "Exercise for Kleros Frontend Interview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center py-10">
          <h1 className="text-3xl font-semibold mb-10">
            Rock-Paper-Scissor-Lizard-Spock game
          </h1>
          <WagmiContext>{children}</WagmiContext>
        </main>
      </body>
    </html>
  );
}
