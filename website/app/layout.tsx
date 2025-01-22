import "./base.css";
import "./overrides.css";
import { RootProvider } from "fumadocs-ui/provider";
import type { ReactNode } from "react";
import { ViewTransitions } from "next-view-transitions";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <meta name="msapplication-TileColor" content="#fff" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="apple-mobile-web-app-title" content="ESLint React" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://eslint-react.xyz" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://eslint-react.xyz/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="https://eslint-react.xyz/favicon.png"
        />
        <body className="flex flex-col min-h-screen">
          <RootProvider>{children}</RootProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
