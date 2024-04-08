import "#/styles/base.scss";
import "#/styles/overrides.scss";
import "#/styles/fonts/iosevka/fonts.css";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
