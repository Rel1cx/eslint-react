/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Image from "next/image";
import { useRouter } from "next/router";
import type { DocsThemeConfig } from "nextra-theme-docs";

import logo from "./assets/logo.svg";

export default {
  docsRepositoryBase: "https://github.com/eslint-react/eslint-react/tree/main/website",
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== "/") {
      return {
        titleTemplate: "%s - eslint-react",
      };
    }

    return {
      title: "Home - eslint-react",
      description: "ESLint plugin for React function components with TypeScript, built (mostly) from scratch.",
    };
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="eslint-react" />
      <meta
        property="og:description"
        content="ESLint plugin for React function components with TypeScript, built (mostly) from scratch."
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
    </>
  ),
  logo: (
    <div className="w-24">
      <Image src={logo} width="48" height="48" alt="eslint-react" />
    </div>
  ),
  project: {
    link: "https://github.com/eslint-react/eslint-react",
  },
  footer: {
    text: <span>MIT {new Date().getFullYear()} © eslint-react.</span>,
  },
} satisfies DocsThemeConfig;
