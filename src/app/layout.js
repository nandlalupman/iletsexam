import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "700"],
});

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["700", "800"],
});

export const metadata = {
  title: "IELTS.my | Premium IELTS Coaching and Mock Test Platform",
  description:
    "IELTS.my combines premium IELTS coaching, mock tests, student analytics, and admin workflows in one platform.",
  keywords: [
    "IELTS preparation",
    "IELTS online course",
    "IELTS mock test",
    "IELTS coaching",
    "IELTS Reading",
    "IELTS Writing",
    "IELTS.my",
  ],
  openGraph: {
    title: "IELTS.my | Premium IELTS Coaching and Mock Test Platform",
    description:
      "Premium IELTS coaching with Reading mock tests, analytics, student dashboards, and admin tools.",
    type: "website",
    locale: "en_US",
    siteName: "IELTS.my",
  },
  twitter: {
    card: "summary_large_image",
    title: "IELTS.my | Premium IELTS Coaching and Mock Test Platform",
    description:
      "Premium IELTS coaching with Reading mock tests, analytics, student dashboards, and admin tools.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${syne.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
