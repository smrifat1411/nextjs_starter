import type { Metadata } from "next";
import CommonLayout from "@/layouts/CommonLayout";
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
  return <CommonLayout>{children}</CommonLayout>;
}
