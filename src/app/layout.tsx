import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arabic Learning Suite | تعلم العربية",
  description:
    "منصة متكاملة لتعلم اللغة العربية مع تحليلات متقدمة لتتبع التقدم",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
