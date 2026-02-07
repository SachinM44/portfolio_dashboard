import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio Dashboard - Real-time Stock Tracking",
  description: "A dynamic portfolio dashboard displaying real-time stock data with CMP from Yahoo Finance and P/E ratios from Google Finance. Track your investments with live market updates.",
  keywords: ["portfolio", "stocks", "investment", "dashboard", "finance", "trading"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
