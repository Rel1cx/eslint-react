import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  const metaTitle = "eslint-react";
  const metaDescription = "A set of toolkit to write better React";

  return (
    <Html lang="en">
      <Head>
        <meta name="og:title" content={metaTitle} />
        <meta name="og:description" content={metaDescription} />
        {/* <meta name="og:image" content={`${deployUrl}/og.png`} /> */}
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        {/* <meta name="twitter:image" content={`${deployUrl}/og.png`} /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
