import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sangmeshwar Naik | AI/ML Engineer & Data Scientist Portfolio",
  description:
    "Official portfolio of Sangmeshwar Anil Naik — AI/ML Engineer, Data Scientist, and GenAI Developer specializing in deep learning, computer vision, and quantum machine learning.",
  keywords: [
    "Sangmeshwar Naik",
    "AI/ML Engineer",
    "Data Scientist",
    "Machine Learning Developer",
    "Deep Learning",
    "Computer Vision",
    "Quantum Machine Learning",
    "U-Net",
    "YOLO",
    "Python",
    "Portfolio",
  ],
  authors: [{ name: "Sangmeshwar Anil Naik" }],
  creator: "Sangmeshwar Anil Naik",
  openGraph: {
    title: "Sangmeshwar Naik | AI/ML Engineer Portfolio",
    description:
      "Building intelligent solutions through Artificial Intelligence, Machine Learning, and modern software engineering.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className="antialiased bg-[#050508] text-white selection:bg-cyan-500/30 selection:text-white font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
