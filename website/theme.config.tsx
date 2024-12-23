import type { DocsThemeConfig } from "nextra-theme-docs";

import logo from "#/assets/logo.svg";
import { Image } from "#/components/image";
import { PUBLIC_URL } from "#/constants";

export default {
  docsRepositoryBase: "https://github.com/rel1cx/eslint-react/tree/main/website",
  // color: {
  //   hue: {
  //     light: 200,
  //     dark: 200,
  //   },
  //   saturation: {
  //     light: 0,
  //     dark: 100,
  //   },
  // },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  // useNextSeoProps() {
  //   return match(useRouter())
  //     .with({ asPath: "/" }, () => ({
  //       title: "ESLint React",
  //       description:
  //         "ESLint React - A series of composable ESLint plugins for libraries and frameworks that use React as a UI runtime.",
  //     }))
  //     .with({ asPath: P.string.startsWith("/rules/") }, () => ({
  //       titleTemplate: "Rule: %s",
  //     }))
  //     .otherwise(() => ({
  //       titleTemplate: "%s – ESLint React",
  //     }));
  // },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="ESLint React" />
      <meta
        property="og:description"
        content="ESLint React - The most advanced lint rules for React."
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${PUBLIC_URL}/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        href={`${PUBLIC_URL}/favicon.png`}
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
    content: <span>MIT {new Date().getFullYear()} © ESLint React.</span>,
  },
} satisfies DocsThemeConfig;
