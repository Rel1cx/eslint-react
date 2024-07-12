import { F, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";

const RE_JSX_ANNOTATION_REGEX = /@jsx\s+(\S+)/u;
// Does not check for reserved keywords or unicode characters
const RE_JS_IDENTIFIER_REGEX = /^[$A-Z_a-z][\w$]*$/u;

export function getJSXPragma(context: RuleContext): O.Option<string> {
  const { sourceCode } = context;
  return F.pipe(
    O.fromNullable(sourceCode.getAllComments().find((node) => RE_JSX_ANNOTATION_REGEX.test(node.value))),
    O.map(({ value }) => RE_JSX_ANNOTATION_REGEX.exec(value)),
    O.flatMapNullable((matches) => matches?.[1]),
    O.filter(pragma => RE_JS_IDENTIFIER_REGEX.test(pragma)),
  );
}
