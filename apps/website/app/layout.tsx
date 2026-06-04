import "@/app/app.base.css";
import "@/app/app.override.css";

import { baseUrl } from "@/lib/metadata";
import { Banner } from "fumadocs-ui/components/banner";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Metadata } from "next";
import { Link, ViewTransitions } from "next-view-transitions";

export const metadata: Metadata = {
  description: "Performant, composable ESLint rules for React and friends.",
  title: {
    default: "ESLint React",
    template: "%s | ESLint React",
  },
  metadataBase: baseUrl,
};

const theme = {
  enabled: true,
  enableSystem: true,
} as const satisfies Parameters<typeof RootProvider>[0]["theme"];

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <meta content="#fff" name="msapplication-TileColor" />
        <meta content="en" httpEquiv="Content-Language" />
        <meta content="ESLint React" name="apple-mobile-web-app-title" />
        <meta content="/ms-icon-144x144.png" name="msapplication-TileImage" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="https://eslint-react.xyz" name="twitter:site" />
        <link href="https://eslint-react.xyz/favicon.ico" rel="icon" type="image/x-icon" />
        <body className="flex flex-col min-h-screen">
          <Banner id="kit-beta" variant="rainbow">
            <Link href="/docs/packages/kit">
              <pre>Try <code>@eslint-react/kit@beta</code> →</pre>
            </Link>
          </Banner>
          <RootProvider theme={theme}>
            {children}
          </RootProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
