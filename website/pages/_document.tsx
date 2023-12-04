// eslint-disable-next-line @eslint-react/naming-convention/filename
import { Head, Html, Main, NextScript } from "next/document";

import { PUBLIC_URL } from "#/constants";

export default function Document() {
  const metaTitle = "eslint-react";
  // dprint-ignore
  const metaDescription = "ESLint x React - More than 50 ESLint rules to catch common mistakes and improve your React code. Built (mostly) from scratch.";

  return (
    <Html lang="en">
      <Head>
        <meta name="og:title" content={metaTitle} />
        <meta name="og:description" content={metaDescription} />
        <meta name="og:image" content={`${PUBLIC_URL}/og.png`} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`${PUBLIC_URL}/og.png`} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
