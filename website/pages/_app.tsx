import "#/styles/globals.css";

import type { AppProps } from "next/app";
// import {useCustomStyle} from '@/hooks/useCustomStyle'
// import TwoslashPatch from "#/components/TwoslashPatch"

export default function App({ Component, pageProps }: AppProps) {
  // useCustomStyle()

  return (
    <>
      {/* <TwoslashPatch /> */}
      <Component {...pageProps} />
    </>
  );
}
