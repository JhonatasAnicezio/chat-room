'use client'
import Header from "@/components/app/root/header";
import { UserContext } from "@/context/User/user-context";
import { useContext } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading } = useContext(UserContext);

  return (
    <>
      { !isLoading &&
        <>
          <Header />
          {children}
        </>}
    </>
  );
}
