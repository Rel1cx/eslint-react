import { baseUrl } from "#/lib/metadata";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ViewTransitions } from "next-view-transitions";

import "#/app/app.css";
import "#/app/app.override.css";

const themeOptions = {
  enabled: true,
  enableSystem: true,
  // defaultTheme: "dark",
  // forcedTheme: "dark",
};

export const metadata: Metadata = {
  description: "4-7x faster composable ESLint rules for React and friends.",
  title: {
    default: "ESLint React",
    template: "%s | ESLint React",
  },
  metadataBase: baseUrl,
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
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
          <RootProvider theme={themeOptions}>
            {children}
          </RootProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
