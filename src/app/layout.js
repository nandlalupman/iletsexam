import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "IELTS.my — International English Language Training Specialists | 30-Day Intensive Program",
  description:
    "IELTS.my — Your Gateway to Global Success. Join our 30-day intensive IELTS program with expert trainers Divya & Daksh Lavania. 6 Band Guaranteed or Money Back. Max 4 students per batch. €490 only.",
  keywords: [
    "IELTS preparation",
    "IELTS online course",
    "IELTS 6+ bands",
    "IELTS coaching",
    "IELTS mock test",
    "IELTS speaking",
    "IELTS writing",
    "IELTS reading",
    "IELTS listening",
    "IELTS.my",
    "International English Language Training Specialists",
  ],
  openGraph: {
    title: "IELTS.my — International English Language Training Specialists",
    description:
      "30-day intensive IELTS program with expert trainers. 6 Band Guaranteed or Money Back. Max 4 students per batch.",
    type: "website",
    locale: "en_US",
    siteName: "IELTS.my",
  },
  twitter: {
    card: "summary_large_image",
    title: "IELTS.my — International English Language Training Specialists",
    description:
      "30-day intensive IELTS program. 6 Band Guaranteed or Money Back. Expert trainers, max 4 students.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
