// eslint-disable-next-line @eslint-react/naming-convention/filename
import "ress/ress.css";
import "#/styles/base.scss";
import "#/styles/overrides.scss";
import "#/styles/fonts/monaspace/fonts.css";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
