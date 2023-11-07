import "#/styles/globals.css";

import type { AppProps } from "next/app";

import TwoslashPatch from "#/components/TwoslashPatch";
import { useCustomStyle } from "#/hooks/useCustomStyle";

export default function App({ Component, pageProps }: AppProps) {
  useCustomStyle();

  return (
    <>
      <TwoslashPatch />
      <Component {...pageProps} />
    </>
  );
}
