// eslint-disable-next-line @eslint-react/naming-convention/filename
import "ress/ress.css";
import "#/styles/base.scss";
import "#/styles/overrides.scss";
import "#/styles/fonts/monaspace/fonts.css";

import type { AppProps } from "next/app";

// import TwoslashPatch from "#/components/twoslash-patch";
// import { useCustomStyle } from "#/hooks/use-custom-style";

export default function App({ Component, pageProps }: AppProps) {
  // useCustomStyle();

  return (
    <>
      {/* <TwoslashPatch /> */}
      <Component {...pageProps} />
    </>
  );
}
