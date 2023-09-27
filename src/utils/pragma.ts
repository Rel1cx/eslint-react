import memo from "micro-memoize";

import type { ReactSettings } from "../../typings";
import type { RuleContext } from "../../typings";
import { E, F, O } from "../lib/primitives";

/*
 * This helper is extract from eslint-plugin-react's pragma utils under the MIT license, with some enhancements.
 * Thank you for your work!
 */

const JSX_ANNOTATION_REGEX = /@jsx\s+(\S+)/u;
// Does not check for reserved keywords or unicode characters
const JS_IDENTIFIER_REGEX = /^[$A-Z_a-z][\w$]*$/u;

export function getCreateClassFromContext<T extends RuleContext>(context: T): E.Either<Error, string> {
    // eslint-disable-next-line prefer-destructuring
    const settings: { react?: ReactSettings } = context.settings;

    const pragma = settings.react?.createClass ?? "createReactClass";

    if (!JS_IDENTIFIER_REGEX.test(pragma)) {
        return E.left(new Error(`createClass pragma ${pragma} is not a valid function name`));
    }

    return E.right(pragma);
}

export function getFragmentFromContext<T extends RuleContext>(context: T): E.Either<Error, string> {
    // eslint-disable-next-line prefer-destructuring
    const settings: { react?: ReactSettings } = context.settings;

    const pragma = settings.react?.fragment ?? "Fragment";

    if (!JS_IDENTIFIER_REGEX.test(pragma)) {
        return E.left(new Error(`Fragment pragma ${pragma} is not a valid identifier`));
    }

    return E.right(pragma);
}

export const getFromContext = memo(<T extends RuleContext>(context: T): E.Either<Error, string> => {
    // eslint-disable-next-line prefer-destructuring
    const settings: { react?: ReactSettings } = context.settings;

    const sourceCode = context.getSourceCode();
    const pragmaNode = sourceCode.getAllComments().find((node) => JSX_ANNOTATION_REGEX.test(node.value));

    const pragma = settings.react?.pragma
        ?? F.pipe(
            O.fromNullable(pragmaNode),
            O.map((node) => JSX_ANNOTATION_REGEX.exec(node.value)),
            O.flatMap((matches) => O.fromNullable(matches?.[1]?.split(".")[0])),
            O.getOrElse(() => "React"),
        );

    if (!JS_IDENTIFIER_REGEX.test(pragma)) {
        return E.left(new Error(`React pragma ${pragma} is not a valid identifier`));
    }

    return E.right(pragma);
});
