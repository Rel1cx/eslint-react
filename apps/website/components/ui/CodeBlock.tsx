import { highlight } from "fumadocs-core/highlight";
import * as Base from "fumadocs-ui/components/codeblock";

export interface CodeBlockProps {
  code: string;
  lang: string;
  wrapper?: Base.CodeBlockProps;
}

export async function CodeBlock({ code, lang, wrapper }: CodeBlockProps) {
  const rendered = await highlight(code, {
    components: {
      pre: Base.Pre,
    },
    lang,
    themes: {
      dark: "vesper",
      light: "github-light",
    },
  });

  return <Base.CodeBlock {...wrapper}>{rendered}</Base.CodeBlock>;
}
