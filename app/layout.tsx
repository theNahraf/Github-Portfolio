import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Farhan",
  description: "Farhan Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      className="__variable_5cfdac __variable_9a8899 antialiased vsc-initialized"
      >
        {children}
      </body>
    </html>
  );
}
