import * as ast from "@eslint-react/ast";
import { flow, unit } from "@eslint-react/eff";
import {
  type RuleContext,
  type RuleFeature,
  defineRuleListener,
  getSettingsFromContext,
  report,
} from "@eslint-react/shared";
import { findVariable } from "@eslint-react/var";
import { getConstrainedTypeAtLocation } from "@typescript-eslint/type-utils";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { ESLintUtils } from "@typescript-eslint/utils";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import { compare } from "compare-versions";
import { unionConstituents } from "ts-api-utils";
import { P, match } from "ts-pattern";

import { type TypeVariant, createRule, getTypeVariants } from "../utils";

export const RULE_NAME = "no-leaked-conditional-rendering";

export const RULE_FEATURES = [
  "TSC",
] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Prevents problematic leaked values from being rendered.",
    },
    messages: {
      default:
        "Potential leaked value {{value}} that might cause unintentionally rendered values or rendering crashes.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  // Fast path: if the file does not contain '&&', there is no need to run this rule
  if (!context.sourceCode.text.includes("&&")) return {};
  const { version } = getSettingsFromContext(context);

  // Defines the type variants that are safe to use on the left side of a '&&' expression
  // These types do not render unwanted values (like 0, NaN, or '')
  const allowedVariants = [
    "any",
    "boolean",
    "nullish",
    "object",
    "enum",
    "falsy boolean",
    "truthy bigint",
    "truthy boolean",
    "truthy number",
    "truthy string",
    // Before React 18, empty strings were rendered, which was often unintentional
    // React 18 and later do not render empty strings, so they are considered safe
    ...compare(version, "18.0.0", "<")
      ? []
      : ["string", "falsy string"] as const,
  ] as const satisfies TypeVariant[];

  const services = ESLintUtils.getParserServices(context, false);

  /**
   * Recursively inspects a node to find potential leaked conditional rendering
   * @param node The AST node to inspect
   * @returns A report descriptor if a problem is found, otherwise `unit`
   */
  function getReportDescriptor(
    node:
      | unit
      | TSESTree.JSXExpressionContainer
      | TSESTree.JSXExpressionContainer["expression"],
  ): ReportDescriptor<MessageID> | unit {
    // Base cases for recursion: null or irrelevant nodes
    if (node == null) return unit;
    if (ast.is(AST.JSXExpressionContainer)(node)) return getReportDescriptor(node.expression);
    if (ast.isJSX(node)) return unit;
    if (ast.isTypeExpression(node)) return getReportDescriptor(node.expression);

    // Pattern match on the node type to apply specific logic
    return match<typeof node, ReportDescriptor<MessageID> | unit>(node)
      // Handle logical '&&' expressions
      .with({ type: AST.LogicalExpression, operator: "&&" }, ({ left, right }) => {
        // If the left side is a negation, it's always a boolean, which is safe
        // Recursively check the right side
        if (left.type === AST.UnaryExpression && left.operator === "!") {
          return getReportDescriptor(right);
        }

        const initialScope = context.sourceCode.getScope(left);
        // Specifically check for 'NaN', which is a falsy value that gets rendered
        if (ast.isIdentifier(left, "NaN") || getStaticValue(left, initialScope)?.value === "NaN") {
          return {
            messageId: "default",
            node: left,
            data: { value: context.sourceCode.getText(left) },
          } as const;
        }

        // Get the type of the left-hand side operand
        const leftType = getConstrainedTypeAtLocation(services, left);
        const leftTypeVariants = getTypeVariants(unionConstituents(leftType));
        // Check if all possible types of the left operand are in the allowed list
        const isLeftValid = Array
          .from(leftTypeVariants.values())
          .every((type) => allowedVariants.some((allowed) => allowed === type));

        // If the left side is valid, the expression is safe. Recursively check the right side
        if (isLeftValid) {
          return getReportDescriptor(right);
        }

        // If the left side is not valid, report an error
        return {
          messageId: "default",
          node: left,
          data: { value: context.sourceCode.getText(left) },
        } as const;
      })
      // Handle ternary expressions. Recursively check both branches
      .with({ type: AST.ConditionalExpression }, ({ alternate, consequent }) => {
        return getReportDescriptor(consequent) ?? getReportDescriptor(alternate);
      })
      // Handle identifiers. Try to find their definition and check the initial value
      .with({ type: AST.Identifier }, (n) => {
        const variable = findVariable(n.name, context.sourceCode.getScope(n));
        const variableDefNode = variable?.defs.at(0)?.node;
        return match(variableDefNode)
          .with({ init: P.select({ type: P.not(AST.VariableDeclaration) }) }, getReportDescriptor)
          .otherwise(() => unit);
      })
      // For all other node types, assume they are safe
      .otherwise(() => unit);
  }
  return defineRuleListener(
    {
      JSXExpressionContainer: flow(getReportDescriptor, report(context)),
    },
  );
}
