import { useConfig, type DocsThemeConfig } from "nextra-theme-docs";

import logo from "#/assets/logo.svg";
import { Image } from "#/components/image";
import { PUBLIC_URL } from "#/constants";

export default {
  docsRepositoryBase: "https://github.com/rEl1cx/eslint-react/tree/main/website",
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
  head: function useHead() {
    const config = useConfig();
    const title = `${config.title} – ESLint React`;
    const description = config.frontMatter["description"]
      || "ESLint React - The most advanced linting rules for React.";
    const image = config.frontMatter["image"]
      || `${PUBLIC_URL}/og.png`;
    return (
      <>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="og:image" content={image} />
        <meta name="msapplication-TileColor" content="#fff" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="apple-mobile-web-app-title" content="ESLint React" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://eslint-react.xyz" />
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
      </>
    );
  },
  logo: (
    <div className="w-24">
      <Image src={logo} width="48" height="48" alt="eslint-react" />
    </div>
  ),
  project: {
    link: "https://github.com/rEl1cx/eslint-react",
  },
  footer: {
    content: <span>MIT {new Date().getFullYear()} © ESLint React.</span>,
  },
} satisfies DocsThemeConfig;
