import { E, F, O } from "@eslint-react/tools";
import type { ReactSettings, RuleContext } from "@eslint-react/types";
import memo from "micro-memoize";

const RE_JSX_ANNOTATION_REGEX = /@jsx\s+(\S+)/u;
// Does not check for reserved keywords or unicode characters
const RE_JS_IDENTIFIER_REGEX = /^[$A-Z_a-z][\w$]*$/u;

export function getFragmentFromContext<T extends RuleContext>(context: T): E.Either<Error, string> {
  // eslint-disable-next-line prefer-destructuring
  const settings: { react?: ReactSettings } = context.settings;

  const pragma = settings.react?.fragment ?? "Fragment";

  if (!RE_JS_IDENTIFIER_REGEX.test(pragma)) {
    return E.left(new Error(`Fragment pragma ${pragma} is not a valid identifier`));
  }

  return E.right(pragma);
}

export const getPragmaFromContext: <T extends RuleContext>(context: T) => E.Either<Error, string> = memo(
  (context) => {
    // eslint-disable-next-line prefer-destructuring
    const settings: { react?: ReactSettings } = context.settings;

    const sourceCode = context.getSourceCode();
    const pragmaNode = sourceCode.getAllComments().find((node) => RE_JSX_ANNOTATION_REGEX.test(node.value));

    const pragma = settings.react?.pragma
      ?? F.pipe(
        O.fromNullable(pragmaNode),
        O.map((node) => RE_JSX_ANNOTATION_REGEX.exec(node.value)),
        O.flatMap((matches) => O.fromNullable(matches?.[1]?.split(".")[0])),
        O.getOrElse(() => "React"),
      );

    if (!RE_JS_IDENTIFIER_REGEX.test(pragma)) {
      return E.left(new Error(`React pragma ${pragma} is not a valid identifier`));
    }

    return E.right(pragma);
  },
);
