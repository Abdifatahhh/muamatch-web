import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { Roboto } from "next/font/google";
import "./globals.css";
import { HtmlLangSync } from "@/components/html-lang-sync";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollFlag } from "@/components/scroll-flag";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://muamatch.com"),
  icons: { icon: "https://www.muamatch.com/favicon.ico" },
  title: { default: "MUA Match", template: "%s | MUA Match" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.variable} font-sans`}>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <Suspense fallback={null}>
          <HtmlLangSync />
        </Suspense>
        <ScrollFlag />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
