import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useRouter } from "next/router";
import type { DocsThemeConfig } from "nextra-theme-docs";
import { match, P } from "ts-pattern";

import logo from "#/assets/logo.svg";
import { Image } from "#/components/Image";
import { PUBLIC_URL } from "#/constants";

export default {
  docsRepositoryBase: "https://github.com/rel1cx/eslint-react/tree/main/website",
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  useNextSeoProps() {
    return match(useRouter())
      .with({ asPath: "/" }, () => ({
        title: "ESLint React",
        description: "ESLint plugin for React function components with TypeScript, built (mostly) from scratch.",
      }))
      .with({ asPath: P.string.startsWith("/rules/") }, () => ({
        titleTemplate: "Rule: %s",
      }))
      .otherwise(() => ({
        titleTemplate: "%s – ESLint React",
      }));
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="ESLint React" />
      <meta
        property="og:description"
        content="ESLint plugin for React function components with TypeScript, built (mostly) from scratch."
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
      <Image src={logo as StaticImport} width="48" height="48" alt="eslint-react" />
    </div>
  ),
  project: {
    link: "https://github.com/rel1cx/eslint-react",
  },
  footer: {
    text: <span>MIT {new Date().getFullYear()} © ESLint React.</span>,
  },
} satisfies DocsThemeConfig;
