import "@radix-ui/themes/styles.css";
import "./globals.css";

import { GeistSans } from "geist/font/sans";
import { Theme } from "@radix-ui/themes";
import AuthButton from "@/components/AuthButton";

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
          <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full flex justify-end items-center p-3">
              <AuthButton />
            </div>
          </nav>
          <main className="min-h-screen flex flex-col items-center">
            {children}
          </main>
        </Theme>
      </body>
    </html>
  );
}
