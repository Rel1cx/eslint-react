import type { Metadata } from "next";
import type { ReactNode } from "react";

import { RootProvider } from "fumadocs-ui/provider";
import { ViewTransitions } from "next-view-transitions";
import { IBM_Plex_Mono } from "next/font/google";
import { baseUrl } from "../lib/metadata";
import "./base.css";

import "./overrides.css";

const ibm_plex_mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm_plex_mono",
  weight: ["400", "500", "700"],
});

export const metadata = {
  description: "A series of future-proof ESLint rules for React and friends.",
  title: {
    default: "ESLint React",
    template: "%s | ESLint React",
  },
  metadataBase: baseUrl,
} as const satisfies Metadata;

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ViewTransitions>
      <html className={ibm_plex_mono.variable} lang="en" suppressHydrationWarning>
        <meta content="#fff" name="msapplication-TileColor" />
        <meta content="en" httpEquiv="Content-Language" />
        <meta content="ESLint React" name="apple-mobile-web-app-title" />
        <meta content="/ms-icon-144x144.png" name="msapplication-TileImage" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="https://eslint-react.xyz" name="twitter:site" />
        <link
          href="https://eslint-react.xyz/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="https://eslint-react.xyz/favicon.png"
          rel="icon"
          type="image/png"
        />
        <body className="flex flex-col min-h-screen">
          <RootProvider>{children}</RootProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
