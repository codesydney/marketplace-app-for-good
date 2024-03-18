import "@radix-ui/themes/styles.css";
import "./globals.css";

import { GeistSans } from "geist/font/sans";
import { Theme } from "@radix-ui/themes";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <Theme>
          <main className="min-h-screen flex flex-col items-center">
            {children}
          </main>
        </Theme>
      </body>
    </html>
  );
}
