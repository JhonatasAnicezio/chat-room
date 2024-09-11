import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChatProvider from "@/context/Chat/chat-provider";

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
        <ChatProvider>
          {children}
        </ChatProvider>
      </body>
    </html>
  );
}
