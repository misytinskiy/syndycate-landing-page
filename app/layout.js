import "./globals.css";
import IntercomMessenger from "@/components/Intercom";
import { Inter, Anton, Black_Ops_One } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
});

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
});

const blackOps = Black_Ops_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-blackops",
});

const stencil = localFont({
  src: "/fonts/SolidStencil2023.ttf",
  display: "swap",
  variable: "--font-stencil",
});

export const metadata = {
  title: "SNDCT",
  description: "THE NEW ERA OF TRADING IN ISRAEL",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${stencil.variable} ${inter.variable} ${anton.variable} ${blackOps.variable}`}
      >
        {children}
        <IntercomMessenger />
      </body>
    </html>
  );
}
