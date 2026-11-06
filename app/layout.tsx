import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Couture-Cola — The familiar, recut",
  description:
    "An independent streetwear concept by Kout Project. Familiar energy, recut as collectible fashion.",
  openGraph: {
    title: "Couture-Cola — The familiar, recut",
    description: "An independent streetwear concept by Kout Project.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
