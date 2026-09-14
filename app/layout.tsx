import { Inter } from 'next/font/google';
import "./globals.css";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Chatbot } from "../components/Chatbot";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "NAANGLE — AI Agency",
  description: "Premium AI agency site.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#f4f3ee] text-[#111111] antialiased`}>
        <Navbar />
        <main className="relative z-10 min-h-screen w-full">
          {children}
        </main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
