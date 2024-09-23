import type { Metadata } from "next";
import { Inter } from "next/font/google";
import UserProvider from "@/context/User/user-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Chat",
  description: "Chat of conversation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} root-layout`}>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
