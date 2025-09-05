import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Analytics Dashboard",
  description: "Analytics Dashboard with real-time data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="  bg-gray-950">
          <Header/>
          {/* Main Content Area */}
          <div className=" flex flex-col">
           
            <Sidebar />
            {/* Main Content */}
            <main className="flex-1">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
