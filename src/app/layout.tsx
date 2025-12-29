import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Codon Magic - DNA Puzzle Generator | 密码子谜题生成器",
  description: "Transform text into DNA codon sequences and create fun biology puzzles. Perfect for molecular biology education and creative messaging. 把文字变成DNA密码子序列，生成有趣的生物学谜题！",
  keywords: ["codon", "DNA", "puzzle", "biology", "amino acid", "molecular biology", "education", "密码子", "生物学", "谜题"],
  authors: [{ name: "Codon Magic" }],
  openGraph: {
    title: "Codon Magic - DNA Puzzle Generator",
    description: "Transform text into DNA codon sequences and create fun biology puzzles",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Codon Magic - DNA Puzzle Generator",
    description: "Transform text into DNA codon sequences and create fun biology puzzles",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
