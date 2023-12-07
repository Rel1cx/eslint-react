import type { RuleContext } from "@eslint-react/shared";
import { F, O, P } from "@eslint-react/tools";
import type { ReactSettings } from "@eslint-react/types";
import memo from "micro-memoize";

const RE_JSX_ANNOTATION_REGEX = /@jsx\s+(\S+)/u;
// Does not check for reserved keywords or unicode characters
const RE_JS_IDENTIFIER_REGEX = /^[$A-Z_a-z][\w$]*$/u;

export function getFragmentFromContext<T extends RuleContext>(context: T) {
  // eslint-disable-next-line prefer-destructuring
  const settings: { react?: ReactSettings } = context.settings;

  const fragment = settings.react?.fragment;

  if (P.isString(fragment) && RE_JS_IDENTIFIER_REGEX.test(fragment)) {
    return fragment;
  }

  return "Fragment";
}

export const getPragmaFromContext: <T extends RuleContext>(context: T) => string = memo(
  (context) => {
    // eslint-disable-next-line prefer-destructuring
    const settings: { react?: ReactSettings } = context.settings;

    const { sourceCode } = context;
    const pragmaNode = sourceCode
      .getAllComments()
      .find((node) => RE_JSX_ANNOTATION_REGEX.test(node.value));

    return F.pipe(
      O.orElse(O.fromNullable(settings.react?.pragma), () =>
        F.pipe(
          O.fromNullable(pragmaNode),
          O.map(({ value }) => RE_JSX_ANNOTATION_REGEX.exec(value)),
          O.flatMapNullable((matches) => matches?.[1]?.split(".")[0]),
        )),
      O.flatMap(O.liftPredicate(x => RE_JS_IDENTIFIER_REGEX.test(x))),
      O.getOrElse(F.constant("React")),
    );
  },
);
