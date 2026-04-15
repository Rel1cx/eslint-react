"use client";

import { renderMermaidSVG } from "beautiful-mermaid";
import { useMemo } from "react";

export function MermaidDiagram({ code }: { code: string }) {
  const { error, svg } = useMemo(() => {
    try {
      return {
        error: null,
        svg: renderMermaidSVG(code, {
          bg: "var(--color-fd-background)",
          fg: "var(--color-fd-foreground)",
          transparent: true,
        }),
      };
    } catch (err) {
      return { error: err instanceof Error ? err : new Error(String(err)), svg: null };
    }
  }, [code]);

  if (error) return <pre>{error.message}</pre>;
  // eslint-disable-next-line @eslint-react/dom-no-dangerously-set-innerhtml
  return <div className="not-prose overflow-x-auto" dangerouslySetInnerHTML={{ __html: svg! }} />;
}
