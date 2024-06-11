import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeModeScript } from "flowbite-react";
import { Sidebar } from "../components/Sidebar/Sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Residents manager APP",
  description: "Manage your residents and their activities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body className={inter.className}>
        <div className="flex h-screen flex-col">
          <div className="flex h-full flex-row">
            <div className="hidden md:block">
              <Sidebar />
            </div>
            <div className="w-full overflow-y-auto">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
