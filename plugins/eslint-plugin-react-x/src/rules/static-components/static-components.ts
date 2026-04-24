import { Check, Extract, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { TSESLint } from "@typescript-eslint/utils";

import { createRule } from "../../utils";

export const RULE_NAME = "static-components";

export const RULE_FEATURES = ["EXP"] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Validates that components are static, not recreated every render.",
    },
    messages: {
      default:
        "Component '{{name}}' is created during render. Components created during render will reset their state each time they are created. Declare components outside of render.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

function findVariableForJSXIdentifier(
  context: RuleContext,
  jsxId: TSESTree.JSXIdentifier,
) {
  let scope: ReturnType<typeof context.sourceCode.getScope> | null = context.sourceCode.getScope(jsxId);
  while (scope != null) {
    const variable = scope.variables.find((v) => v.name === jsxId.name);
    if (variable != null) return variable;
    scope = scope.upper;
  }
  return null;
}

function isDynamicallyCreatedValue(node: TSESTree.Node): boolean {
  const expr = Extract.unwrap(node);
  switch (expr.type) {
    case AST.FunctionExpression:
    case AST.ArrowFunctionExpression:
    case AST.NewExpression:
    case AST.CallExpression:
    case AST.ClassExpression:
      return true;
    case AST.ConditionalExpression:
      return isDynamicallyCreatedValue(expr.consequent)
        || isDynamicallyCreatedValue(expr.alternate);
    default:
      return false;
  }
}

function hasDynamicAssignment(variable: TSESLint.Scope.Variable): boolean {
  for (const ref of variable.references) {
    if (!ref.isWrite()) continue;
    const id = ref.identifier;
    if (
      id.parent?.type === AST.AssignmentExpression
      && id.parent.left === id
    ) {
      if (isDynamicallyCreatedValue(id.parent.right)) return true;
    }
  }
  return false;
}

function isDynamicallyCreated(node: TSESTree.Node, variable: TSESLint.Scope.Variable | null): boolean {
  if (node.type === AST.FunctionDeclaration) return true;
  if (node.type === AST.ClassDeclaration) return true;
  if (node.type === AST.VariableDeclarator && node.init != null) {
    return isDynamicallyCreatedValue(node.init);
  }
  if (node.type === AST.VariableDeclarator && node.init == null && variable != null) {
    return hasDynamicAssignment(variable);
  }
  return false;
}

export function create(context: RuleContext<MessageID, []>) {
  const hint = core.FunctionComponentDetectionHint.DoNotIncludeJsxWithNumberValue
    | core.FunctionComponentDetectionHint.DoNotIncludeJsxWithBooleanValue
    | core.FunctionComponentDetectionHint.DoNotIncludeJsxWithNullValue
    | core.FunctionComponentDetectionHint.DoNotIncludeJsxWithStringValue
    | core.FunctionComponentDetectionHint.DoNotIncludeJsxWithUndefinedValue
    | core.FunctionComponentDetectionHint.RequireBothSidesOfLogicalExpressionToBeJsx
    | core.FunctionComponentDetectionHint.RequireBothBranchesOfConditionalExpressionToBeJsx
    | core.FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayPatternElement
    | core.FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayExpressionElement
    | core.FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayMapCallback;

  const fc = core.getFunctionComponentCollector(context, { hint });
  const cc = core.getClassComponentCollector(context);

  const jsxCandidates: Array<{ name: string; node: TSESTree.JSXOpeningElement }> = [];

  return merge(
    fc.visitor,
    cc.visitor,
    {
      JSXOpeningElement(node) {
        if (node.name.type !== AST.JSXIdentifier) return;
        const name = node.name.name;
        if (!core.isFunctionComponentName(name)) return;
        jsxCandidates.push({ name, node });
      },
      "Program:exit"(program) {
        const fComponents = [...fc.api.getAllComponents(program)];
        const cComponents = [...cc.api.getAllComponents(program)];

        function getEnclosingComponent(node: TSESTree.Node) {
          return Traverse.findParent(node, (n) => {
            if (Check.isFunction(n)) return fComponents.some((c) => c.node === n);
            if (Check.isClass(n)) return cComponents.some((c) => c.node === n);
            return false;
          });
        }

        for (const { name, node: jsxNode } of jsxCandidates) {
          const jsxName = jsxNode.name as TSESTree.JSXIdentifier;
          const variable = findVariableForJSXIdentifier(context, jsxName);
          if (variable == null || variable.defs.length === 0) continue;

          const def = variable.defs.at(0);
          if (def == null) continue;
          const defNode = def.node;

          const enclosing = getEnclosingComponent(defNode);
          if (enclosing == null) continue;

          if (!isDynamicallyCreated(defNode, variable)) continue;

          context.report({
            data: { name },
            messageId: "default",
            node: jsxNode.name,
          });
        }
      },
    },
  );
}
