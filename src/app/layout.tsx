import "~/styles/globals.css";

import { Roboto as FontSans } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { cn } from "~/lib/utils";

export const metadata = {
  title: "Tetris",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "300",
});

type CildType = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: CildType) {
  return (
    <html lang="en" className={cn(fontSans.variable)}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
