import React from "react";
import { createPortal } from "react-dom";

import { useCustomStyle } from "#/hooks/use-custom-style";

export default function TwoslashPatchPortal() {
  const [isReady, setIsReady] = React.useState(false);
  const id = React.useId();
  const cb = React.useCallback((dom: HTMLDivElement | null) => dom && setIsReady(true), [setIsReady]);
  const { currentStyle } = useCustomStyle();

  return (
    <div ref={cb} id={`twoslash-patch-holder-${id}`} hidden>
      {isReady && createPortal(
        <style id={`twoslash-patch-${id}`}>
          {currentStyle}
        </style>,
        document.body,
      )}
    </div>
  );
}
