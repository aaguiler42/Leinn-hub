import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { ClerkProvider } from "@clerk/nextjs";
import styles from "./layout.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Leinner Hub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={inter.className}>
          <div className={styles.container}>
            <Sidebar />
            <div>{children}</div>
          </div>
        </body>
      </ClerkProvider>
    </html>
  );
}
