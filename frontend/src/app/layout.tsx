"use client";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import classNames from "classnames";
import "../styles/globals.css";
import { Toast } from "@/ui/organisms/Toast/Toast";
import * as Alert from "@/ui/organisms/Alert/Alert";
import dynamic from "next/dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const AuthProvider = dynamic(() => import("@/context/auth.context"), {
  ssr: false,
});


// export const metadata: Metadata = {
//   title: "GalèreBuddy",
//   description: "Raconte une anecdote",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={classNames(
          geistSans.className,
          "fixed overflow-hidden h-screen w-screen antialiased"
        )}
      >
        <AuthProvider>
          {children}
          <Toast />
          <Alert.Root />
        </AuthProvider>
      </body>
    </html>
  );
}
