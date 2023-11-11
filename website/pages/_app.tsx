import "ress/ress.css";
import "#/styles/base.scss";
import "#/styles/overrides.scss";
import "#/styles/fonts/monaspace/fonts.css";

import type { AppProps } from "next/app";

// import TwoslashPatch from "#/components/TwoslashPatch";
// import { useCustomStyle } from "#/hooks/useCustomStyle";

export default function App({ Component, pageProps }: AppProps) {
  // useCustomStyle();

  return (
    <>
      {/* <TwoslashPatch /> */}
      <Component {...pageProps} />
    </>
  );
}
