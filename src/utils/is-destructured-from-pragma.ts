import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";
import memo from "micro-memoize";
import { isMatching, match } from "ts-pattern";

import type { RuleContext } from "../../typings";
import { E, F, O } from "../lib";
import { getFromContext } from "./pragma";
import { findVariableByName, getVariablesUpToGlobal } from "./variable";

export const isDestructuredFromPragma = memo(<T extends RuleContext>(variableName: string, context: T) => {
    const maybePragma = getFromContext(context);
    const variables = getVariablesUpToGlobal(context.getScope());

    if (E.isLeft(maybePragma)) {
        return false;
    }

    const pragma = maybePragma.right;

    const maybeLatestDef = F.pipe(
        findVariableByName(variableName)(variables),
        O.flatMapNullable((variable) => variable.defs.at(-1)),
    );

    if (O.isNone(maybeLatestDef)) {
        return false;
    }

    const latestDef = maybeLatestDef.value;
    const { node, parent } = latestDef;

    if (node.type === N.VariableDeclarator && node.init) {
        const { init } = node;
        if (isMatching({ type: N.MemberExpression, object: { type: N.Identifier, name: pragma } })(init)) {
            return true;
        }

        if (isMatching({ type: N.Identifier, name: pragma })(init)) {
            return true;
        }

        const maybeRequireExpression: O.Option<TSESTree.CallExpression> = match(init)
            .with({ type: N.CallExpression }, (exp) => O.some(exp))
            .with({ type: N.MemberExpression, object: { type: N.CallExpression } }, ({ object }) => O.some(object))
            .otherwise(O.none);

        if (O.isNone(maybeRequireExpression)) {
            return false;
        }

        const requireExpression = maybeRequireExpression.value;
        if (requireExpression.callee.type !== N.Identifier) {
            return false;
        }

        const calleeName = requireExpression.callee.name;
        const [firstArg] = requireExpression.arguments;
        if (calleeName !== "require" || firstArg?.type !== N.Literal) {
            return false;
        }

        return firstArg.value === pragma.toLowerCase();
    }

    return isMatching({ type: N.ImportDeclaration, source: { value: pragma.toLowerCase() } })(parent);
});
