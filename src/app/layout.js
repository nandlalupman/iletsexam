import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "IELTS Pro Academy — Crack IELTS & Score 7+ Bands | Live Classes & AI Mock Tests",
  description:
    "Join 10,000+ successful students. Expert IELTS coaching with live classes, AI-powered mock tests, personal mentorship, and speaking evaluation. Score 7+ bands guaranteed.",
  keywords: [
    "IELTS preparation",
    "IELTS online course",
    "IELTS 7+ bands",
    "IELTS coaching",
    "IELTS mock test",
    "IELTS speaking",
    "IELTS writing",
    "IELTS reading",
    "IELTS listening",
  ],
  openGraph: {
    title: "IELTS Pro Academy — Crack IELTS & Score 7+ Bands",
    description:
      "Expert IELTS coaching with live classes, AI mock tests, and personal mentorship. Join 10,000+ successful students.",
    type: "website",
    locale: "en_US",
    siteName: "IELTS Pro Academy",
  },
  twitter: {
    card: "summary_large_image",
    title: "IELTS Pro Academy — Score 7+ Bands",
    description:
      "Live classes, AI mock tests, and expert mentorship for IELTS success.",
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
