/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useRouter } from "next/router";
import type { DocsThemeConfig } from "nextra-theme-docs";
import * as M from "ts-pattern";

import logo from "#/assets/logo.svg";
import { Image } from "#/components/image";
import { PUBLIC_URL } from "#/constants";

export default {
  docsRepositoryBase: "https://github.com/rel1cx/eslint-react/tree/main/website",
  primaryHue: {
    light: 233,
    dark: 204,
  },
  primarySaturation: {
    light: 75,
    dark: 32,
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  useNextSeoProps() {
    return M.match(useRouter())
      .with({ asPath: "/" }, () => ({
        title: "ESLint x React",
        description:
          "ESLint x React - More than 50 ESLint rules to catch common mistakes and improve your React code. Built (mostly) from scratch.",
      }))
      .with({ asPath: M.P.string.startsWith("/rules/") }, () => ({
        titleTemplate: "Rule: %s",
      }))
      .otherwise(() => ({
        titleTemplate: "%s – ESLint x React",
      }));
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="ESLint x React" />
      <meta
        property="og:description"
        content="ESLint x React - More than 50 ESLint rules to catch common mistakes and improve your React code. Built (mostly) from scratch."
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${PUBLIC_URL}/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${PUBLIC_URL}/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${PUBLIC_URL}/favicon-16x16.png`}
      />
      <link rel="preconnect" href="https://cdn.jsdelivr.net" />
    </>
  ),
  logo: (
    <div className="w-24">
      <Image src={logo} width="48" height="48" alt="eslint-react" />
    </div>
  ),
  project: {
    link: "https://github.com/rel1cx/eslint-react",
  },
  footer: {
    text: <span>MIT {new Date().getFullYear()} © ESLint x React.</span>,
  },
} satisfies DocsThemeConfig;
