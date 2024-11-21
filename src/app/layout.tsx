import type { Metadata } from "next";
import { geistvf } from "@/styles/font";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Starter Template",
  description: "Rifat Hossain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={` ${geistvf.variable}`}>
      <body
        className={`w-full mx-auto font-geistvf antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
