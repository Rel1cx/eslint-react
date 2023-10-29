import { findVariableByName, getVariablesUpToGlobal, NodeType } from "@eslint-react/ast";
import { E, F, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { isMatching, match } from "ts-pattern";

import { getPragmaFromContext } from "./get-pragma";

export function isDestructuredFromPragma<T extends RuleContext>(variableName: string, context: T) {
  const maybePragma = getPragmaFromContext(context);
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

  if (node.type === NodeType.VariableDeclarator && node.init) {
    const { init } = node;

    // check for: `variable = pragma.variable`
    if (isMatching({ type: "MemberExpression", object: { type: "Identifier", name: pragma } }, init)) {
      return true;
    }

    // check for: `{ variable } = pragma`
    if (isMatching({ type: "Identifier", name: pragma }, init)) {
      return true;
    }

    // check if from a require call: `require("react")`
    const maybeRequireExpression = match(init)
      .with({ type: NodeType.CallExpression }, (exp) => O.some(exp))
      .with(
        { type: NodeType.MemberExpression, object: { type: NodeType.CallExpression } },
        ({ object }) => O.some(object),
      )
      .otherwise(O.none);

    if (O.isNone(maybeRequireExpression)) {
      return false;
    }

    const requireExpression = maybeRequireExpression.value;
    if (requireExpression.callee.type !== NodeType.Identifier) {
      return false;
    }

    const calleeName = requireExpression.callee.name;
    const [firstArg] = requireExpression.arguments;
    if (calleeName !== "require" || firstArg?.type !== NodeType.Literal) {
      return false;
    }

    return firstArg.value === pragma.toLowerCase();
  }

  // latest definition is an import declaration: import { variable } from 'react'
  return isMatching({ type: "ImportDeclaration", source: { value: pragma.toLowerCase() } }, parent);
}
