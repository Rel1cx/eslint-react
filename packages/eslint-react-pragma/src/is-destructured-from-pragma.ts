import type { RuleContext } from "@eslint-react/shared";
import { E, F, O } from "@eslint-react/std";
import { findVariableByName, getVariablesUpToGlobal } from "@eslint-react/variable";
import { isMatching } from "ts-pattern";

import { getFromContext } from "./pragma";

export function isDestructuredFromPragma<T extends RuleContext>(variableName: string, context: T) {
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

    // TODO: re-implement this
    // if (node.type === "VariableDeclarator" && node.init) {
    //     const { init } = node;
    //     if (isMatching({ type: "MemberExpression", object: { name: pragma, type: "Identifier" } })(init)) {
    //         return true;
    //     }

    //     if (isMatching({ name: pragma, type: "Identifier" })(init)) {
    //         return true;
    //     }

    //     const maybeRequireExpression = match<typeof init, O.Option<TSESTree.CallExpression>>(init)
    //         .with({ type: "CallExpression" }, (exp) => O.some(exp))
    //         .with({ type: "MemberExpression", object: { type: "CallExpression" } }, ({ object }) => O.some(object))
    //         .otherwise(O.none);

    //     if (O.isNone(maybeRequireExpression)) {
    //         return false;
    //     }

    //     const requireExpression = maybeRequireExpression.value;
    //     if (requireExpression.callee.type !== "Identifier") {
    //         return false;
    //     }

    //     const calleeName = requireExpression.callee.name;
    //     const [firstArg] = requireExpression.arguments;
    //     if (calleeName !== "require" || firstArg?.type !== "Literal") {
    //         return false;
    //     }

    //     return firstArg.value === pragma.toLowerCase();
    // }

    return isMatching({ type: "ImportDeclaration", source: { value: pragma.toLowerCase() } })(parent);
}
