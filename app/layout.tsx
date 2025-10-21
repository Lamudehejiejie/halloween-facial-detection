import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Facial Expression Detector",
  description: "Real-time facial expression detection with face overlay",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">{children}</body>
    </html>
  );
}
