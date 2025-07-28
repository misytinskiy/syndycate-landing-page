import "./globals.css";
import IntercomMessenger from "@/components/Intercom";
import { Inter, Anton, Black_Ops_One } from "next/font/google";

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

export const metadata = {
  title: "SNDCT",
  description: "THE NEW ERA OF TRADING IN ISRAEL",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${inter.variable} ${anton.variable} ${blackOps.variable}`}
      >
        {children}
        <IntercomMessenger />
      </body>
    </html>
  );
}
