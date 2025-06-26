import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Three.js Particle Noise",
  description: "Three.js particle system with noise animation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
